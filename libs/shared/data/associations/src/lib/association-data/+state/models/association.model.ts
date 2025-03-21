export interface Association {
  id: string;
  name: string;
  groupType: string;
  groupCapacity: number;
  initialBalance: number;
  logo: string | null;
  description: string;
  createdOn: string;
  lastEditedOn: string;
  isActive: boolean;
}

export type AssociationPayload = Pick<
  Association,
  'name' | 'groupType' | 'groupCapacity' | 'initialBalance' | 'description'
>;
