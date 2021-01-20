import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import property, {
  PropertyState
} from 'app/entities/propertyservice/property/property.reducer';
// prettier-ignore
import news, {
  NewsState
} from 'app/entities/propertyservice/news/news.reducer';
// prettier-ignore
import rate, {
  RateState
} from 'app/entities/propertyservice/rate/rate.reducer';
// prettier-ignore
import tag, {
  TagState
} from 'app/entities/propertyservice/tag/tag.reducer';
// prettier-ignore
import category, {
  CategoryState
} from 'app/entities/propertyservice/category/category.reducer';
// prettier-ignore
import comment, {
  CommentState
} from 'app/entities/propertyservice/comment/comment.reducer';
// prettier-ignore
import paypalCompletedPayments, {
  PaypalCompletedPaymentsState
} from 'app/entities/paypal-completed-payments/paypal-completed-payments.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly property: PropertyState;
  readonly news: NewsState;
  readonly rate: RateState;
  readonly tag: TagState;
  readonly category: CategoryState;
  readonly comment: CommentState;
  readonly paypalCompletedPayments: PaypalCompletedPaymentsState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  property,
  news,
  rate,
  tag,
  category,
  comment,
  paypalCompletedPayments,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar,
});

export default rootReducer;
