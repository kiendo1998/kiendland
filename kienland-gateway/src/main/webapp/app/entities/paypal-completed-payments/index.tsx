import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PaypalCompletedPayments from './paypal-completed-payments';
import PaypalCompletedPaymentsDetail from './paypal-completed-payments-detail';
import PaypalCompletedPaymentsUpdate from './paypal-completed-payments-update';
import PaypalCompletedPaymentsDeleteDialog from './paypal-completed-payments-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PaypalCompletedPaymentsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PaypalCompletedPaymentsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PaypalCompletedPaymentsDetail} />
      <ErrorBoundaryRoute path={match.url} component={PaypalCompletedPayments} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={PaypalCompletedPaymentsDeleteDialog} />
  </>
);

export default Routes;
