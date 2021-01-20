import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Property from './propertyservice/property';
import News from './propertyservice/news';
import Rate from './propertyservice/rate';
import Tag from './propertyservice/tag';
import Category from './propertyservice/category';
import Comment from './propertyservice/comment';
import PaypalCompletedPayments from './paypal-completed-payments';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}property`} component={Property} />
      <ErrorBoundaryRoute path={`${match.url}news`} component={News} />
      <ErrorBoundaryRoute path={`${match.url}rate`} component={Rate} />
      <ErrorBoundaryRoute path={`${match.url}tag`} component={Tag} />
      <ErrorBoundaryRoute path={`${match.url}category`} component={Category} />
      <ErrorBoundaryRoute path={`${match.url}comment`} component={Comment} />
      <ErrorBoundaryRoute path={`${match.url}paypal-completed-payments`} component={PaypalCompletedPayments} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
