export interface PaymentProvider {
  id: string;
  name: string;
  internalName: string;
  isActive: boolean;
  channel: string;
  logo: string;
  description: string;
}

export interface PaymentMethod {
  id: string;
  provider: PaymentProvider;
  methodType: string;
  isDefault: boolean;
  isActive: boolean;
  nickname: string | null;

  // for bank related payment methods
  cardExpiryYear: number | null;
  cardExpiryMonth: number | null;
  cardNumber: string | null;
  cardCvv: number | null;
  cardHoldersName: string | null;

  // for mobile related payment methods
  phoneNumber: string | null;
}

export interface PaymentMethodPayload
  extends Omit<PaymentMethod, 'id' | 'provider'> {
  provider: string; // provider id
}
