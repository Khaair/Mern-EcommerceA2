import Layout from "../layouts/index";
import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import Link from "next/link";

export default function EcommerceHomePage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Get the existing cart from local storage
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (cart) {
      setItems(cart);
    }
  }, []);

  function calculateTotal(items: any) {
    let total = 0;

    for (const item of items) {
      total += item.price;
    }

    return total;
  }

  const total = calculateTotal(items);

  function deleteFromCart(productId: any) {
    // Get the current cart from local storage
    const cart = JSON.parse(localStorage.getItem("cart"));

    // Remove the item with the specified productId from the cart
    const updatedCart = cart.filter(
      (item: { productId: any }) => item.productId !== productId
    );

    // Update the cart in local storage
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setItems(updatedCart);
  }

  return (
    <Layout>
      <Row>
        <Col span={24}>
          <div className="cart-management-main-area">
            <div className="cart-title-area pt-5 pb-5">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12 text-center">
                    <h2>Cart</h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="cart-management-area">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <table id="cart">
                      <thead>
                        <tr>
                          <th scope="col"></th>
                          <th scope="col">Product</th>
                          <th scope="col">Price</th>
                          <th scope="col">Quantity</th>
                          <th scope="col">Total</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {items?.map((product: any, index: any) => {
                          return (
                            <tr key={index}>
                              <td className="text-center" scope="row">
                                <img
                                  className="cart-product-img"
                                  src={product?.url}
                                  alt="product image"
                                />
                              </td>
                              <td>{product?.title}</td>
                              <td>{product?.price}</td>
                              <td>
                                <input
                                  className="cart-number-input"
                                  type="number"
                                  defaultValue={1}
                                />
                              </td>
                              <td>{product?.price}</td>
                              <td scope="row">
                                <i
                                  onClick={() =>
                                    deleteFromCart(product?.productId)
                                  }
                                  className="text-danger fa-thin fa-circle-xmark"
                                  role="button"
                                ></i>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="total-calculation-area mt-5 pb-5">
              <div className="container">
                <div className="row">
                  <div className="col-lg-7"></div>
                  <div className="col-lg-5">
                    <table id="cart">
                      <thead>
                        <tr>
                          <th scope="col">
                            <h5>Cart Total</h5>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <div className="total-table-body">
                          <div className="total-table-content-wrapper">
                            <h6>Subtotal</h6>
                            <h6>৳ {total}</h6>
                          </div>

                          <hr />
                          <p>Cash on delivery</p>
                          <p className="mt-2">
                            Your personal data will be used to process your
                            order, support your experience throughout this
                            website, and for other purposes described in our
                            privacy policy.
                          </p>

                          <hr />
                          <div className="total-table-content-wrapper">
                            <h6>Total &nbsp; &nbsp; &nbsp;</h6>
                            <h6>৳ {total}</h6>
                          </div>

                          <hr />

                          <div className="mt-3">
                            <Link href="billing-address">
                              <button className="proceed-to-checkout-btn">
                                Proceed to Checkout
                              </button>
                            </Link>
                          </div>
                        </div>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Layout>
  );
}
