import { IProperty } from 'app/shared/model/propertyservice/property.model';
import { INews } from 'app/shared/model/propertyservice/news.model';

export interface IComment {
  id?: number;
  content?: string;
  type?: string;
  property?: IProperty;
  news?: INews;
}

export const defaultValue: Readonly<IComment> = {};
