export interface PaymentMethod {
  readonly id: string;
  /**string in uppercase */
  provider: string;
  /**human convinient name */
  name: string;
  providerLogo: string;
  isActive: boolean;
  /**contains detailed information about how to pay about this  */
  description: string;
  readonly createdOn: string;
  readonly lastEditedOn: string;
}

export interface PayMethodPayload
  extends Pick<
    PaymentMethod,
    'name' | 'provider' | 'isActive' | 'description'
  > {
  providerLogo: string | null;
}
