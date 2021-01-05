import './home.scss';

import React from 'react';
import {Link} from 'react-router-dom';

import {connect} from 'react-redux';
import {Row, Col, Alert} from 'reactstrap';
import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image';

import {IRootState} from 'app/shared/reducers';

export type IHomeProp = StateProps;
const slideImages = [
  '../../../content/images/slide4.jpg',
  '../../../content/images/slide2.jpg',
  '../../../content/images/slide1.jpg'
];
export const Home = (props: IHomeProp) => {

  //list item


  const {account} = props;
  return (
      <div>
        <div className="slide-container">
          <Slide>
            <div className="each-slide">
              <div style={{'backgroundImage': `url(${slideImages[0]})`, 'height':`500px`, 'backgroundPosition':`center`, 'backgroundRepeat':`no-repeat`, 'backgroundSize':`cover`}}>

              </div>
            </div>
            <div className="each-slide">
              <div style={{'backgroundImage': `url(${slideImages[1]})`, 'height':`500px`, 'backgroundPosition':`center`, 'backgroundRepeat':`no-repeat`, 'backgroundSize':`cover`}}>

              </div>
            </div>
            <div className="each-slide">
              <div style={{'backgroundImage': `url(${slideImages[2]})`, 'height':`500px`, 'backgroundPosition':`center`, 'backgroundRepeat':`no-repeat`, 'backgroundSize':`cover`}}>

              </div>
            </div>
          </Slide>
        </div>
        { /*property section*/ }
        <section className="section">
          <div className="container">
            <div className="row">
              <h4 className="section-heading">Bất động sản nổi bật</h4>
            </div>
            <div className="row">
              <div className="col s12 m4">
                <div className="card">
                  <div className="card-image">
                  </div>
                  <div className="card-content property-content">
                  </div>
                  <div className="card-action property-action">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        { /*news section*/ }
        <section className="section center">
          <div className="row">
            <h4 className="section-heading">Tin tức mới</h4>
          </div>
          <div className="container">
            <div className="row">
              <div className="col s12 m4">
                <div className="card">
                  <div className="card-image">
                  </div>
                  <div className="card-content">
                  </div>
                  <div className="card-action blog-action">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*danh gia khach hang*/}
        <section className="section grey lighten-3 center">
          <div className="container">

            <h4 className="section-heading">Nhận xét của khách hàng</h4>

            <div className="carousel testimonials">

              <div className="carousel-item testimonial-item">
                <div className="card testimonial-card">
                  <span style={{height:20,display:'block'}}></span>
                  <div className="card-image testimonial-image">
                    <img src={require('../../../content/images/slide4.jpg').default}/>
                  </div>
                  <div className="card-content">
                    <span className="card-title">Sơn Tùng MTP</span>
                    <p>
                      Kienland có dịch vụ tốt nhất thế giới
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </section>
      </div>

  );
};

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(Home);
