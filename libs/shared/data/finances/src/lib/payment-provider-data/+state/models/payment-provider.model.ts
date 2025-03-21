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

export type PaymentProviderPayload = Pick<
  PaymentProvider,
  | 'name'
  | 'internalName'
  | 'channel'
  | 'isActive'
  | 'description'
  | 'apiKey'
  | 'apiSecret'
  | 'swiftCode'
  | 'routingNumber'
  | 'logo'
>;
