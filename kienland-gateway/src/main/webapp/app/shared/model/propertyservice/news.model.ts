import { Moment } from 'moment';
import { ITag } from 'app/shared/model/propertyservice/tag.model';
import { ICategory } from 'app/shared/model/propertyservice/category.model';

export interface INews {
  id?: number;
  title?: string;
  content?: string;
  publishDate?: string;
  tags?: ITag[];
  categories?: ICategory[];
}

export const defaultValue: Readonly<INews> = {};
