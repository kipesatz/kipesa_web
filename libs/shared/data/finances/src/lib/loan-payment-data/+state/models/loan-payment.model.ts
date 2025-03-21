export interface LoanPayment {
  id: string;
  loan: string;
  paymentToken: string;
  paymentProvider: string;
  status: string;
  interestAmount: number;
  principalAmount: number;
  paidAmount: number;
  totalAmount: number;
  paymentDate: string;
  beginningBalance: number;
  endingBalance: number;
  remainingAmount: number;
  isLateFee: boolean;
  lateFee: number;
  description: string | null;
  createdOn: string;
  lastEditedOn: string;
}

export type LoanPaymentPayload = Pick<
  LoanPayment,
  'paymentProvider' | 'paidAmount' | 'loan'
>;
