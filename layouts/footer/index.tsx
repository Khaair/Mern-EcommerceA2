import React from "react";
const Footer = () => {
  return (
    <>
      <div className="footer-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="footer-item-wrapper">
                <ul>
                  <li>
                    <h4>Quick Links</h4>
                  </li>
                  <li>Home</li>
                  <li>About</li>
                  <li>My Account</li>
                  <li>Shop</li>
                  <li>Cartssss</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="footer-item-wrapper">
                <ul>
                  <li>
                    <h4>For Her</h4>
                  </li>
                  <li>Women Jeans</li>
                  <li>Tops and Shirts</li>
                  <li>Women Jackets</li>
                  <li>Heels and Flats</li>
                  <li>Women Accessories</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="footer-item-wrapper">
                <ul>
                  <li>
                    <h4>For Him</h4>
                  </li>
                  <li>Men Jeans</li>
                  <li>Men Shirts</li>
                  <li>Men Jackets</li>
                  <li>Men Flats</li>
                  <li>Men Accessories</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="footer-item-wrapper">
                <ul>
                  <li>
                    <h4>E Commerce BD</h4>
                  </li>
                  <li>
                    <img
                      src="https://skyblue.com.bd/wp-content/uploads/2019/12/Sky-Blue-on-facebook.jpg"
                      alt="find us facebook"
                    />
                  </li>
                  <li>
                    <img
                      src="https://skyblue.com.bd/wp-content/uploads/2019/12/Instragram.jpg"
                      alt="find us facebook"
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="footer-bottom-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="footer-bottom-item-wrapper">
                <div>
                  <p>Copyright © 2022 E-Commerce BD</p>
                </div>
                <div>
                  <p>Powered by E-Commerce BD</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Footer;
