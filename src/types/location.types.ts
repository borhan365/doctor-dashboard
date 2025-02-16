export interface Location {
  id: string;
  title: string;
  bnTitle?: string;
  status: string;
  parentId?: string | null;
  subLocations?: Location[];
}

export interface LocationResponse {
  status: string;
  locations: Location[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
}
