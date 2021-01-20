import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown icon="th-list" name="Quản lý" id="entity-menu" style={{ maxHeight: '80vh', overflow: 'auto' }}>
    <MenuItem icon="building" to="/property">
      Quản lý bất động sản
    </MenuItem>
    <MenuItem icon="newspaper" to="/news">
      Quản lý tin tức
    </MenuItem>
    <MenuItem icon="star" to="/rate">
      Quản lý đánh giá
    </MenuItem>
    <MenuItem icon="tags" to="/tag">
      Quản lý tag
    </MenuItem>
    <MenuItem icon="list-alt" to="/category">
      Quản lý chủ đề
    </MenuItem>
    <MenuItem icon="credit-card" to="/paypal-completed-payments">
      Quản lý thanh toán
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
