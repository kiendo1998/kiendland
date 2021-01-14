import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MDBIcon, MDBContainer, MDBBtn } from 'mdbreact';
import { IRootState } from 'app/shared/reducers';
import { getEntity } from './news.reducer';
import { INews } from 'app/shared/model/propertyservice/news.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon } from 'react-share';
export interface INewsDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const NewsDetail = (props: INewsDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { newsEntity } = props;
  return (
    <section className="section">
      <FacebookShareButton url={"https://facebook.com"} quote={"Kienland là website bán bất động sản lớn nhất Việt Nam"} className="share">
        <FacebookIcon size={32} round={true}/>
      </FacebookShareButton>
      <TwitterShareButton url={"https://facebook.com"} className="share">
        <TwitterIcon size={32} round={true}/>
      </TwitterShareButton>
      <div className="container">
        <div className="row">
          <div className="col s12 m8">

            <div className="card">
              <div className="card-image">
                <img src={"../../../../content/images/"+newsEntity.titleImage}/>
              </div>
              <div className="card-content">
                <span className="card-title" title="{{$post->title}}">{newsEntity.title}</span>
                {newsEntity.content}
              </div>
              <div className="card-action blog-action">
                <a href="{{ route('blog.author',$post->user->username) }}" className="btn-flat">
                  <i className="material-icons">person</i>
                  <span>Admin</span>
                </a>
                <a href="#" className="btn-flat disabled">
                  <i className="material-icons">watch_later</i>
                  <span>{newsEntity.publishDate}</span>
                </a>
                {newsEntity.categories
                  ? newsEntity.categories.map((val, i) => (
                    <span key={val.id}>
                <a href="{{ route('blog.categories',$category->slug) }}" className="btn-flat">
                  <i className="material-icons">folder</i>
                  <span>{val.name}</span>
                </a>
                          {newsEntity.categories && i === newsEntity.categories.length - 1 ? '' : ', '}
                  </span>
                  ))
                  : null}
                {newsEntity.tags
                  ? newsEntity.tags.map((val, i) => (
                    <span key={val.id}>
                <a href="{{ route('blog.tags',$tag->slug) }}" className="btn-flat">
                  <i className="material-icons">label</i>
                  <span>{val.name}</span>
                </a>
                  {newsEntity.tags && i === newsEntity.tags.length - 1 ? '' : ', '}
                  </span>
                  ))
                  : null}
                <a href="#" className="btn-flat disabled">
                  <i className="material-icons">visibility</i>
                  <span>5</span>
                </a>
              </div>

            </div>

            <div className="card" id="comments">
              <div className="p-15 grey lighten-4">
                <h5 className="m-0">7 Bình luận</h5>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = ({ news }: IRootState) => ({
  newsEntity: news.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(NewsDetail);
{/*<Row>*/}
{/*  <Col md="8">*/}
{/*    <h2>*/}
{/*      News [<b>{newsEntity.id}</b>]*/}
{/*    </h2>*/}
{/*    <dl className="jh-entity-details">*/}
{/*      <dt>*/}
{/*        <span id="title">Title</span>*/}
{/*      </dt>*/}
{/*      <dd>{newsEntity.title}</dd>*/}
{/*      <dt>*/}
{/*        <span id="content">Content</span>*/}
{/*      </dt>*/}
{/*      <dd>{newsEntity.content}</dd>*/}
{/*      <dt>*/}
{/*        <span id="publishDate">Publish Date</span>*/}
{/*      </dt>*/}
{/*      <dd>*/}
{/*        {newsEntity.publishDate ? <TextFormat value={newsEntity.publishDate} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}*/}
{/*      </dd>*/}
{/*      <dt>*/}
{/*        <span id="images">Images</span>*/}
{/*      </dt>*/}
{/*      <dd>{newsEntity.images}</dd>*/}
{/*      <dt>*/}
{/*        <span id="titleImage">Title Image</span>*/}
{/*      </dt>*/}
{/*      <dd>{newsEntity.titleImage}</dd>*/}
{/*      <dt>Tag</dt>*/}
{/*      <dd>*/}
{/*        {newsEntity.tags*/}
{/*          ? newsEntity.tags.map((val, i) => (*/}
{/*            <span key={val.id}>*/}
{/*                    <a>{val.name}</a>*/}
{/*              {newsEntity.tags && i === newsEntity.tags.length - 1 ? '' : ', '}*/}
{/*                  </span>*/}
{/*          ))*/}
{/*          : null}*/}
{/*      </dd>*/}
{/*      <dt>Category</dt>*/}
{/*      <dd>*/}
{/*        {newsEntity.categories*/}
{/*          ? newsEntity.categories.map((val, i) => (*/}
{/*            <span key={val.id}>*/}
{/*                    <a>{val.name}</a>*/}
{/*              {newsEntity.categories && i === newsEntity.categories.length - 1 ? '' : ', '}*/}
{/*                  </span>*/}
{/*          ))*/}
{/*          : null}*/}
{/*      </dd>*/}
{/*    </dl>*/}
{/*    <Button tag={Link} to="/news" replace color="info">*/}
{/*      <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>*/}
{/*    </Button>*/}
{/*    &nbsp;*/}
{/*    <Button tag={Link} to={`/news/${newsEntity.id}/edit`} replace color="primary">*/}
{/*      <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>*/}
{/*    </Button>*/}
{/*  </Col>*/}
{/*</Row>*/}
