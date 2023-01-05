import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "../layouts/index";

export default function BillingAddress() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<any>();
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [url, setUrl] = useState("");
  const [notificationMsg, setNotificationMsg] = useState("");

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

  const openNotification = () => {
    notification.open({
      message: notificationMsg,
    });
  };

  const sendDatatoApp = async () => {
    try {
      let x = await axios.post("http://localhost:8080/api/product-add", {
        title,
        description,
        price,
        category,
        quantity,
        url,
      });

      if (x.status === 200) {
        openNotification();
        setNotificationMsg(x?.data?.message);
      }

      console.log(x.status, "success");
    } catch (er) {
      if (er) {
        openNotification();

        setNotificationMsg("Please provide correct information");
      }
    }
  };
  return (
    <Layout>
      <div className="billing-address-area mt-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div>
                <h3>Billing Details</h3>
                <form action="">
                  <div className="form-group">
                    <label htmlFor="">Full Name </label>
                    <input
                      className="form-control"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      style={{ marginTop: "12px" }}
                      placeholder="Enter full name"
                      required
                    />
                  </div>
                  <div className="form-group add-product-margin">
                    <label htmlFor="">Address</label>
                    <input
                      className="form-control"
                      value={description}
                      style={{ marginTop: "12px" }}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Enter address"
                      required
                    />
                  </div>
                  <div className="form-group add-product-margin">
                    <label htmlFor="">City </label>
                    <input
                      className="form-control"
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      style={{ marginTop: "12px" }}
                      placeholder="Enter town"
                      required
                    />
                  </div>
                  <div className="form-group add-product-margin">
                    <label htmlFor="">Postcode</label>
                    <input
                      className="form-control"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      style={{ marginTop: "12px" }}
                      placeholder="Enter postcode"
                      required
                    />
                  </div>
                  <div className="form-group add-product-margin">
                    <label htmlFor="">Email Address </label>
                    <input
                      className="form-control"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      style={{ marginTop: "12px" }}
                      placeholder="Enter email address"
                      required
                    />
                  </div>
                  <div className="form-group add-product-margin">
                    <label htmlFor="">Phone</label>
                    <input
                      className="form-control"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      style={{ marginTop: "12px" }}
                      placeholder="Enter phone number"
                      required
                    />
                  </div>
                  <div className="save-btn-area">
                    <button
                      className="btn btn-primary mt-3"
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
              <h3>Your order</h3>
              <table id="customers">
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
