export interface User {
  id: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
  fullName: string;
  initials: string;
  email: string;
  phoneNumber: string;
  profilePhoto: string | null;
  occupation: string;
  createdOn: string;
  lastEditedOn: string;
}
