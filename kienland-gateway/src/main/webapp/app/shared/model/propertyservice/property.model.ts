import { ITag } from 'app/shared/model/propertyservice/tag.model';
import { ICategory } from 'app/shared/model/propertyservice/category.model';

export interface IProperty {
  id?: number;
  title?: string;
  price?: number;
  featured?: boolean;
  purpose?: string;
  type?: string;
  project?: string;
  address?: string;
  area?: number;
  description?: string;
  latitude?: string;
  longitude?: string;
  images?: string;
  createBy?: string;
  titleImage?: string;
  bedRoom?: number;
  bathRoom?: number;
  tags?: ITag[];
  categories?: ICategory[];
}

export const defaultValue: Readonly<IProperty> = {
  featured: false,
};
