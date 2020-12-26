import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Row, Col, Alert, Button } from 'reactstrap';

import PasswordStrengthBar from 'app/shared/layout/password/password-strength-bar';
import { IRootState } from 'app/shared/reducers';
import { handleRegister, reset } from './register.reducer';

export type IRegisterProps = DispatchProps;

export const RegisterPage = (props: IRegisterProps) => {
  const [password, setPassword] = useState('');

  useEffect(
    () => () => {
      props.reset();
    },
    []
  );

  const handleValidSubmit = (event, values) => {
    props.handleRegister(values.username, values.email, values.firstPassword);
    event.preventDefault();
  };

  const updatePassword = event => setPassword(event.target.value);

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h1 id="register-title">Đăng ký tài khoản</h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          <AvForm id="register-form" onValidSubmit={handleValidSubmit}>
            <AvField
              name="username"
              label="Username"
              placeholder={'VD: kiendo1998'}
              validate={{
                required: { value: true, errorMessage: 'username là trường bắt buộc.' },
                pattern: {
                  value: '^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$',
                  errorMessage: 'username không hợp lệ.',
                },
                minLength: { value: 1, errorMessage: 'username phải có ít nhất 1 ký tự.' },
                maxLength: { value: 50, errorMessage: 'username không thể có nhiều hơn 50 kí tự.' },
              }}
            />
            <AvField
              name="email"
              label="Email"
              placeholder={'VD: kienphule@gmail.com'}
              type="email"
              validate={{
                required: { value: true, errorMessage: 'Email là trường bắt buộc' },
                minLength: { value: 5, errorMessage: 'Email phải bao gồm ít nhất 5 kí tự' },
                maxLength: { value: 254, errorMessage: 'Email không thể dài hơn 50 kí tự.' },
              }}
            />
            <AvField
              name="firstPassword"
              label="Mật khẩu mới"
              placeholder={'mật khẩu'}
              type="password"
              onChange={updatePassword}
              validate={{
                required: { value: true, errorMessage: 'Password là trường bắt buộc.' },
                minLength: { value: 4, errorMessage: 'password phải có ít nhất 4 kí tự' },
                maxLength: { value: 50, errorMessage: 'password không được lớn hơn 50 kí tự' },
              }}
            />
            <PasswordStrengthBar password={password} />
            <AvField
              name="secondPassword"
              label="Xác nhận mật khẩu mới"
              placeholder="mật khẩu"
              type="password"
              validate={{
                required: { value: true, errorMessage: 'Xác nhận mật khẩu là bắt buộc' },
                minLength: { value: 4, errorMessage: 'password phải có ít nhất 4 kí tự.' },
                maxLength: { value: 50, errorMessage: 'password không được lớn hơn 50 kí tự\'' },
                match: { value: 'firstPassword', errorMessage: 'Mật khẩu không khớp!' },
              }}
            />
            <Button id="register-submit" color="primary" type="submit">
              Register
            </Button>
          </AvForm>
          <p>&nbsp;</p>
          <Alert color="warning">
              <span>Nếu bạn đã có tài khoản, hãy</span>
            <a className="alert-link"> đăng nhập</a>
          </Alert>
        </Col>
      </Row>
    </div>
  );
};

const mapDispatchToProps = { handleRegister, reset };
type DispatchProps = typeof mapDispatchToProps;

export default connect(null, mapDispatchToProps)(RegisterPage);
