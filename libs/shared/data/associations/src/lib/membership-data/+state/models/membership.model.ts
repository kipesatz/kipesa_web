import { Association, AssocMember } from '../../../association-data';

export interface Membership {
  id: string;
  association: Association;
  user: AssocMember;
  role: { id: string; name: string };
  status: string;
  joinedAt: string;
}

export interface MembershipPayload {
  association: string;
  user: string;
  role: string;
}

export interface ReqMembershipPayload {
  association: string;
}
