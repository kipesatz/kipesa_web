import { Association } from '@kps/data/associations';

export interface FinancialReport  {
  id: string;
  createdOn: string;
  lastEditedOn: string;
  association: Association;
  title: string;
  timeRange: string;
  startDate: string;
  endDate: string;
  filePath: string;
  loansDisbursedCount: number;
  loansDisbursedAmount: number;
  loansReturnedCount: number;
  loansReturnedAmount: number;
  withdrawalsCount: number;
  withdrawalsAmount: number;
  depositsCount: number;
  depositsAmount: number;
}

export interface FincReportGenPayload
  extends Pick<FinancialReport , 'timeRange' | 'startDate' | 'endDate'> {
  association: string;
}
