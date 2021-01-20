import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col,Input, Row, Table } from 'reactstrap';
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './paypal-completed-payments.reducer';
import { IPaypalCompletedPayments } from 'app/shared/model/paypal-completed-payments.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPaypalCompletedPaymentsProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const PaypalCompletedPayments = (props: IPaypalCompletedPaymentsProps) => {
  const [filter, setFilter] = useState('');
  const changeFilter = evt => setFilter(evt.target.value);
  useEffect(() => {
    props.getEntities();
  }, []);

  const { paypalCompletedPaymentsList, match, loading } = props;
  return (
    <div>
      <h2 id="paypal-completed-payments-heading">
        Paypal Completed Payments
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Paypal Completed Payments
        </Link>
      </h2>
      <span>Tìm kiếm</span> <Input placeholder="nhập tên" type="search" value={filter} onChange={changeFilter} name="search" id="search" />
      <div className="table-responsive">
        {paypalCompletedPaymentsList && paypalCompletedPaymentsList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Id Payment</th>
                <th>Currency</th>
                <th>Amount</th>
                <th>Email</th>
                <th>Name</th>
                <th>Status</th>
                <th>User</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {paypalCompletedPaymentsList.filter(pay=>pay.name.toLowerCase().includes(`${filter}`.toLowerCase())).map((paypalCompletedPayments, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${paypalCompletedPayments.id}`} color="link" size="sm">
                      {paypalCompletedPayments.id}
                    </Button>
                  </td>
                  <td>
                    {paypalCompletedPayments.date ? (
                      <TextFormat type="date" value={paypalCompletedPayments.date} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{paypalCompletedPayments.idPayment}</td>
                  <td>{paypalCompletedPayments.currency}</td>
                  <td>{paypalCompletedPayments.amount}</td>
                  <td>{paypalCompletedPayments.email}</td>
                  <td>{paypalCompletedPayments.name}</td>
                  <td>{paypalCompletedPayments.status}</td>
                  <td>{paypalCompletedPayments.user ? paypalCompletedPayments.user.id : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${paypalCompletedPayments.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${paypalCompletedPayments.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${paypalCompletedPayments.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Paypal Completed Payments found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ paypalCompletedPayments }: IRootState) => ({
  paypalCompletedPaymentsList: paypalCompletedPayments.entities,
  loading: paypalCompletedPayments.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PaypalCompletedPayments);
