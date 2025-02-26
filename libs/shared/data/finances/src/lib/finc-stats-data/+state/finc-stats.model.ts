export interface FincStats {
  title: string;
  startDate: string;
  endDate: string;
  loansDisbursed: {
    count: number;
    amount: number;
  };
  loansRepaid: {
    count: number;
    amount: number;
  };
  withdrawals: {
    count: number;
    amount: number;
  };
  deposits: {
    count: number;
    amount: number;
  };
  contributions: {
    count: number;
    amount: number;
  };
  transactions: {
    count: number;
    amount: number;
  };
}
