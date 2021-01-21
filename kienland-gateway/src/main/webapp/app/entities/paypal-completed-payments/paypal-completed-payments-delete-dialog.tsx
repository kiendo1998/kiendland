import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IPaypalCompletedPayments } from 'app/shared/model/paypal-completed-payments.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './paypal-completed-payments.reducer';

export interface IPaypalCompletedPaymentsDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PaypalCompletedPaymentsDeleteDialog = (props: IPaypalCompletedPaymentsDeleteDialogProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const handleClose = () => {
    props.history.push('/paypal-completed-payments');
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const confirmDelete = () => {
    props.deleteEntity(props.paypalCompletedPaymentsEntity.id);
  };

  const { paypalCompletedPaymentsEntity } = props;
  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose}>Xác nhận hoạt động xóa</ModalHeader>
      <ModalBody id="kienlandgatewayApp.paypalCompletedPayments.delete.question">
        Bạn có chắc muốn xóa thông tin thanh toán này không?
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp; Hủy
        </Button>
        <Button id="jhi-confirm-delete-paypalCompletedPayments" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp; Xóa
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ paypalCompletedPayments }: IRootState) => ({
  paypalCompletedPaymentsEntity: paypalCompletedPayments.entity,
  updateSuccess: paypalCompletedPayments.updateSuccess,
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PaypalCompletedPaymentsDeleteDialog);
