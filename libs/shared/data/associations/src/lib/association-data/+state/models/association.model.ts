export interface Association {
  id: string;
  name: string;
  description: string;
  createdOn: string;
  lastEditedOn: string;
  isActive: boolean;
}

export type AssociationPayload = Pick<Association, 'name' | 'description'>;
