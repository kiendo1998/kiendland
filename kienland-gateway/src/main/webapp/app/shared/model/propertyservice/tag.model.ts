import { IProperty } from 'app/shared/model/propertyservice/property.model';

export interface ITag {
  id?: number;
  name?: string;
  properties?: IProperty[];
}

export const defaultValue: Readonly<ITag> = {};
