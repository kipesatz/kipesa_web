import { User } from '../../../user-data';

export interface AuthUser
  extends Pick<
    User,
    | 'email'
    | 'phoneNumber'
    | 'firstName'
    | 'lastName'
    | 'middleName'
    | 'fullName'
    | 'id'
  > {
  initials: string;
  lastLogin: string;
  dateJoined: string;
  lastEditedOn: string;
  isActive: boolean;
  isStaff: boolean;
  isSuperuser: boolean;
  address: string | null;
  dob: string | null;
  occupation: string | null;
  nationalId: string | null;
}

export type AuthUserPayload = Pick<
  AuthUser,
  | 'firstName'
  | 'middleName'
  | 'lastName'
  | 'address'
  | 'dob'
  | 'occupation'
  | 'nationalId'
>;
