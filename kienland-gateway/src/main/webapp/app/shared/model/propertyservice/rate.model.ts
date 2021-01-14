import { IProperty } from 'app/shared/model/propertyservice/property.model';

export interface IRate {
  id?: number;
  ratePoint?: number;
  property?: IProperty;
}

export const defaultValue: Readonly<IRate> = {};
