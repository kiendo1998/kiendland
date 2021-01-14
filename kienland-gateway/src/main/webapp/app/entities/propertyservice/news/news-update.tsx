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
import { getEntity, updateEntity, createEntity, reset } from './news.reducer';
import { INews } from 'app/shared/model/propertyservice/news.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface INewsUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const NewsUpdate = (props: INewsUpdateProps) => {
  const [idstag, setIdstag] = useState([]);
  const [idscategory, setIdscategory] = useState([]);
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { newsEntity, tags, categories, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/news' + props.location.search);
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
        ...newsEntity,
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
          <h2 id="kienlandgatewayApp.propertyserviceNews.home.createOrEditLabel">Tạo hoặc sửa tin tức</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : newsEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="news-id">ID</Label>
                  <AvInput id="news-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="titleLabel" for="news-title">
                  Tiêu đề
                </Label>
                <AvField
                  id="news-title"
                  type="text"
                  name="title"
                  validate={{
                    required: { value: true, errorMessage: 'Đây là trường bắt buộc.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="contentLabel" for="news-content">
                  Nội dung
                </Label>
                <AvField
                  id="news-content"
                  type="text"
                  name="content"
                  validate={{
                    required: { value: true, errorMessage: 'Đây là trường bắt buộc.' },
                    minLength: { value: 20, errorMessage: 'Trường này yêu cầu ít nhất 20 kí tự.' },
                    maxLength: { value: 10000, errorMessage: 'Độ dài đã vượt quá 1000 kí tự.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="publishDateLabel" for="news-publishDate">
                  Ngày xuất bản
                </Label>
                <AvField id="news-publishDate" type="date" className="form-control" name="publishDate" />
              </AvGroup>
              <AvGroup>
                <Label id="imagesLabel" for="news-images">
                  Ảnh
                </Label>
                <AvField id="news-images" type="text" name="images" multiple/>
              </AvGroup>
              <AvGroup>
                <Label id="titleImageLabel" for="news-titleImage">
                  Ảnh tiêu đề
                </Label>
                <AvField id="news-titleImage" type="text" name="titleImage" />
              </AvGroup>
              <AvGroup>
                <Label for="news-tag">Tag</Label>
                <AvInput
                  id="news-tag"
                  type="select"
                  multiple
                  className="form-control"
                  name="tags"
                  value={newsEntity.tags && newsEntity.tags.map(e => e.id)}
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
                <Label for="news-category">Chủ đề</Label>
                <AvInput
                  id="news-category"
                  type="select"
                  multiple
                  className="form-control"
                  name="categories"
                  value={newsEntity.categories && newsEntity.categories.map(e => e.id)}
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
              <Button tag={Link} id="cancel-save" to="/news" replace color="info">
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
  newsEntity: storeState.news.entity,
  loading: storeState.news.loading,
  updating: storeState.news.updating,
  updateSuccess: storeState.news.updateSuccess,
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

export default connect(mapStateToProps, mapDispatchToProps)(NewsUpdate);
