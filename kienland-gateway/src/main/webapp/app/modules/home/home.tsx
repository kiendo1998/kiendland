import './home.scss';

import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';

import { IRootState } from 'app/shared/reducers';

export type IHomeProp = StateProps;

export const Home = (props: IHomeProp) => {
  const { account } = props;

  return (
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
        <span className="hipster rounded" />
      </Col>
    </Row>
  );
};

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(Home);
