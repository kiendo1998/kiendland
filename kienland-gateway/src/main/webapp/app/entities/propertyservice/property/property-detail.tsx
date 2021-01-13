import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './property.reducer';
import { IProperty } from 'app/shared/model/propertyservice/property.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPropertyDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PropertyDetail = (props: IPropertyDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { propertyEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Property [<b>{propertyEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="title">Title</span>
          </dt>
          <dd>{propertyEntity.title}</dd>
          <dt>
            <span id="price">Price</span>
          </dt>
          <dd>{propertyEntity.price}</dd>
          <dt>
            <span id="featured">Featured</span>
          </dt>
          <dd>{propertyEntity.featured ? 'true' : 'false'}</dd>
          <dt>
            <span id="purpose">Purpose</span>
          </dt>
          <dd>{propertyEntity.purpose}</dd>
          <dt>
            <span id="type">Type</span>
          </dt>
          <dd>{propertyEntity.type}</dd>
          <dt>
            <span id="project">Project</span>
          </dt>
          <dd>{propertyEntity.project}</dd>
          <dt>
            <span id="address">Address</span>
          </dt>
          <dd>{propertyEntity.address}</dd>
          <dt>
            <span id="area">Area</span>
          </dt>
          <dd>{propertyEntity.area}</dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{propertyEntity.description}</dd>
          <dt>
            <span id="latitude">Latitude</span>
          </dt>
          <dd>{propertyEntity.latitude}</dd>
          <dt>
            <span id="longitude">Longitude</span>
          </dt>
          <dd>{propertyEntity.longitude}</dd>
          <dt>
            <span id="images">Images</span>
          </dt>
          <dd>{propertyEntity.images}</dd>
          <dt>
            <span id="createBy">Create By</span>
          </dt>
          <dd>{propertyEntity.createBy}</dd>
          <dt>
            <span id="titleImage">Title Image</span>
          </dt>
          <dd>{propertyEntity.titleImage}</dd>
          <dt>
            <span id="bedRoom">Bed Room</span>
          </dt>
          <dd>{propertyEntity.bedRoom}</dd>
          <dt>
            <span id="bathRoom">Bath Room</span>
          </dt>
          <dd>{propertyEntity.bathRoom}</dd>
          <dt>Tag</dt>
          <dd>
            {propertyEntity.tags
              ? propertyEntity.tags.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {propertyEntity.tags && i === propertyEntity.tags.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Category</dt>
          <dd>
            {propertyEntity.categories
              ? propertyEntity.categories.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {propertyEntity.categories && i === propertyEntity.categories.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/property" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/property/${propertyEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ property }: IRootState) => ({
  propertyEntity: property.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PropertyDetail);
