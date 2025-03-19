// Define the Payment interface to match your API response
export interface Payment {
  id: string;
  paymentId: string;
  amount: number;
  currency: string;
  status: string;
  method: string;
  transactionId: string;
  bkashNumber: string;
  paymentSource: string | null;
  paymentType: string;
  notes: string;
  doctorId: string | null;
  hospitalId: string;
  verifiedById: string | null;
  verifiedAt: string | null;
  proofImageId: string | null;
  metadata: any | null;
  subscriptionId: string | null;
  refundId: string | null;
  advertisementId: string | null;
  createdAt: string;
  updatedAt: string;
}

// Extend the Doctor type to include payments
export interface DoctorWithPayments {
  id: string;
  name: string;
  // Include other doctor properties you need
  payments?: Payment[];
}
