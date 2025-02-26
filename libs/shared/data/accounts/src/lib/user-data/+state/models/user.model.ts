export interface User {
  id: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  createdOn: string;
  lastEditedOn: string;
}
