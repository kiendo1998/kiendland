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
            <h4>Kienland - Website bất động sản lớn nhất Việt Nam</h4>
            <h1 className="list-unstyled">
              <li>0986579099</li>
              <li>Thạch Thất - Hà Nội</li>
              <li>Cần Kiệm</li>
            </h1>
          </div>
          {/* Column2 */}
          <div className="col">
            <h4>Stuff</h4>

          </div>
          {/* Column3 */}
          <div className="col">
            <h4>WELL ANOTHER COLUMN</h4>

          </div>
        </div>
        <hr />
        <div className="row">
          <p className="col-sm">
            &copy;{new Date().getFullYear()} THICC MEMES | All rights reserved |
            Terms Of Service | Privacy
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
