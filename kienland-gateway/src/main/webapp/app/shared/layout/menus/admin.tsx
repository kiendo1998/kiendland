import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

const adminMenuItems = (
  <>
    <MenuItem icon="road" to="/admin/gateway">
      Quản lý Service
    </MenuItem>
    <MenuItem icon="user" to="/admin/user-management">
      Quản lý tài khoản
    </MenuItem>
    <MenuItem icon="tachometer-alt" to="/admin/metrics">
      Số liệu
    </MenuItem>
    <MenuItem icon="heart" to="/admin/health">
      Sức Khỏe
    </MenuItem>
    <MenuItem icon="list" to="/admin/configuration">
      Cấu hình
    </MenuItem>
    <MenuItem icon="bell" to="/admin/audits">
      Lịch sử truy cập
    </MenuItem>
    {/* jhipster-needle-add-element-to-admin-menu - JHipster will add entities to the admin menu here */}
    <MenuItem icon="tasks" to="/admin/logs">
      Logs
    </MenuItem>
  </>
);

const swaggerItem = (
  <MenuItem icon="book" to="/admin/docs">
    API
  </MenuItem>
);

export const AdminMenu = ({ showSwagger }) => (
  <NavDropdown icon="user-plus" name="Quản lý hệ thống" style={{ width: '140%' }} id="admin-menu">
    {adminMenuItems}
    {showSwagger && swaggerItem}
  </NavDropdown>
);

export default AdminMenu;
