import React from "react";
import "./Footer.scss";
import MenuItem from "app/shared/layout/menus/menu-item";

function Footer() {
  return (
    <div className="main-footer">
      <div className="container">
        <div className="row">
          {/* Column1 */}
          <div className="col">
            <h2>Kienland - website bất động sản lớn nhất Việt Nam</h2>
            <h4 className="list-unstyled">
              <li>Cần Kiệm - Thạch Thất - Hà Nội</li>
              <li>SĐT: 0986579099</li>
              <li>Email: kienphule@gmail.com</li>
            </h4>
          </div>
          {/* Column2 */}
          <div className="col">
            <h4>Bất động sản</h4>
            <ul className="list-unstyled">
              <li>Bán</li>
              <li>Cho thuê</li>
              <li>Dự án</li>
            </ul>
          </div>
          {/* Column3 */}
          <div className="col">
            <h4>Bất động sản gần đây</h4>
            <ul className="list-unstyled">
              <li>Bất động sản 1</li>
              <li>Bất động sản 2</li>
              <li>Bất động sản 3</li>
            </ul>
          </div>
          {/* Column3 */}
          <div className="col">
            <h4>Mạng xã hội</h4>
            <ul className="list-unstyled">
              <li>Facebook</li>
              <li>Youtube</li>
              <li>Zalo</li>
            </ul>
          </div>
        </div>
        <hr/>
        <div className="row">
          <p className="col-sm">
            &copy;{new Date().getFullYear()} Kienland | All rights reserved |
            Terms Of Service | Privacy
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
