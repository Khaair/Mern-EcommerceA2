import Layout from "../layouts/index";

import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import { arrayBuffer } from "stream/consumers";
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

  return (
    <Layout>
      <Row>
        <Col span={24}>
          <div className="cart-management-area mt-5">
            <div className="container">
              <div className="row">
                <div className="col-lg-8">
                  {/* <pre>
                      <code>{JSON.stringify(arr, null, 4)}</code>
                    </pre> */}

                  <table id="customers">
                    <thead>
                      <tr>
                        <th scope="col">No</th>
                        <th scope="col">Product</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items?.map((product: any, index: any) => {
                        return (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{product?.title}</td>
                            <td>{product?.price}</td>
                            <td>1</td>
                            <td>{product?.price}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="col-lg-4">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Cart Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">Sub Total</th>
                        <td>{total}</td>
                      </tr>
                      <tr>
                        <th scope="row">Total</th>
                        <td>{total}</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="text-right">
                    <Link href="/billing-address">
                      <button className="btn btn-success">
                        Proceed to Checkout
                      </button>
                    </Link>
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
