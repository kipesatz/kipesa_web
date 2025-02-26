import { AssocMember } from '../../association-data';

export interface MembershipStats {
  activeMemberships: number;
  pendingMemberships: number;
  total: number;
  rejectedMemberships: number;
  chairperson: AssocMember | null;
  secretary: AssocMember | null;
  accountant: AssocMember | null;
}
