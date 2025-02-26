export interface Transaction {
  id: string;
  association: string;
  createdOn: string;
  lastEditedOn: string;
  transactionRef: string;
  transactionStatus: string;
  transactionType: string;
  transactionNature: string;    // debit or credit
  amount: number;
  tax: number;
  currency: string;
  description: string | null;
  source: string;
  payerId: string;
  transactionFee: number;
  transactionChannel: string;   // mobile, banking
}
