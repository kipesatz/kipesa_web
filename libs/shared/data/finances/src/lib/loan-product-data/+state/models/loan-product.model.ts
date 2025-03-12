export interface LoanProduct {
  id: string;
  name: string;
  description: string;
  minAmount: number;
  maxAmount: number;
  interestRate: number;
  minTermMonths: number;
  maxTermMonths: number;
  paymentFrequency: string;
  latePaymentFee: number;
  earlyPaymentFee: number;
  earlyPaymentAllowed: boolean;
  earlyPaymentPenalty: number;
  requiredCreditScore: number;
  isActive: boolean;
}

export type LoanProductPayload = Omit<LoanProduct, 'id'>;
 