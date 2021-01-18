import './about-us.scss';

import React from 'react';
import {Translate} from 'react-jhipster';
import {connect} from 'react-redux';
import {Row, Col, Alert, Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import { AvForm, AvGroup, AvInput, AvField, AvFeedback } from 'availity-reactstrap-validation';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
export type IAboutUsProp = StateProps;

export const AboutUs = (props: IAboutUsProp) => {
  const {account} = props;

  return (
    <div>
      <Row>
        <Col md="9">
          <h2>Chào mừng đến với KienLand</h2>
          <p className="lead">Website mua bán bất động sản lớn nhất Việt Nam</p>
          {account && account.login ? (
            <div>
              <Alert color="success">Chào mừng bạn {account.login}.</Alert>
            </div>
          ) : (
            <div>
              <Alert color="warning">
                Để sử dụng các dịch vụ của KienLand, Hãy
                <Link to="/login" className="alert-link">
                  {' '}
                  Đăng nhập
                </Link>
              </Alert>

              <Alert color="warning">
                Bạn chưa có tài khoản?&nbsp;
                <Link to="/account/register" className="alert-link">
                  Đăng ký tài khoản mới
                </Link>
              </Alert>
            </div>
          )}
          <p>Đăng ký nhận tin mới qua email: </p>
            <AvForm>
              <AvGroup>
                <AvField
                  name="email"
                  placeholder={'Nhập email của bạn'}
                  type="email"
                  validate={{
                    email: {
                      errorMessage: 'Your email is invalid.',
                    },
                    minLength: {
                      value: 5,
                      errorMessage: 'Your email is required to be at least 5 characters.',
                    },
                    maxLength: {
                      value: 254,
                      errorMessage: 'Your email cannot be longer than 50 characters.',
                    },
                  }}
                />
              </AvGroup>
              <Button color="primary" type="submit" >
                <FontAwesomeIcon icon="paper-plane" />
                &nbsp; Gửi
              </Button>
            </AvForm>
          <p>Mọi thắc mắc, xin vui lòng liên hệ: </p>

          <ul>
            <li>
              <a href="#" target="_blank" rel="noopener noreferrer">
                SĐT: 0986579099
              </a>
            </li>
            <li>
              <a href="#" target="_blank" rel="noopener noreferrer">
                Email: kienphule@gmail.com
              </a>
            </li>
            <li>
              <a href="#" target="_blank" rel="noopener noreferrer">
                Địa chỉ: Cần kiệm - Thạch Thất - Hà Nội
              </a>
            </li>
            <li>
              <a href="https://facebook.com/kiendo1998" target="_blank" rel="noopener noreferrer">
                Liên hệ với KienLand trên FaceBook
              </a>
            </li>
          </ul>
        </Col>
        <Col md="3" className="pad">
          <span className="hipster rounded"/>
        </Col>
      </Row>
    </div>
  )
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(AboutUs);
