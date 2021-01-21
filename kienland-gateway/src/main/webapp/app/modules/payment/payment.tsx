import './payment.scss';

import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntity, updateEntity, createEntity, reset } from '../../entities/paypal-completed-payments/paypal-completed-payments.reducer';
import { IPaypalCompletedPayments } from 'app/shared/model/paypal-completed-payments.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import {PaypalCompletedPaymentsUpdate} from "app/entities/paypal-completed-payments/paypal-completed-payments-update";
import React, {useEffect, useState} from "react";

export interface IPaymentProp extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}
export const Payment = (props: IPaymentProp) => {
  const [userId, setUserId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { paypalCompletedPaymentsEntity, users, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/payment');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getUsers();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.date = convertDateTimeToServer(values.date);

    if (errors.length === 0) {
      const entity = {
        ...paypalCompletedPaymentsEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };
  const addPaypalScript=()=> {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      const scripttagElement = document.createElement('script');
      scripttagElement.src = 'https://www.paypal.com/sdk/js?client-id=sb';
      // last paypal script (before february 2019)
      // scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    });
  }
  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="kienlandgatewayApp.paypalCompletedPayments.home.createOrEditLabel">Thanh toán phí sử dụng</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : paypalCompletedPaymentsEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="paypal-completed-payments-id">ID</Label>
                  <AvInput id="paypal-completed-payments-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="dateLabel" for="paypal-completed-payments-date">
                  Ngày thanh toán
                </Label>
                <AvInput
                  id="paypal-completed-payments-date"
                  type="datetime-local"
                  className="form-control"
                  name="date"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.paypalCompletedPaymentsEntity.date)}
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="idPaymentLabel" for="paypal-completed-payments-idPayment">
                  Mã thanh toán
                </Label>
                <AvField
                  id="paypal-completed-payments-idPayment"
                  type="text"
                  name="idPayment"
                  validate={{
                    required: { value: true, errorMessage: 'Đây là trường bắt buộc.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="currencyLabel" for="paypal-completed-payments-currency">
                  Loại tiền tệ
                </Label>
                <AvField
                  id="paypal-completed-payments-currency"
                  type="text"
                  name="currency"
                  validate={{
                    required: { value: true, errorMessage: 'Đây là trường bắt buộc.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="amountLabel" for="paypal-completed-payments-amount">
                  Số tiền
                </Label>
                <AvField
                  id="paypal-completed-payments-amount"
                  type="string"
                  className="form-control"
                  name="amount"
                  validate={{
                    required: { value: true, errorMessage: 'Đây là trường bắt buộc.' },
                    min: { value: 0, errorMessage: 'Trường này phải có giá trị ít nhất là 0.' },
                    number: { value: true, errorMessage: 'Đây là trường số.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="emailLabel" for="paypal-completed-payments-email">
                  Email
                </Label>
                <AvField
                  id="paypal-completed-payments-email"
                  type="text"
                  name="email"
                  validate={{
                    required: { value: true, errorMessage: 'Đây là trường bắt buộc.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="nameLabel" for="paypal-completed-payments-name">
                  Tên
                </Label>
                <AvField
                  id="paypal-completed-payments-name"
                  type="text"
                  name="name"
                  validate={{
                    required: { value: true, errorMessage: 'Đây là trường bắt buộc.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="statusLabel" for="paypal-completed-payments-status">
                  Trạng thái
                </Label>
                <AvField
                  id="paypal-completed-payments-status"
                  type="text"
                  name="status"
                  validate={{
                    required: { value: true, errorMessage: 'Đây là trường bắt buộc.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label for="paypal-completed-payments-user">User</Label>
                <AvInput id="paypal-completed-payments-user" type="select" className="form-control" name="user.id">
                  <option value="" key="0" />
                  {users
                    ? users.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Lưu
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
}
const mapStateToProps = (storeState: IRootState) => ({
  users: storeState.userManagement.users,
  paypalCompletedPaymentsEntity: storeState.paypalCompletedPayments.entity,
  loading: storeState.paypalCompletedPayments.loading,
  updating: storeState.paypalCompletedPayments.updating,
  updateSuccess: storeState.paypalCompletedPayments.updateSuccess,
});

const mapDispatchToProps = {
  getUsers,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Payment);

