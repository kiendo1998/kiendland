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
export const Property = props => (
  <NavItem>
    <NavLink tag={Link} to="/show/property" className="d-flex align-items-center">
      <FontAwesomeIcon icon="building" />
      <span>
        Bất động sản
      </span>
    </NavLink>
  </NavItem>
);
export const News = props => (
  <NavItem>
    <NavLink tag={Link} to="/show/news" className="d-flex align-items-center">
      <FontAwesomeIcon icon="newspaper" />
      <span>
        Tin tức
      </span>
    </NavLink>
  </NavItem>
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
