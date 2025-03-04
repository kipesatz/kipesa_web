import { Association } from '@kps/data/associations';

export interface ContributionPurpose {
  id: string;
  association: Association;
  title: string;
  targetAmount: number;
  minAmount: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  description: string;
  collectedAmount: number;
  contributionsCount: number;
  avgContribution: number;
  progressPercentage: number;
  monthlyGrowth: number;
  remainingTime: string;
  createdOn: string;
  lastEditedOn: string;
}

export type CpPayload = Pick<
  ContributionPurpose,
  | 'title'
  | 'targetAmount'
  | 'minAmount'
  | 'startDate'
  | 'endDate'
  | 'description'
>;
