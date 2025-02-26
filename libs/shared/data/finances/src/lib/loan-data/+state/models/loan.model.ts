import { Association, Membership } from '@kps/data/associations';

export interface Loan {
  id: string;
  loanNumber: string;
  association: Association; // each loan originates from a specific association
  loanType: string;
  loanPurpose: string; // description about loan's intended use
  borrower: Membership;
  disbursedAmount: number;
  totalAmountDue: number;
  interestRate: number;
  totalInterest: number;
  issueDate: string;
  dueDate: string;
  repaymentFrequency: string;
  lastRepaymentDate: string;
  lastRepaymentAmount: number;
  nextRepaymentDate: string;
  nextRepaymentAmount: number;
  remainingBalance: number;
  totalPaid: number;
  loanStatus: string;
  diliquencyStatus: number;
  defaultDate: string;
  closureDate: string;
  loanFee: number;
  notes: string | null;
  loanTerm: string;
}

export interface LoanPayload
  extends Omit<
    Loan,
    | 'association'
    | 'loanTerm'
    | 'id'
    | 'loanNumber'
    | 'borrower'
    | 'totalPaid'
    | 'diliquencyStatus'
  > {
  borrower: string;
}
