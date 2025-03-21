import { User } from '@kps/data/accounts';

export interface Collateral {
  id: string;
  loan: string;
  type: string;
  title: string;
  description: string | null;
  estimatedValue: number;
  valuationDate: string;
  status: string;
  verifiedBy: User | null;
  verificationDate: string | null;
  verificationNotes: string | null;
  createdOn: string;
  lastEditedOn: string;
}

export type CollateralPayload = Omit<
  Collateral,
  'id' | 'createdOn' | 'lastEditedOn' | 'verifiedBy'
>;
