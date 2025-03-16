export interface AssocMember {
  id: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
  fullName: string;
  initials: string;
  email: string;
  phoneNumber: string;
  isActive: boolean;
  occupation: string;
  profilePhoto: string | null;
}
