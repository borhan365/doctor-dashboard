import axios from "axios";
import { useEffect, useState } from "react";

interface S3File {
  key: string;
  lastModified: string;
  size: number;
  url: string;
}

function S3() {
  const [images, setImages] = useState<S3File[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/uploads/list");
        console.log("API response:", response.data); // Log the entire response
        if (response.data.error) {
          throw new Error(response.data.error);
        }
        setImages(
          response.data.files.filter(
            (file: S3File) =>
              file.key.toLowerCase().endsWith(".jpg") ||
              file.key.toLowerCase().endsWith(".jpeg") ||
              file.key.toLowerCase().endsWith(".png") ||
              file.key.toLowerCase().endsWith(".gif"),
          ),
        );
      } catch (err) {
        console.error("Error fetching S3 images:", err);
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) {
    return <div>Loading images...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">S3 Images</h1>
      {images.length === 0 ? (
        <p>No images found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {images.map((image) => (
            <div key={image.key} className="overflow-hidden rounded-lg border">
              <img
                src={image.url}
                alt={image.key}
                className="h-48 w-full object-cover"
              />
              <div className="p-2">
                <p className="truncate text-sm">{image.key}</p>
                <p className="text-gray-500 text-xs">
                  Size: {(image.size / 1024).toFixed(2)} KB
                </p>
                <p className="text-gray-500 text-xs">
                  Last modified: {new Date(image.lastModified).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default S3;
