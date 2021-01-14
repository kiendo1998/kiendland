import './home.scss';

import React, {useState, useEffect} from 'react';
import {Link, RouteComponentProps} from 'react-router-dom';

import {connect} from 'react-redux';
import {Button, Col, Row, Table} from 'reactstrap';
import 'react-slideshow-image/dist/styles.css'
import {Slide} from 'react-slideshow-image';

import {IRootState} from 'app/shared/reducers';

import {APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT} from 'app/config/constants';
import {ITEMS_PER_PAGE} from 'app/shared/util/pagination.constants';
import {overridePaginationStateWithQueryParams} from 'app/shared/util/entity-utils';
import {ICrudGetAllAction, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount} from 'react-jhipster';
import {getEntities as getProperty} from '../../entities/propertyservice/property/property.reducer';
import {getEntities as getNews} from '../../entities/propertyservice/news/news.reducer';

// import {IProperty} from 'app/shared/model/propertyservice/property.model';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export interface IHomeProp extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {
}

const slideImages = [
  '../../../content/images/slide4.jpg',
  '../../../content/images/slide2.jpg',
  '../../../content/images/slide1.jpg'
];
export const Home = (props: IHomeProp) => {

  //danh gia khach hang
  const settings = {
    centerMode: true,
    centerPadding: '60px',
    slidesToShow: 3,
    focusOnSelect: true,
    className: "center",
    autoplay: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1
        }
      }
    ]
  };
  //list item
  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE), props.location.search)
  );

  const getAllProperties = () => {
    props.getProperty(paginationState.activePage - 1, paginationState.itemsPerPage, `${paginationState.sort},${paginationState.order}`);
  };
  const getAllNews = () => {
    props.getNews(paginationState.activePage - 1, paginationState.itemsPerPage, `${paginationState.sort},${paginationState.order}`);
  };

  const sortProperties = () => {
    getAllProperties();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (props.location.search !== endURL) {
      props.history.push(`${props.location.pathname}${endURL}`);
    }
  };
  const sortNews = () => {
    getAllNews();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (props.location.search !== endURL) {
      props.history.push(`${props.location.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortNews;
    sortProperties();

  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    const page = params.get('page');
    const sort = params.get('sort');
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [props.location.search]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === 'asc' ? 'desc' : 'asc',
      sort: p,
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const {propertyList, newsList, match, loading, loadingNews, totalItems, totalItemsNews} = props;
  return (
    <div>
      <div className="slide-container">
        <Slide>
          <div className="each-slide">
            <div style={{
              'backgroundImage': `url(${slideImages[0]})`,
              'height': `500px`,
              'backgroundPosition': `center`,
              'backgroundRepeat': `no-repeat`,
              'backgroundSize': `cover`
            }}>

            </div>
          </div>
          <div className="each-slide">
            <div style={{
              'backgroundImage': `url(${slideImages[1]})`,
              'height': `500px`,
              'backgroundPosition': `center`,
              'backgroundRepeat': `no-repeat`,
              'backgroundSize': `cover`
            }}>

            </div>
          </div>
          <div className="each-slide">
            <div style={{
              'backgroundImage': `url(${slideImages[2]})`,
              'height': `500px`,
              'backgroundPosition': `center`,
              'backgroundRepeat': `no-repeat`,
              'backgroundSize': `cover`
            }}>

            </div>
          </div>
        </Slide>
      </div>
      { /*property section*/}
      <section className="section">
        <div className="container">
          <div className="row">
            <h4 className="section-heading">Bất động sản nổi bật</h4>
          </div>
          {propertyList && propertyList.length > 0 ? (
            <div className="row">
              {propertyList.map((property, i) => (
                <div key={`entity-${i}`} className="col-sm-4">
                  <div className="card">
                    <div className="card-image">
                      {/*  vung chua image va feature star*/}
                      <span className="card-image-bg"
                            style={{'backgroundImage': `url(${"../../../content/images/"+property.titleImage})`}}></span>
                      <a className="btn-floating halfway-fab waves-effect waves-light indigo" title="Featured"><i
                        className="small material-icons">star</i></a>
                    </div>
                    <div className="card-content property-content">
                      {/*  noi dung property*/}
                      <a href={`${match.url}/${property.id}`}>
                        <span className="card-title tooltipped" data-position="bottom">{property.title.substring(0, 18)}</span>
                      </a>
                      <div className="address">
                        <i className="small material-icons left">location_city</i>
                        <span>{property.project}</span>
                      </div>
                      <div className="address">
                        <i className="small material-icons left">place</i>
                        <span>{property.address}</span>
                      </div>
                      <div className="address">
                        <i className="small material-icons left">check_box</i>
                        <span> {property.purpose}: {property.type}</span>
                      </div>
                      <h5>
                        {property.price}đ
                        <div className="right" id="propertyrating-{{$property->id}}"></div>
                      </h5>
                    </div>
                    <div className="card-action property-action">
                      <span className="btn-flat">
                                    <i className="material-icons">check_box</i>
                                    Phòng ngủ: <strong>3</strong>
                                </span>
                      <span className="btn-flat">
                                    <i className="material-icons">check_box</i>
                                    Phòng tắm: <strong>3</strong>
                                </span>
                      <span className="btn-flat">
                                    <i className="material-icons">check_box</i>
                                    Diện tích: <strong>100</strong> mét vuông
                                </span>
                      <span className="btn-flat">
                                    <i className="material-icons">comment</i>
                                    <strong>5</strong>
                                </span>
                    </div>
                  </div>

                </div>
              ))}

            </div>
          ) : (
            !loading && <div className="alert alert-warning">không có bất động sản nào</div>
          )}
        </div>
      </section>
      { /*news section*/}
      <section className="section center">
        <div className="container">
          <div className="row">
            <h4 className="section-heading">Tin tức mới</h4>
          </div>
          {newsList && newsList.length > 0 ? (
            <div className="row">
              {newsList.map((news, i) => (
                <div key={`entity-${i}`} className="col-sm-4">
                  <div className="card">
                    <div className="card-image">
                                            <span className="card-image-bg"
                                                  style={{'backgroundImage': `url(${"../../../content/images/"+news.titleImage})`}}></span>
                    </div>
                    <div className="card-content">
                      <span className="card-title tooltipped" data-position="bottom" data-tooltip="{{$post->title}}">
                        <a href={`${match.url}/${news.id}`}>
                        {news.title.substring(0, 18)}
                      </a>
                      </span>

                      {news.content.substring(0, 120)}
                    </div>
                    <div className="card-action blog-action">
                      <a href="{{ route('blog.author',$post->user->username) }}" className="btn-flat">
                        <i className="material-icons">person</i>
                        <span>Admin</span>
                      </a>
                      <a href="{{ route('blog.categories',$category->slug) }}" className="btn-flat">
                        <i className="material-icons">folder</i>
                        <span>categories</span>
                      </a>
                      <a href="{{ route('blog.tags',$tag->slug) }}" className="btn-flat">
                        <i className="material-icons">label</i>
                        <span>tags</span>
                      </a>
                      <a href="#" className="btn-flat disabled">
                        <i className="material-icons">watch_later</i>
                        <span>{news.publishDate}</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            !loadingNews && <div className="alert alert-warning">không có tin tức nào</div>
          )}
        </div>
      </section>
      {/*danh gia khach hang*/}
      <section className="section grey lighten-3 center">
        <div className="container">

          <h4 className="section-heading">Nhận xét của khách hàng</h4>

          <div className="carousel-inner testimonials">
            <Slider {...settings}>
              <div>
                <div className="card testimonial-card">
                  <span style={{height: 20, display: 'block'}}></span>
                  <div className="card-image testimonial-image">
                    <img src={require('../../../content/images/jhipster_family_member_0_head-192.png').default}/>
                  </div>
                  <div className="card-content">
                    <span className="card-title">Hoàng Lưu</span>
                    <p>
                      Kienland có dịch vụ tốt nhất thế giới
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="card testimonial-card">
                  <span style={{height: 20, display: 'block'}}></span>
                  <div className="card-image testimonial-image">
                    <img src={require('../../../content/images/phuong.jpg').default}/>
                  </div>
                  <div className="card-content">
                    <span className="card-title">Phương Hoàng</span>
                    <p>
                      Kienland có dịch vụ tốt nhất thế giới
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="card testimonial-card">
                  <span style={{height: 20, display: 'block'}}></span>
                  <div className="card-image testimonial-image">
                    <img src={require('../../../content/images/kien.jpg').default}/>
                  </div>
                  <div className="card-content">
                    <span className="card-title">Nam Trịnh</span>
                    <p>
                      Kienland có dịch vụ tốt nhất thế giới
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="card testimonial-card">
                  <span style={{height: 20, display: 'block'}}></span>
                  <div className="card-image testimonial-image">
                    <img src={require('../../../content/images/hung.jpg').default}/>
                  </div>
                  <div className="card-content">
                    <span className="card-title">Hùng Hoàng Phi</span>
                    <p>
                      Kienland có dịch vụ tốt nhất thế giới
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="card testimonial-card">
                  <span style={{height: 20, display: 'block'}}></span>
                  <div className="card-image testimonial-image">
                    <img src={require('../../../content/images/son.jpg').default}/>
                  </div>
                  <div className="card-content">
                    <span className="card-title">Sơn Mai</span>
                    <p>
                      Kienland có dịch vụ tốt nhất thế giới
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="card testimonial-card">
                  <span style={{height: 20, display: 'block'}}></span>
                  <div className="card-image testimonial-image">
                    <img src={require('../../../content/images/hoang.jpg').default}/>
                  </div>
                  <div className="card-content">
                    <span className="card-title">Sang Phạm</span>
                    <p>
                      Kienland có dịch vụ tốt nhất thế giới
                    </p>
                  </div>
                </div>
              </div>
            </Slider>
          </div>

        </div>

      </section>
    </div>

  );
};

// const mapStateToProps = storeState => ({
//   account: storeState.authentication.account,
//   isAuthenticated: storeState.authentication.isAuthenticated,
// });

// type StateProps = ReturnType<typeof mapStateToProps>;
const mapStateToProps = ({news, property}: IRootState) => ({
  newsList: news.entities,
  loadingNews: news.loading,
  totalItemsNews: news.totalItems,
  propertyList: property.entities,
  loading: property.loading,
  totalItems: property.totalItems,
});

const mapDispatchToProps = {
  getProperty,
  getNews,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
export default connect(mapStateToProps, mapDispatchToProps)(Home);
