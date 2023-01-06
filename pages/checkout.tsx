import axios from "axios";
import { useState, useEffect } from "react";
import Layout from "../layouts";

export default function checkout() {
  const [data, setData] = useState([]);

  console.log(data, "data checkout");

  const fetchdata = async () => {
    try {
      const datahere = await axios.get(
        "http://localhost:8080/api/billing-address-show"
      );
      setData(datahere.data);
    } catch (err) {
      console.log(err, "error");
    }
  };
  useEffect(() => {
    fetchdata();
  }, []);
  return (
    <Layout>
      <div className="checkout-ara">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="checkout-title text-center">
                <h2>Check Out</h2>
              </div>
            </div>
          </div>

          <div className="row">
            <p className="mb-5">Thank you. Your order has been received.</p>

            <div className="col-lg-3">
              <p>ORDER NUMBER: </p>
              <p>1548</p>
            </div>
            <div className="col-lg-3">
              <p> DATE:</p>
              <p>January 6, 2023</p>
            </div>
            <div className="col-lg-3">
              <p>TOTAL:</p>
              <p>৳ 210.00</p>
            </div>
            <div className="col-lg-3">
              <p>PAYMENT METHOD:</p>
              <p>Cash on delivery</p>
            </div>
            <p className="mt-5 mb-5">Pay with cash upon delivery.</p>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <table id="customers">
                <tr>
                  <th>Product</th>
                  <th>Total</th>
                </tr>
                {/* {items?.map((product: any, index: any) => {
                  return (
                    <tr key={index}>
                      <td>{product?.title}</td>
                      <td>{product?.price}</td>
                    </tr>
                  );
                })} */}

                <tr>
                  <td>Sub total</td>
                  <td>Sub total</td>
                </tr>

                <tr>
                  <td>Total</td>
                  <td>Total</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
