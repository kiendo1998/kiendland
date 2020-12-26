import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Row, Col, Button } from 'reactstrap';

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import PasswordStrengthBar from 'app/shared/layout/password/password-strength-bar';
import { savePassword, reset } from './password.reducer';

export interface IUserPasswordProps extends StateProps, DispatchProps {}

export const PasswordPage = (props: IUserPasswordProps) => {
  const [password, setPassword] = useState('');

  useEffect(() => {
    props.reset();
    props.getSession();
    return () => {
      props.reset();
    };
  }, []);

  const handleValidSubmit = (event, values) => {
    props.savePassword(values.currentPassword, values.newPassword);
  };

  const updatePassword = event => setPassword(event.target.value);

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="password-title">Đổi mật khẩu cho {props.account.login}</h2>
          <AvForm id="password-form" onValidSubmit={handleValidSubmit}>
            <AvField
              name="currentPassword"
              label="Mật khẩu hiện tại"
              placeholder={'Mật khẩu'}
              type="password"
              validate={{
                required: { value: true, errorMessage: 'Password là trường bắt buộc.' },
              }}
            />
            <AvField
              name="newPassword"
              label="Mật khẩu mới"
              placeholder={'Mật khẩu mới'}
              type="password"
              validate={{
                required: { value: true, errorMessage: 'Password là trường bắt buộc.' },
                minLength: { value: 4, errorMessage: 'password phải có ít nhất 4 kí tự' },
                maxLength: { value: 50, errorMessage: 'password không được lớn hơn 50 kí tự' },
              }}
              onChange={updatePassword}
            />
            <PasswordStrengthBar password={password} />
            <AvField
              name="confirmPassword"
              label="Xác nhận mật khảu mới"
              placeholder="Xác nhận mạt khẩu mới"
              type="password"
              validate={{
                required: {
                  value: true,
                  errorMessage: 'Xác nhận mật khẩu là bắt buộc.',
                },
                minLength: {
                  value: 4,
                  errorMessage: 'Password phải có ít nhất 4 kí tự.',
                },
                maxLength: {
                  value: 50,
                  errorMessage: 'Password không được lớn hơn 50 kí tự',
                },
                match: {
                  value: 'newPassword',
                  errorMessage: 'Mật khẩu không khớp!',
                },
              }}
            />
            <Button color="success" type="submit">
              Lưu
            </Button>
          </AvForm>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = ({ authentication }: IRootState) => ({
  account: authentication.account,
  isAuthenticated: authentication.isAuthenticated,
});

const mapDispatchToProps = { getSession, savePassword, reset };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PasswordPage);
