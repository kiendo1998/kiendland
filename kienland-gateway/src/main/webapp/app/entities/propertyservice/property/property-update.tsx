import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ITag } from 'app/shared/model/propertyservice/tag.model';
import { getEntities as getTags } from 'app/entities/propertyservice/tag/tag.reducer';
import { ICategory } from 'app/shared/model/propertyservice/category.model';
import { getEntities as getCategories } from 'app/entities/propertyservice/category/category.reducer';
import { getEntity, updateEntity, createEntity, reset } from './property.reducer';
import { IProperty } from 'app/shared/model/propertyservice/property.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPropertyUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PropertyUpdate = (props: IPropertyUpdateProps) => {
  const [idstag, setIdstag] = useState([]);
  const [idscategory, setIdscategory] = useState([]);
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { propertyEntity, tags, categories, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/property' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getTags();
    props.getCategories();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...propertyEntity,
        ...values,
        tags: mapIdList(values.tags),
        categories: mapIdList(values.categories),
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
          <h2 id="kienlandgatewayApp.propertyserviceProperty.home.createOrEditLabel">Tạo mới hay sửa bất động sản</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : propertyEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="property-id">ID</Label>
                  <AvInput id="property-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="titleLabel" for="property-title">
                  Tiêu đề
                </Label>
                <AvField
                  id="property-title"
                  type="text"
                  name="title"
                  validate={{
                    required: { value: true, errorMessage: 'Trường này là bắt buộc.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="priceLabel" for="property-price">
                  Giá
                </Label>
                <AvField
                  id="property-price"
                  type="string"
                  className="form-control"
                  name="price"
                  validate={{
                    required: { value: true, errorMessage: 'Trường này là bắt buộc.' },
                    number: { value: true, errorMessage: 'Trường này phải là một số.' },
                  }}
                />
              </AvGroup>
              <AvGroup check>
                <Label id="featuredLabel">
                  <AvInput style={{opacity:1,pointerEvents:'auto'}} id="property-featured" type="checkbox" className="form-check-input" name="featured" />
                  Nổi bật
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="purposeLabel" for="property-purpose">
                  Mục đích
                </Label>
                <AvField
                  id="property-purpose"
                  type="text"
                  name="purpose"
                  validate={{
                    required: { value: true, errorMessage: 'Trường này là bắt buộc.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="typeLabel" for="property-type">
                  Kiểu
                </Label>
                <AvField id="property-type" type="text" name="type" />
              </AvGroup>
              <AvGroup>
                <Label id="projectLabel" for="property-project">
                  Dự án
                </Label>
                <AvField id="property-project" type="text" name="project" />
              </AvGroup>
              <AvGroup>
                <Label id="addressLabel" for="property-address">
                  Địa chỉ
                </Label>
                <AvField id="property-address" type="text" name="address" />
              </AvGroup>
              <AvGroup>
                <Label id="areaLabel" for="property-area">
                  Diện tích
                </Label>
                <AvField id="property-area" type="string" className="form-control" name="area" />
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="property-description">
                  Mô tả
                </Label>
                <AvField id="property-description" type="text" name="description" />
              </AvGroup>
              <AvGroup>
                <Label id="latitudeLabel" for="property-latitude">
                  Vĩ độ
                </Label>
                <AvField id="property-latitude" type="text" name="latitude" />
              </AvGroup>
              <AvGroup>
                <Label id="longitudeLabel" for="property-longitude">
                  Kinh độ
                </Label>
                <AvField id="property-longitude" type="text" name="longitude" />
              </AvGroup>
              <AvGroup>
                <Label id="imagesLabel" for="property-images">
                  Ảnh
                </Label>
                <AvField id="property-images" type="text" name="images" multiple/>
              </AvGroup>
              <AvGroup>
                <Label id="createByLabel" for="property-createBy">
                  Tạo bởi
                </Label>
                <AvField id="property-createBy" type="text" name="createBy" />
              </AvGroup>
              <AvGroup>
                <Label id="titleImageLabel" for="property-titleImage">
                  Tiêu đề ảnh
                </Label>
                <AvField id="property-titleImage" type="text" name="titleImage" />
              </AvGroup>
              <AvGroup>
                <Label id="bedRoomLabel" for="property-bedRoom">
                  Số phòng ngủ
                </Label>
                <AvField id="property-bedRoom" type="string" className="form-control" name="bedRoom" />
              </AvGroup>
              <AvGroup>
                <Label id="bathRoomLabel" for="property-bathRoom">
                  Số phòng tắm
                </Label>
                <AvField id="property-bathRoom" type="string" className="form-control" name="bathRoom" />
              </AvGroup>
              <AvGroup>
                <Label for="property-tag">Gắn Thẻ</Label>
                <AvInput
                  id="property-tag"
                  type="select"
                  multiple
                  className="form-control"
                  name="tags"
                  value={propertyEntity.tags && propertyEntity.tags.map(e => e.id)}
                >
                  <option value="" key="0" />
                  {tags
                    ? tags.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.name}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="property-category">Chủ đề</Label>
                <AvInput
                  id="property-category"
                  type="select"
                  multiple
                  className="form-control"
                  name="categories"
                  value={propertyEntity.categories && propertyEntity.categories.map(e => e.id)}
                >
                  <option value="" key="0" />
                  {categories
                    ? categories.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.name}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/property" replace color="info">
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
  tags: storeState.tag.entities,
  categories: storeState.category.entities,
  propertyEntity: storeState.property.entity,
  loading: storeState.property.loading,
  updating: storeState.property.updating,
  updateSuccess: storeState.property.updateSuccess,
});

const mapDispatchToProps = {
  getTags,
  getCategories,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PropertyUpdate);
