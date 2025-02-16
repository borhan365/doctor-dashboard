import { metadata as rootMetadata } from "@/app/metadata";
import { Metadata } from "next";

// Base metadata configuration
export const baseMetadata: Metadata = {
  ...rootMetadata,
};

// Hospitals listing page metadata
export const hospitalsMetadata: Metadata = {
  title: "Find Hospitals",
  description: "Discover and connect with leading hospitals in your area",
  openGraph: {
    title: "Find Hospitals | Your Healthcare Platform",
    description: "Discover and connect with leading hospitals in your area",
  },
};

// Doctors listing page metadata
export const doctorsMetadata: Metadata = {
  title: "Find Doctors",
  description: "Connect with experienced healthcare professionals",
  openGraph: {
    title: "Find Doctors | Your Healthcare Platform",
    description: "Connect with experienced healthcare professionals",
  },
};

// About page metadata
export const aboutMetadata: Metadata = {
  title: "About Us",
  description: "Learn about our mission to improve healthcare accessibility",
  openGraph: {
    title: "About Us | Your Healthcare Platform",
    description: "Learn about our mission to improve healthcare accessibility",
  },
};

// Contact page metadata
export const contactMetadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with our support team",
  openGraph: {
    title: "Contact Us | Your Healthcare Platform",
    description: "Get in touch with our support team",
  },
};

// Blog listing page metadata
export const blogMetadata: Metadata = {
  title: "Healthcare Blog",
  description: "Latest insights and updates from the healthcare industry",
  openGraph: {
    title: "Healthcare Blog | Your Healthcare Platform",
    description: "Latest insights and updates from the healthcare industry",
  },
};
