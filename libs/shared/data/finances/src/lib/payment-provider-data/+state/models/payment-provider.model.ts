export interface PaymentProvider {
  readonly id: string;
  name: string;
  internalName: string;
  channel: string;
  logo: string;
  isActive: boolean;
  /**contains detailed information about how to pay about this  */
  description: string;
  apiKey: string | null;
  apiSecret: string | null;
  swiftCode: string | null;
  routingNumber: string | null;
  readonly createdOn: string;
  readonly lastEditedOn: string;
}

export interface PaymentProviderPayload
  extends Pick<
    PaymentProvider,
    'name' | 'internalName' | 'isActive' | 'description'
  > {
  logo: string | null;
}
