import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

async function uploadFileToS3(
  file: ArrayBuffer,
  fileName: string,
  contentType: string,
) {
  try {
    const params = {
      Bucket: process.env.AWS_S3_BUCKET!,
      Key: `uploads/hospitals/${fileName}`,
      Body: Buffer.from(file),
      ContentType: contentType,
    };

    const command = new PutObjectCommand(params);
    await s3Client.send(command);
    return `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/uploads/hospitals/${fileName}`;
  } catch (error) {
    console.error("S3 upload error:", error);
    throw new Error("Failed to upload file to S3");
  }
}

// Add these validation schemas for the related entities
const faqSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

const floorSchema = z.object({
  title: z.string(),
  bnTitle: z.string().optional(),
  description: z.string().optional(),
  bnDescription: z.string().optional(),
});

const branchSchema = z.object({
  name: z.string(),
  address: z.string(),
  bnAddress: z.string().optional(),
  division: z.string().optional(),
  bnDivision: z.string().optional(),
  city: z.string().optional(),
  bnCity: z.string().optional(),
  numberOne: z.string().optional(),
  numberTwo: z.string().optional(),
});

const healthPackageSchema = z.object({
  name: z.string(),
  bnName: z.string().optional(),
  price: z.number(),
  description: z.string().optional(),
  bnDescription: z.string().optional(),
  services: z.any().optional(), // For JSON data
});

const priceChartSchema = z.object({
  title: z.string(),
  bnTitle: z.string().optional(),
  description: z.string().optional(),
  bnDescription: z.string().optional(),
  services: z.any().optional(), // For JSON data
  bnServices: z.any().optional(), // For JSON data
  price: z.number(),
});

// Update the hospital schema
const hospitalSchema = z.object({
  // Basic Info
  name: z.string(),
  bnName: z.string().default(""),
  address: z.string(),
  bnAddress: z.string().default(""),
  excerpt: z.string().default(""),
  bnExcerpt: z.string().default(""),
  overview: z.string().default(""),
  bnOverview: z.string().default(""),
  highlights: z.string().default(""),
  bnHighlights: z.string().default(""),
  description: z.string().default(""),
  bnDescription: z.string().default(""),

  // Common Info
  email: z.string(),
  establishedYear: z.number().default(0),
  website: z.string().default(""),
  numberOne: z.number().default(0),
  numberTwo: z.number().default(0),
  numberThree: z.number().default(0),
  numberOfAmbulance: z.number().default(0),
  numberOfWards: z.number().default(0),
  numberOfCabins: z.number().default(0),
  numberOfICUs: z.number().default(0),
  numberOfBeds: z.number().default(0),
  googleMapURL: z.string().default(""),

  // Social Media Links
  facebookLink: z.string().default(""),
  twitterLink: z.string().default(""),
  instagramLink: z.string().default(""),
  youtubeLink: z.string().default(""),
  linkedinLink: z.string().default(""),
  websiteLink: z.string().default(""),

  // Status
  status: z.enum(["draft", "published", "archived"]).default("draft"),

  // Relations
  hospitalTypes: z.array(z.string()).default([]),
  features: z.array(z.string()).default([]),
  services: z.array(z.string()).default([]),
  diagnostics: z.array(z.string()).default([]),
  specialists: z.array(z.string()).default([]),

  // Related entities
  faqs: z
    .array(
      z.object({
        question: z.string(),
        answer: z.string(),
        bnQuestion: z.string().optional(),
        bnAnswer: z.string().optional(),
      }),
    )
    .optional(),
  floors: z
    .array(
      z.object({
        title: z.string(),
        bnTitle: z.string().optional(),
        description: z.string().optional(),
        bnDescription: z.string().optional(),
      }),
    )
    .optional(),
  branches: z
    .array(
      z.object({
        name: z.string(),
        bnName: z.string().optional(),
        address: z.string(),
        bnAddress: z.string().optional(),
        division: z.string().optional(),
        bnDivision: z.string().optional(),
        city: z.string().optional(),
        bnCity: z.string().optional(),
        numberOne: z.string().optional(),
        numberTwo: z.string().optional(),
      }),
    )
    .optional(),
  healthPackages: z
    .array(
      z.object({
        name: z.string(),
        bnName: z.string().optional(),
        price: z.number(),
        description: z.string().optional(),
        bnDescription: z.string().optional(),
        services: z.array(z.string()).optional(),
        bnServices: z.array(z.string()).optional(),
      }),
    )
    .optional(),
  priceCharts: z
    .array(
      z.object({
        title: z.string(),
        bnTitle: z.string().optional(),
        description: z.string().optional(),
        bnDescription: z.string().optional(),
        price: z.number(),
        services: z.any().optional(),
        bnServices: z.any().optional(),
      }),
    )
    .optional(),
  additionalInfo: z
    .array(
      z.object({
        title: z.string(),
        bnTitle: z.string().optional(),
        description: z.string().optional(),
        bnDescription: z.string().optional(),
      }),
    )
    .optional(),

  // Update the locations validation to handle both string and array
  locations: z
    .union([z.string(), z.array(z.string())])
    .transform((val) => (Array.isArray(val) ? val : [val]))
    .default([]),
});

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized - Please login first" },
        { status: 401 },
      );
    }

    // Rate limiting
    try {
      await rateLimit(request, {
        requests: 10,
        interval: "60 s",
        identifier: `${request.headers.get("x-forwarded-for") || "127.0.0.1"}-${
          session.user.id
        }`,
      });
    } catch (error) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    // Parse form data
    const formData = await request.formData();
    const rawData: Record<string, any> = {};

    // Process form data
    formData.forEach((value, key) => {
      if (typeof value === "string") {
        try {
          if (
            [
              "hospitalTypes",
              "features",
              "services",
              "diagnostics",
              "specialists",
              "faqs",
              "floors",
              "branches",
              "healthPackages",
              "priceCharts",
              "locations",
              "additionalInfo",
            ].includes(key)
          ) {
            rawData[key] = JSON.parse(value);
          } else if (
            [
              "numberOfAmbulance",
              "numberOfWards",
              "numberOfCabins",
              "numberOfICUs",
              "numberOfBeds",
              "establishedYear",
              "numberOne",
              "numberTwo",
              "numberThree",
            ].includes(key)
          ) {
            rawData[key] = parseInt(value, 10) || 0;
          } else {
            rawData[key] = value || "";
          }
        } catch {
          // If JSON.parse fails, treat it as a single value
          rawData[key] = key === "locations" ? [value] : value;
        }
      } else {
        rawData[key] = value;
      }
    });

    // Add user ID
    rawData.userId = session.user.id;

    // In the POST handler, before validation:
    const sanitizedData = Object.fromEntries(
      Object.entries(rawData).map(([key, value]) => [
        key,
        value === null || value === undefined ? "" : value,
      ]),
    );

    // Then validate
    const validatedData = hospitalSchema.parse(sanitizedData);

    // Handle file uploads
    const featuredImage = formData.get("featuredImage") as File | null;
    const banner = formData.get("banner") as File | null;
    const gallery = formData.getAll("gallery") as File[];

    // Upload files to S3
    let featuredImageUrl = null;
    let bannerUrl = null;
    let galleryUrls: string[] = [];

    if (featuredImage) {
      featuredImageUrl = await uploadFileToS3(
        await featuredImage.arrayBuffer(),
        `${Date.now()}-${featuredImage.name}`,
        featuredImage.type,
      );
    }

    if (banner) {
      bannerUrl = await uploadFileToS3(
        await banner.arrayBuffer(),
        `${Date.now()}-${banner.name}`,
        banner.type,
      );
    }

    if (gallery.length) {
      const galleryFiles = formData.getAll("gallery") as File[];

      // Upload all gallery images to S3
      const uploadPromises = galleryFiles.map(async (file) => {
        const buffer = Buffer.from(await file.arrayBuffer());
        const fileName = `${Date.now()}-${file.name}`;
        const fileUrl = await uploadFileToS3(buffer, fileName, file.type);

        return {
          id: crypto.randomUUID(), // Generate a unique ID for each gallery image
          fileName: file.name,
          fileUrl: fileUrl,
        };
      });

      galleryUrls = await Promise.all(uploadPromises);
    }

    // First, create the Upload records for the files
    let featuredImageId = null;
    let bannerId = null;

    if (featuredImageUrl) {
      const featuredImageUpload = await prisma.upload.create({
        data: {
          fileName: featuredImage?.name || "",
          fileUrl: featuredImageUrl,
          fileKey: `uploads/hospitals/${Date.now()}-${featuredImage?.name || ""}`,
          module: "hospital",
          userId: session.user.id,
        },
      });
      featuredImageId = featuredImageUpload.id;
    }

    if (bannerUrl) {
      const bannerUpload = await prisma.upload.create({
        data: {
          fileName: banner?.name || "",
          fileUrl: bannerUrl,
          fileKey: `uploads/hospitals/${Date.now()}-${banner?.name || ""}`,
          module: "hospital",
          userId: session.user.id,
        },
      });
      bannerId = bannerUpload.id;
    }

    // Then create the hospital with the upload IDs
    const newHospital = await prisma.hospital.create({
      data: {
        // Basic Info
        name: validatedData.name,
        bnName: validatedData.bnName,
        address: validatedData.address,
        bnAddress: validatedData.bnAddress,
        excerpt: validatedData.excerpt,
        bnExcerpt: validatedData.bnExcerpt,
        overview: validatedData.overview,
        bnOverview: validatedData.bnOverview,
        highlights: validatedData.highlights,
        bnHighlights: validatedData.bnHighlights,
        description: validatedData.description,
        bnDescription: validatedData.bnDescription,

        // Common Info
        email: validatedData.email,
        establishedYear: validatedData.establishedYear,
        website: validatedData.website,
        numberOne: validatedData.numberOne,
        numberTwo: validatedData.numberTwo,
        numberThree: validatedData.numberThree,
        numberOfAmbulance: validatedData.numberOfAmbulance,
        numberOfWards: validatedData.numberOfWards,
        numberOfCabins: validatedData.numberOfCabins,
        numberOfICUs: validatedData.numberOfICUs,
        numberOfBeds: validatedData.numberOfBeds,
        googleMapURL: validatedData.googleMapURL,

        // Social Media Links
        facebookLink: validatedData.facebookLink,
        twitterLink: validatedData.twitterLink,
        instagramLink: validatedData.instagramLink,
        youtubeLink: validatedData.youtubeLink,
        linkedinLink: validatedData.linkedinLink,
        websiteLink: validatedData.websiteLink,

        // Status
        status: "draft",

        // User
        userId: session.user.id,

        // Many-to-Many Relations
        types: validatedData.hospitalTypes?.length
          ? {
              connect: validatedData.hospitalTypes.map((id) => ({ id })),
            }
          : undefined,

        features: validatedData.features?.length
          ? {
              connect: validatedData.features.map((id) => ({ id })),
            }
          : undefined,

        diagnostics: validatedData.diagnostics?.length
          ? {
              connect: validatedData.diagnostics.map((id) => ({ id })),
            }
          : undefined,

        specialists: validatedData.specialists?.length
          ? {
              connect: validatedData.specialists.map((id) => ({ id })),
            }
          : undefined,

        locations: validatedData.locations?.length
          ? {
              connect: validatedData.locations.map((id) => ({ id })),
            }
          : undefined,

        // Connect the uploads using their IDs
        featuredImageId,
        bannerId,

        // Related Entities
        faqs: validatedData.faqs?.length
          ? JSON.stringify(validatedData.faqs)
          : null,

        floors: validatedData.floors?.length
          ? JSON.stringify(validatedData.floors)
          : null,

        branches: validatedData.branches?.length
          ? JSON.stringify(validatedData.branches)
          : null,

        healthPackages: validatedData.healthPackages?.length
          ? JSON.stringify(validatedData.healthPackages)
          : null,

        priceCharts: validatedData.priceCharts?.length
          ? JSON.stringify(validatedData.priceCharts)
          : null,

        additionalInfo: validatedData.additionalInfo?.length
          ? JSON.stringify(validatedData.additionalInfo)
          : null,

        // Handle gallery
        // gallery: validatedData.gallery?.length
        //   ? JSON.stringify(galleryUrls)
        //   : null,
        gallery: JSON.stringify(galleryUrls),
      },
      include: {
        featuredImage: true,
        banner: true,
        types: true,
        features: true,
        diagnostics: true,
        specialists: true,
        locations: true,
        user: true,
      },
    });

    return NextResponse.json(
      {
        status: "success",
        message: "Hospital created successfully",
        data: newHospital,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating hospital:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: error.errors,
        },
        { status: 400 },
      );
    }

    if (error instanceof Error) {
      return NextResponse.json(
        {
          error: "Failed to create hospital",
          details: {
            message: error.message,
            name: error.name,
          },
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        error: "Failed to create hospital",
        details: error,
      },
      { status: 500 },
    );
  }
}
