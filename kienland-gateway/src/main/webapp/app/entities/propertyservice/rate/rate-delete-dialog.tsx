import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRate } from 'app/shared/model/propertyservice/rate.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './rate.reducer';

export interface IRateDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const RateDeleteDialog = (props: IRateDeleteDialogProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const handleClose = () => {
    props.history.push('/rate' + props.location.search);
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const confirmDelete = () => {
    props.deleteEntity(props.rateEntity.id);
  };

  const { rateEntity } = props;
  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose}>Xác nhận xóa</ModalHeader>
      <ModalBody id="kienlandgatewayApp.propertyserviceRate.delete.question">Bạn có chắc muốn xóa đánh giá này không?</ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp; Hủy
        </Button>
        <Button id="jhi-confirm-delete-rate" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp; Xóa
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ rate }: IRootState) => ({
  rateEntity: rate.entity,
  updateSuccess: rate.updateSuccess,
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RateDeleteDialog);
