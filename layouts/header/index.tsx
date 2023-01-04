import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCartOutlined } from "@ant-design/icons";

export default function Header() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    // Get the existing cart from local storage
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (cart) {
      setItems(cart);
    }
  }, []);
  return (
    <>
      <div className="menubar-area  bg-white  sticky-top navbar-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="menubar-logo">
                <Link href="/">
                  <img
                    src="data:image/png;base64,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"
                    alt="logo"
                  />
                </Link>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="menubar-content">
                <ul>
                  <Link href="/">
                    <li>Home</li>
                  </Link>
                  <li>About Us</li>

                  <li>International</li>

                  <Link href="/profile">
                    <li role="button">Profile</li>
                  </Link>
                  <Link href="/admin">
                    <li>Admin</li>
                  </Link>
                  <Link href="/cart-management">
                    <li>
                      <div className="cart-icon-wrapper">
                        <div>
                          {" "}
                          <ShoppingCartOutlined />
                        </div>
                        <div>
                          <p>{items.length}</p>
                        </div>
                      </div>
                    </li>
                  </Link>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
