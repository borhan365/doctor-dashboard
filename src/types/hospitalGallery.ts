export interface GalleryImage {
  id: string;
  imageUrl: string;
  title?: string;
  bnTitle?: string;
  description?: string;
  bnDescription?: string;
}

export interface GalleryFormData {
  hospitalId: string;
  images: GalleryImage[];
}

export interface GalleryProps {
  formData: GalleryFormData;
  setFormData: React.Dispatch<React.SetStateAction<GalleryFormData>>;
  maxFiles?: number;
}
