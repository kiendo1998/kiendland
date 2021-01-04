import React from 'react';

import { NavItem, NavLink, NavbarBrand } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import appConfig from 'app/config/constants';

export const BrandIcon = props => (
  <div {...props} className="brand-icon">
    <img src="content/images/logo1.png" alt="Logo" />
  </div>
);

export const Brand = props => (
  <NavbarBrand tag={Link} to="/" className="brand-logo">
    <BrandIcon />
    <span className="brand-title">Kienland</span>
    {/* <span className="navbar-version">{appConfig.VERSION}</span> */}
  </NavbarBrand>
);


export const Home = props => (
    <div>
      <NavItem>
        <NavLink tag={Link} to="/" className="d-flex align-items-center">
          <FontAwesomeIcon icon="home" />
          <span>Trang chủ</span>
        </NavLink>
      </NavItem>
    </div>

);
export const AboutUs = props => (
  <NavItem>
    <NavLink tag={Link} to="/about-us" className="d-flex align-items-center">
      <FontAwesomeIcon icon="address-card" />
      <span>
        Liên hệ
      </span>
    </NavLink>
  </NavItem>
);
