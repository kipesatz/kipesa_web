export interface RegistrationPayload {
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}
