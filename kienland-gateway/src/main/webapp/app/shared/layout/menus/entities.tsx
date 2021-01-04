import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown icon="th-list" name="Quản lý" id="entity-menu" style={{ maxHeight: '80vh', overflow: 'auto' }}>
    <MenuItem icon="asterisk" to="/property">
      Quản lý bất động sản
    </MenuItem>
    <MenuItem icon="asterisk" to="/news">
      Quản lý tin tức
    </MenuItem>
    <MenuItem icon="asterisk" to="/rate">
      Quản lý đánh giá
    </MenuItem>
    <MenuItem icon="asterisk" to="/tag">
      Quản lý tag
    </MenuItem>
    <MenuItem icon="asterisk" to="/category">
      Quản lý chủ đề
    </MenuItem>
    <MenuItem icon="asterisk" to="/comment">
      Quản lý bình luận
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
