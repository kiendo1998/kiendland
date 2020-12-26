import { IProperty } from 'app/shared/model/propertyservice/property.model';
import { INews } from 'app/shared/model/propertyservice/news.model';

export interface ICategory {
  id?: number;
  name?: string;
  image?: string;
  properties?: IProperty[];
  news?: INews[];
}

export const defaultValue: Readonly<ICategory> = {};
