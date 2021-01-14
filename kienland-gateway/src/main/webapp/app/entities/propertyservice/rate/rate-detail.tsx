import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './rate.reducer';
import { IRate } from 'app/shared/model/propertyservice/rate.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRateDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const RateDetail = (props: IRateDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { rateEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Đánh giá [<b>{rateEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="ratePoint">Điểm đánh giá</span>
          </dt>
          <dd>{rateEntity.ratePoint}</dd>
          <dt>Bất động sản</dt>
          <dd>{rateEntity.property ? rateEntity.property.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/rate" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Trở về</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/rate/${rateEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Sửa</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ rate }: IRootState) => ({
  rateEntity: rate.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RateDetail);
