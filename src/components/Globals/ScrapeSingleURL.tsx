import axios from "axios";
import { LoaderCircle, Search, Upload } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

// Define the type for the scraped data
type ScrapedData = {
  header: {
    photo: string;
    name: string;
    qualifications: string;
    specialty: string;
    workplace: string;
    rating: {
      score: number;
      count: string;
    };
  };
  content: {
    chambers: Array<{
      name: string;
      address: string;
      visitingHour: string;
      appointment: string;
      phone: string;
    }>;
    about: string;
  };
};

interface ScrapeSingleURLProps {
  url: string;
  setUrl: (url: string) => void;
  isScrapingLoading: boolean;
  setIsScrapingLoading: (isScrapingLoading: boolean) => void;
  scrapedData: ScrapedData | null;
  setScrapedData: (scrapedData: ScrapedData | null) => void;
  updateFormDataFromAI: (aiResponse: any) => void;
  onScrape: (imageUrl: string) => void;
}

function ScrapeSingleURL({
  url,
  setUrl,
  isScrapingLoading,
  setIsScrapingLoading,
  scrapedData,
  setScrapedData,
  updateFormDataFromAI,
  onScrape,
}: ScrapeSingleURLProps) {
  const [loading, setLoading] = useState(false);

  const handleScrape = async () => {
    if (!url) {
      toast.error("Please enter a URL");
      return;
    }

    setIsScrapingLoading(true);
    try {
      console.log("Scraping URL:", url);
      const response = await axios.get("/api/scrape", { params: { url } });
      console.log("Scrape response:", response.data);
      if (response.data.success) {
        toast.success("Data scraped successfully");
        setScrapedData(response.data.doctorInfo);
      } else {
        toast.error(response.data.message || "Failed to scrape data");
      }
    } catch (error) {
      console.error("Error scraping data:", error);
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "An error occurred while scraping",
        );
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsScrapingLoading(false);
    }
  };

  const uploadImageFromUrl = async () => {
    if (!scrapedData?.header.photo) {
      toast.error("No image URL available");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Uploading image...");

    try {
      console.log("Uploading image from URL:", scrapedData.header.photo);
      const response = await axios.post("/api/uploads/upload-image-from-url", {
        imageUrl: scrapedData.header.photo,
      });
      console.log("Upload response:", response.data);

      if (response.data.success && response.data.fileUrl) {
        toast.success("Image uploaded successfully!", { id: toastId });
        onScrape(response.data.fileUrl);
        updateFormDataFromAI({ featuredImage: response.data.fileUrl });
      } else {
        throw new Error(response.data.error || "Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Error uploading image. Please try again.",
        { id: toastId }
      );
    } finally {
      setLoading(false);
    }
  };

  console.log("Current scrapedData:", scrapedData);
  console.log("Current URL:", url);

  return (
    <>
      <div className="relative space-y-2 border-t border-slate-100 pt-2">
        <label
          htmlFor="fetchReleventInfo"
          className="text-sm font-medium text-slate-600"
        >
          Fetch Relevant Information
        </label>
        <input
          className="w-full rounded-md border border-slate-200 p-3 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          type="text"
          placeholder="https://healtha.com/dr-raunak-jahan"
          id="fetchReleventInfo"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={isScrapingLoading}
        />
        {isScrapingLoading ? (
          <LoaderCircle
            className={`absolute right-3 top-11 animate-spin cursor-pointer text-slate-400 hover:text-blue-600`}
            size={20}
          />
        ) : (
          <Search
            className={`absolute right-3 top-11 cursor-pointer text-slate-400 hover:text-blue-600`}
            size={20}
            onClick={handleScrape}
          />
        )}
      </div>
      <div className="my-10">
        <Image
          className="mb-3 rounded object-contain"
          width={80}
          height={80}
          objectFit="cover"
          src={scrapedData?.header.photo || "/images/user/user-02.png"}
          alt="doc image"
        />
        <div className="flex items-center space-x-2">
          <button
            onClick={uploadImageFromUrl}
            disabled={loading || !scrapedData?.header.photo}
            className="disabled:bg-gray-400 flex items-center rounded bg-primary px-6 py-2 text-white hover:bg-primary"
          >
            <Upload className="mr-2 size-5" />
            {loading ? "Uploading..." : "Upload Image"}
          </button>
        </div>
      </div>
    </>
  );
}

export default ScrapeSingleURL;
