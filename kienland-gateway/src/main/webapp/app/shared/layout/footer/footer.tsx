import React from "react";
import "./Footer.scss";
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
            <h5 className="white-text uppercase">Bất động sản gần đây</h5>
            <ul className="collection border0">
            </ul>
          </div>
          <div className="col m2 s12">
            <h5 className="white-text uppercase">Menu</h5>
            <ul>
              <li className="uppercase {{ Request::is('batdongsan*') ? 'underline' : '' }}">
                <a href="{{ route('batdongsan') }}" className="grey-text text-lighten-3">Trang chủ</a>
              </li>

              <li className="uppercase {{ Request::is('nhamoigioi*') ? 'underline' : '' }}">
                <a href="{{ route('nhamoigioi') }}" className="grey-text text-lighten-3">Bất động sản</a>
              </li>

              <li className="uppercase {{ Request::is('bosuutap*') ? 'underline' : '' }}">
                <a href="{{ route('bosuutap') }}" className="grey-text text-lighten-3">Tin tức</a>
              </li>

              <li className="uppercase {{ Request::is('tintuc*') ? 'underline' : '' }}">
                <a href="{{ route('tintuc') }}" className="grey-text text-lighten-3">Liên hệ</a>
              </li>

              <li className="uppercase {{ Request::is('lienhe') ? 'underline' : '' }}">
                <a href="{{ route('lienhe') }}" className="grey-text text-lighten-3">Tài khoản</a>
              </li>
            </ul>
          </div>
          <div className="col m2 s12">
            <h5 className="white-text uppercase">Thông tin liên hệ</h5>
            <ul>
              <li className="uppercase {{ Request::is('batdongsan*') ? 'underline' : '' }}">
                <a href="{{ route('batdongsan') }}" className="grey-text text-lighten-3">Địa chỉ: Thạch Thất - Hà Nội</a>
              </li>

              <li className="uppercase {{ Request::is('nhamoigioi*') ? 'underline' : '' }}">
                <a href="{{ route('nhamoigioi') }}" className="grey-text text-lighten-3">SĐT: 0986579099</a>
              </li>

              <li className="uppercase {{ Request::is('bosuutap*') ? 'underline' : '' }}">
                <a href="{{ route('bosuutap') }}" className="grey-text text-lighten-3">Email: kiendo@kienland.com.vn</a>
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
