import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Row, Col} from 'reactstrap';
import {ICrudGetAction} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {IRootState} from 'app/shared/reducers';
import {getEntity} from './property.reducer';
import {IProperty} from 'app/shared/model/propertyservice/property.model';
import {APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT} from 'app/config/constants';
import {FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton} from "react-share";
import { FacebookProvider, Comments } from 'react-facebook';

export interface IPropertyDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
}

export const PropertyDetail = (props: IPropertyDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const {propertyEntity} = props;
  let feature
  if (propertyEntity.featured) {
    feature = <a className="btn-floating btn-small disabled"><i className="material-icons">star</i></a>
  } else {
    feature = <a className="btn-floating btn-small disabled"><i className="material-icons"></i></a>
  }
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
          <div className="single-title">
            <h4 className="single-title">{propertyEntity.title}</h4>
          </div>

          <div className="address m-b-30">
            <i className="small material-icons left">place</i>
            <span className="font-18">{propertyEntity.address}</span>
          </div>

          <div>
            {feature}
            <span className="btn btn-small disabled b-r-20">Phòng ngủ: {propertyEntity.bedRoom} </span>
            <span className="btn btn-small disabled b-r-20">Phòng tắm: {propertyEntity.bathRoom} </span>
            <span className="btn btn-small disabled b-r-20">Diện tích: {propertyEntity.area} m2</span>
          </div>
        </div>
        <div className="col s12 m4">
          <div>
            <h4 className="left">{propertyEntity.price}đ</h4>
            <button type="button"
                    className="btn btn-small m-t-25 right disabled b-r-20"> Đang {propertyEntity.purpose}</button>
          </div>
        </div>
      </div>
      <div className="row">

        <div className="col s12 m8">
          <div className="single-description p-15 m-b-15 border2 border-top-0">
            {propertyEntity.description}
          </div>
          <div className="card-no-box-shadow card">
            <div className="p-15 grey lighten-4">
              <h5 className="m-0">Vị trí</h5>
            </div>
            <div className="card-image">
              <div id="map"></div>
            </div>
          </div>
        </div>
        <div className="col s12 m4">
          <div className="clearfix">
            <div>
              <ul className="collection with-header m-t-0">
                <li className="collection-header grey lighten-4">
                  <h5 className="m-0">Liên hệ với nhà môi giới</h5>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <FacebookProvider appId="123456789">
      <Comments href="http://www.facebook.com" />
    </FacebookProvider>
  </section>

)
  ;
};

const mapStateToProps = ({property}: IRootState) => ({
  propertyEntity: property.entity,
});

const mapDispatchToProps = {getEntity};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PropertyDetail);
// {/*<Row>*/}
// {/*  <Col md="8">*/
// }
// {/*    <h2>*/
// }
// {/*      Property [<b>{propertyEntity.id}</b>]*/
// }
// {/*    </h2>*/
// }
// {/*    <dl className="jh-entity-details">*/
// }
// {/*      <dt>*/
// }
// {/*        <span id="title">Title</span>*/
// }
// {/*      </dt>*/
// }
// {/*      <dd>{propertyEntity.title}</dd>*/
// }
// {/*      <dt>*/
// }
// {/*        <span id="price">Price</span>*/
// }
// {/*      </dt>*/
// }
// {/*      <dd>{propertyEntity.price}</dd>*/
// }
// {/*      <dt>*/
// }
// {/*        <span id="featured">Featured</span>*/
// }
// {/*      </dt>*/
// }
// {/*      <dd>{propertyEntity.featured ? 'true' : 'false'}</dd>*/
// }
// {/*      <dt>*/
// }
// {/*        <span id="purpose">Purpose</span>*/
// }
// {/*      </dt>*/
// }
// {/*      <dd>{propertyEntity.purpose}</dd>*/
// }
// {/*      <dt>*/
// }
// {/*        <span id="type">Type</span>*/
// }
// {/*      </dt>*/
// }
// {/*      <dd>{propertyEntity.type}</dd>*/
// }
// {/*      <dt>*/
// }
// {/*        <span id="project">Project</span>*/
// }
// {/*      </dt>*/
// }
// {/*      <dd>{propertyEntity.project}</dd>*/
// }
// {/*      <dt>*/
// }
// {/*        <span id="address">Address</span>*/
// }
// {/*      </dt>*/
// }
// {/*      <dd>{propertyEntity.address}</dd>*/
// }
// {/*      <dt>*/
// }
// {/*        <span id="area">Area</span>*/
// }
// {/*      </dt>*/
// }
// {/*      <dd>{propertyEntity.area}</dd>*/
// }
// {/*      <dt>*/
// }
// {/*        <span id="description">Description</span>*/
// }
// {/*      </dt>*/
// }
// {/*      <dd>{propertyEntity.description}</dd>*/
// }
// {/*      <dt>*/
// }
// {/*        <span id="latitude">Latitude</span>*/
// }
// {/*      </dt>*/
// }
// {/*      <dd>{propertyEntity.latitude}</dd>*/
// }
// {/*      <dt>*/
// }
// {/*        <span id="longitude">Longitude</span>*/
// }
// {/*      </dt>*/
// }
// {/*      <dd>{propertyEntity.longitude}</dd>*/
// }
// {/*      <dt>*/
// }
// {/*        <span id="images">Images</span>*/
// }
// {/*      </dt>*/
// }
// {/*      <dd>{propertyEntity.images}</dd>*/
// }
// {/*      <dt>*/
// }
// {/*        <span id="createBy">Create By</span>*/
// }
// {/*      </dt>*/
// }
// {/*      <dd>{propertyEntity.createBy}</dd>*/
// }
// {/*      <dt>*/
// }
// {/*        <span id="titleImage">Title Image</span>*/
// }
// {/*      </dt>*/
// }
// {/*      <dd>{propertyEntity.titleImage}</dd>*/
// }
// {/*      <dt>*/
// }
// {/*        <span id="bedRoom">Bed Room</span>*/
// }
// {/*      </dt>*/
// }
// {/*      <dd>{propertyEntity.bedRoom}</dd>*/
// }
// {/*      <dt>*/
// }
// {/*        <span id="bathRoom">Bath Room</span>*/
// }
// {/*      </dt>*/
// }
// {/*      <dd>{propertyEntity.bathRoom}</dd>*/
// }
// {/*      <dt>Tag</dt>*/
// }
// {/*      <dd>*/
// }
// {/*        {propertyEntity.tags*/
// }
// {/*          ? propertyEntity.tags.map((val, i) => (*/
// }
// {/*              <span key={val.id}>*/
// }
// {/*                <a>{val.name}</a>*/
// }
// {/*                {propertyEntity.tags && i === propertyEntity.tags.length - 1 ? '' : ', '}*/
// }
// {/*              </span>*/
// }
// {/*            ))*/
// }
// {/*          : null}*/
// }
// {/*      </dd>*/
// }
// {/*      <dt>Category</dt>*/
// }
// {/*      <dd>*/
// }
// {/*        {propertyEntity.categories*/
// }
// {/*          ? propertyEntity.categories.map((val, i) => (*/
// }
// {/*              <span key={val.id}>*/
// }
// {/*                <a>{val.name}</a>*/
// }
// {/*                {propertyEntity.categories && i === propertyEntity.categories.length - 1 ? '' : ', '}*/
// }
// {/*              </span>*/
// }
// {/*            ))*/
// }
// {/*          : null}*/
// }
// {/*      </dd>*/
// }
// {/*    </dl>*/
// }
// {/*    <Button tag={Link} to="/property" replace color="info">*/
// }
// {/*      <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>*/
// }
// {/*    </Button>*/
// }
// {/*    &nbsp;*/
// }
// {/*    <Button tag={Link} to={`/property/${propertyEntity.id}/edit`} replace color="primary">*/
// }
// {/*      <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>*/
// }
// {/*    </Button>*/
// }
// {/*  </Col>*/
// }
// {/*</Row>*/
// }
