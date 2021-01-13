import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './news.reducer';
import { INews } from 'app/shared/model/propertyservice/news.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface INewsDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const NewsDetail = (props: INewsDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { newsEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          News [<b>{newsEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="title">Title</span>
          </dt>
          <dd>{newsEntity.title}</dd>
          <dt>
            <span id="content">Content</span>
          </dt>
          <dd>{newsEntity.content}</dd>
          <dt>
            <span id="publishDate">Publish Date</span>
          </dt>
          <dd>
            {newsEntity.publishDate ? <TextFormat value={newsEntity.publishDate} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="images">Images</span>
          </dt>
          <dd>{newsEntity.images}</dd>
          <dt>
            <span id="titleImage">Title Image</span>
          </dt>
          <dd>{newsEntity.titleImage}</dd>
          <dt>Tag</dt>
          <dd>
            {newsEntity.tags
              ? newsEntity.tags.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {newsEntity.tags && i === newsEntity.tags.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Category</dt>
          <dd>
            {newsEntity.categories
              ? newsEntity.categories.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {newsEntity.categories && i === newsEntity.categories.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/news" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/news/${newsEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ news }: IRootState) => ({
  newsEntity: news.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(NewsDetail);
