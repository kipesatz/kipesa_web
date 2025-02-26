export interface RegistrationPayload {
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  password: string;
}

export type RegistrationResponse = Omit<RegistrationPayload, 'password'>;
