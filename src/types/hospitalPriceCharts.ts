export interface ChartItem {
  id?: string;
  title: string;
  bnTitle?: string;
  price: number;
  bnPrice?: number;
}

export interface PriceChart {
  id?: string;
  title: string;
  bnTitle?: string;
  description?: string;
  bnDescription?: string;
  items: ChartItem[];
  isExpanded?: boolean;
}

export interface PriceChartInformation {
  id: string;
  charts: PriceChart[];
  hospitalId: string;
  hospital?: {
    name: string;
    featuredImage?: {
      fileUrl?: string;
    };
    address?: string;
  };
  createdAt: string;
}

export interface FormData {
  hospitalId: string;
  charts: PriceChart[];
}

export interface PriceChartProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}
