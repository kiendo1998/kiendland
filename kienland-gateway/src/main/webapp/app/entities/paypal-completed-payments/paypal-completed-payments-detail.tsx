import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './paypal-completed-payments.reducer';
import { IPaypalCompletedPayments } from 'app/shared/model/paypal-completed-payments.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPaypalCompletedPaymentsDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PaypalCompletedPaymentsDetail = (props: IPaypalCompletedPaymentsDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { paypalCompletedPaymentsEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Thanh toán [<b>{paypalCompletedPaymentsEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="date">Ngày thanh toán</span>
          </dt>
          <dd>
            {paypalCompletedPaymentsEntity.date ? (
              <TextFormat value={paypalCompletedPaymentsEntity.date} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="idPayment">Mã thanh toán</span>
          </dt>
          <dd>{paypalCompletedPaymentsEntity.idPayment}</dd>
          <dt>
            <span id="currency">Loại tiền tệ</span>
          </dt>
          <dd>{paypalCompletedPaymentsEntity.currency}</dd>
          <dt>
            <span id="amount">Số tiền</span>
          </dt>
          <dd>{paypalCompletedPaymentsEntity.amount}</dd>
          <dt>
            <span id="email">Email</span>
          </dt>
          <dd>{paypalCompletedPaymentsEntity.email}</dd>
          <dt>
            <span id="name">Tên</span>
          </dt>
          <dd>{paypalCompletedPaymentsEntity.name}</dd>
          <dt>
            <span id="status">Trạng thái</span>
          </dt>
          <dd>{paypalCompletedPaymentsEntity.status}</dd>
          <dt>User</dt>
          <dd>{paypalCompletedPaymentsEntity.user ? paypalCompletedPaymentsEntity.user.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/paypal-completed-payments" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Trở về</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/paypal-completed-payments/${paypalCompletedPaymentsEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Sửa</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ paypalCompletedPayments }: IRootState) => ({
  paypalCompletedPaymentsEntity: paypalCompletedPayments.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PaypalCompletedPaymentsDetail);
