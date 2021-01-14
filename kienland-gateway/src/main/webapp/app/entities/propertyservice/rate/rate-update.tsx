import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IProperty } from 'app/shared/model/propertyservice/property.model';
import { getEntities as getProperties } from 'app/entities/propertyservice/property/property.reducer';
import { getEntity, updateEntity, createEntity, reset } from './rate.reducer';
import { IRate } from 'app/shared/model/propertyservice/rate.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IRateUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const RateUpdate = (props: IRateUpdateProps) => {
  const [propertyId, setPropertyId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { rateEntity, properties, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/rate' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getProperties();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...rateEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="kienlandgatewayApp.propertyserviceRate.home.createOrEditLabel">Tạo hoặc sửa đánh giá</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : rateEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="rate-id">ID</Label>
                  <AvInput id="rate-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="ratePointLabel" for="rate-ratePoint">
                  Điểm đánh giá
                </Label>
                <AvField
                  id="rate-ratePoint"
                  type="string"
                  className="form-control"
                  name="ratePoint"
                  validate={{
                    min: { value: 1, errorMessage: 'This field should be at least 1.' },
                    max: { value: 5, errorMessage: 'This field cannot be more than 5.' },
                    number: { value: true, errorMessage: 'This field should be a number.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label for="rate-property">Bất động sản</Label>
                <AvInput id="rate-property" type="select" className="form-control" name="property.id">
                  <option value="" key="0" />
                  {properties
                    ? properties.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/rate" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Trở về</span>
              </Button>
              &nbsp;
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
};

const mapStateToProps = (storeState: IRootState) => ({
  properties: storeState.property.entities,
  rateEntity: storeState.rate.entity,
  loading: storeState.rate.loading,
  updating: storeState.rate.updating,
  updateSuccess: storeState.rate.updateSuccess,
});

const mapDispatchToProps = {
  getProperties,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RateUpdate);
