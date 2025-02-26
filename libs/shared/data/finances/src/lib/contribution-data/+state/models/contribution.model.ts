import { User } from '@kps/data/accounts';
import { ContributionPurpose } from '../../../cp-data';

export interface Contribution {
  id: string;
  member: User;
  purpose: ContributionPurpose;
  transactionRef: string;
  amount: number;
  paymentMethod: string;
  contributionDate: string;
  status: string;
  createdOn: string;
  lastEditedOn: string;
  notes: string | null;
}

export interface ContributionPayload
  extends Pick<Contribution, 'paymentMethod' | 'amount' | 'notes'> {
  member: string;
  purpose: string;
}
