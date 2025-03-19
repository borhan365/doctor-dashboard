export interface DiagnosticCategory {
  id: string;
  name: string;
  bnName?: string;
}

export interface HospitalDiagnosticTest {
  id?: string;
  name: string;
  bnName?: string;
  price: number;
  description?: string;
  bnDescription?: string;
  hospitalId: string;
  categoryId?: string;
  diagnosticId?: string;
  category?: {
    id: string;
    name: string;
    bnName?: string;
  };
  diagnostic?: {
    id: string;
    name: string;
    bnName?: string;
  };
  isExisting?: boolean;
}

export interface DiagnosticSearchResponse {
  diagnostics: HospitalDiagnosticTest[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
