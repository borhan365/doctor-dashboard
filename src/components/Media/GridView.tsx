import Image from "next/image";

type ImageType = {
  id: string;
  src: string;
  name: string;
  type: string;
  uploadedOn: string;
  uploadedBy: string;
  uploadedTo: string;
  size: string;
  dimensions: string;
};

function GridView({
  displayedImages,
  openModal,
  selectedImages,
}: {
  displayedImages: ImageType[];
  openModal: (image: ImageType) => void;
  selectedImages: string[];
}) {
  return (
    <>
      <div className="columns-2 gap-4 space-y-4 sm:columns-3 md:columns-4 lg:columns-5">
        {displayedImages.map((image) => (
          <div
            key={image.id}
            className={`group relative cursor-pointer break-inside-avoid ${
              selectedImages.includes(image.id) ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => openModal(image)}
          >
            <Image
              src={image.src}
              alt={image.name}
              width={300}
              height={200}
              className="h-auto w-full rounded-lg object-cover transition-transform duration-200 ease-in-out group-hover:scale-105"
            />
            <div className="absolute inset-0 rounded-lg bg-black bg-opacity-0 transition-opacity duration-200 group-hover:bg-opacity-30" />
            <div className="absolute bottom-0 left-0 right-0 p-2 text-sm text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              {image.name}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default GridView;
