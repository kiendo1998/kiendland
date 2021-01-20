import { Moment } from 'moment';
import { IUser } from 'app/shared/model/user.model';

export interface IPaypalCompletedPayments {
  id?: number;
  date?: string;
  idPayment?: string;
  currency?: string;
  amount?: number;
  email?: string;
  name?: string;
  status?: string;
  user?: IUser;
}

export const defaultValue: Readonly<IPaypalCompletedPayments> = {};
