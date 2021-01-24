import React from "react";
import "./Footer.scss";
import GoogleMapReact from 'google-map-react';
import MenuItem from "app/shared/layout/menus/menu-item";

function Footer() {
  return (
    <footer className="page-footer indigo darken-2">
      <div className="container">
        <div className="row">
          <div className="col m4 s12">
            <h5 className="white-text uppercase">Giới thiệu</h5>
            <p className="grey-text text-lighten-4">Kienland là website mua bán bất động sản lớn nhất việt nam</p>
          </div>
          {/*bat dong san gan day*/}
          <div className="col m6 s12">
            <h5 className="white-text uppercase">Bản đồ</h5>
            <ul className="collection border0" style={{ height: '30vh', width: '100%' }}>
              <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyBRLaJEjRudGCuEi1_pqC4n3hpVHIyJJZA" }}
                defaultCenter={{lat: 21.015998, lng: 105.579208}}
                defaultZoom={11}
              >
              </GoogleMapReact>
            </ul>
          </div>
          <div className="col m2 s12">
            <h5 className="white-text uppercase">Menu</h5>
            <ul>
              <li className="uppercase {{ Request::is('batdongsan*') ? 'underline' : '' }}">
                <a href={`http://localhost:8080`} className="grey-text text-lighten-3">Trang chủ</a>
              </li>

              <li className="uppercase {{ Request::is('nhamoigioi*') ? 'underline' : '' }}">
                <a href={`http://localhost:8080/show/property`} className="grey-text text-lighten-3">Bất động sản</a>
              </li>

              <li className="uppercase {{ Request::is('bosuutap*') ? 'underline' : '' }}">
                <a href={`http://localhost:8080/show/news`} className="grey-text text-lighten-3">Tin tức</a>
              </li>

              <li className="uppercase {{ Request::is('tintuc*') ? 'underline' : '' }}">
                <a href={`http://localhost:8080/about-us`} className="grey-text text-lighten-3">Liên hệ</a>
              </li>
            </ul>
          </div>
          <div className="col m2 s12">
            <h5 className="white-text uppercase">Thông tin liên hệ</h5>
            <ul>
              <li className="uppercase {{ Request::is('batdongsan*') ? 'underline' : '' }}">
                <a href={`http://localhost:8080/about-us`} className="grey-text text-lighten-3">Địa chỉ: Thạch Thất - Hà Nội</a>
              </li>

              <li className="uppercase {{ Request::is('nhamoigioi*') ? 'underline' : '' }}">
                <a href={`http://localhost:8080/about-us`} className="grey-text text-lighten-3">SĐT: 0986579099</a>
              </li>

              <li className="uppercase {{ Request::is('bosuutap*') ? 'underline' : '' }}">
                <a href={`http://localhost:8080/about-us`} className="grey-text text-lighten-3">Email: kiendo@kienland.com.vn</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">
          © Bản quyền thuộc về Kienland
          <a className="grey-text text-lighten-4 right" href="{{ $footersettings[0]['facebook'] }}"
             target="_blank">FACEBOOK</a>
          <a className="grey-text text-lighten-4 right m-r-10" href="{{ $footersettings[0]['twitter'] }}"
             target="_blank">TWITTER</a>
          <a className="grey-text text-lighten-4 right m-r-10" href="{{ $footersettings[0]['linkedin'] }}"
             target="_blank">LINKEDIN</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
