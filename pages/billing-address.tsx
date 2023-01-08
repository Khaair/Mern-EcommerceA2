import { notification } from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Layout from "../layouts/index";

export default function BillingAddress() {
  const [items, setItems] = useState([]);
  const [fullname, setFullname] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notificationMsg, setNotificationMsg] = useState("");
  const [errormsg, setErrormsg] = useState("");
  const [orderNumber, setOrderNumber] = useState<any>();
  console.log(orderNumber, "orderNumber");

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
  const router = useRouter();

  const openNotification = () => {
    notification.open({
      message: notificationMsg,
    });
  };
  useEffect(() => {
    const GenerateOrderNumber = Math.floor(Math.random() * 100000) + 1;
    setOrderNumber(GenerateOrderNumber);
  }, []);

  const currentTime = new Date();

  const sendDatatoApp = async () => {
    if (fullname && address && city && postcode && email && phone) {
      localStorage.setItem("orderNumber", JSON.stringify(orderNumber));
      try {
        let x = await axios.post(
          "http://localhost:8080/api/billing-address-add",
          {
            fullname,
            address,
            city,
            postcode,
            email,
            phone,
            subtotal: total,
            total: total,
            cart: items,
            ordernumber: orderNumber,
            date: currentTime,
          }
        );

        if (x.status === 200) {
          openNotification();
          setErrormsg("");

          setNotificationMsg(x?.data?.message);
          router.push("/checkout");
        }

        console.log(x.status, "success");
      } catch (er) {
        if (er) {
          openNotification();
          setNotificationMsg("Please provide correct information");
        }
      }
    } else {
      setErrormsg("All fields are requerd");
    }
  };

  return (
    <Layout>
      <div className="billing-address-area mt-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 billing-details-bg">
              <div>
                <h3>Billing details</h3>
                <form action="">
                  <div className="form-group">
                    <label htmlFor="">Full Name </label>
                    <input
                      className="form-control"
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value)}
                      style={{ marginTop: "12px" }}
                      placeholder="Enter full name"
                      required
                    />
                  </div>
                  <div className="form-group add-product-margin">
                    <label htmlFor="">Address</label>
                    <input
                      className="form-control"
                      value={address}
                      style={{ marginTop: "12px" }}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter address"
                      required
                    />
                  </div>
                  <div className="form-group add-product-margin">
                    <label htmlFor="">City </label>
                    <input
                      className="form-control"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      style={{ marginTop: "12px" }}
                      placeholder="Enter town"
                      required
                    />
                  </div>
                  <div className="form-group add-product-margin">
                    <label htmlFor="">Postcode</label>
                    <input
                      className="form-control"
                      value={postcode}
                      onChange={(e) => setPostcode(e.target.value)}
                      style={{ marginTop: "12px" }}
                      placeholder="Enter postcode"
                      required
                    />
                  </div>
                  <div className="form-group add-product-margin">
                    <label htmlFor="">Email Address </label>
                    <input
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{ marginTop: "12px" }}
                      placeholder="Enter email address"
                      required
                    />
                  </div>
                  <div className="form-group add-product-margin">
                    <label htmlFor="">Phone</label>
                    <input
                      className="form-control"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      style={{ marginTop: "12px" }}
                      placeholder="Enter phone number"
                      required
                    />
                  </div>
                  <h4 className="text-danger">{errormsg}</h4>

                  <div className="save-btn-area">
                    <button
                      className="btn btn-success mt-3"
                      type="button"
                      onClick={sendDatatoApp}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-6">
              <h3 className="billing-details-bg">Your order</h3>
              <table className="billing-details-bg" id="cart">
                <tr>
                  <th>Product</th>
                  <th>Total</th>
                </tr>
                {items?.map((product: any, index: any) => {
                  return (
                    <tr key={index}>
                      <td>{product?.title}</td>
                      <td>{product?.price}</td>
                    </tr>
                  );
                })}

                <tr>
                  <td>Sub total</td>
                  <td>{total}</td>
                </tr>

                <tr>
                  <td>Total</td>
                  <td>{total}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
