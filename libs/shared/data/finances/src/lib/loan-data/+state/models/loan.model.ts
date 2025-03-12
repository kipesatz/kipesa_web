import { Association, Membership } from '@kps/data/associations';
import { LoanProduct } from '../../../loan-product-data';

export interface Loan {
  id: string;
  loanProduct: LoanProduct;
  loanNumber: string;
  association: Association; // each loan originates from a specific association
  loanPurpose: string; // description about loan's intended use
  applicationDate: string;
  approvalDate: string | null;
  approver: string | null;
  apr: number;
  completionDate: string | null;
  currency: string;
  currentBalance: string;
  disbursementDate: string | null;
  expectedCompletionDate: string | null;
  interestRate: string;
  loanAmount: number;
  loanOfficer: string | null;
  loanStatus: string;
  loanTermMonths: number;
  loanTermYears: number;
  member: Membership;
  nextPayment: string | null;
  notes: string;
  paidAmount: string;
  paidInterest: string;
  paidPrincipal: string;
  paymentFrequency: string;
  paymentProgress: number;
  processingFee: string;
  rejectionReason: string | null;
  totalInterest: string;
  totalPayable: string;
  createdOn: string;
  lastEditedOn: string;
}

type BaseLoanPayload = Pick<
  Loan,
  | 'loanPurpose'
  | 'notes'
  | 'currency'
  | 'loanAmount'
  | 'loanTermYears'
  | 'loanTermMonths'
  | 'paymentFrequency'
>;

export interface LoanPayload extends BaseLoanPayload {
  member: string;
  loanProduct: string;
}
