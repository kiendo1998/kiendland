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
  '../../../content/images/slide1.jpg',
  '../../../content/images/slide2.jpg',
  '../../../content/images/slide4.jpg'
];
export const Home = (props: IHomeProp) => {
  const {account} = props;
  return (
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
  );
};

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(Home);
