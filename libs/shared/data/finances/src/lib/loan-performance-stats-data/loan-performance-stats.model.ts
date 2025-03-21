export interface LoansPerformance {
  relativePercent: number;
  applications: number;
  fundedAmount: number;
  totalRepaidAmount: number;
  totalMembers: number;
}

export interface LoanPerformanceStats {
  goodLoans: LoansPerformance;
  badLoans: LoansPerformance;
}
