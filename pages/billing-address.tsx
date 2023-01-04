import React from "react";
import Layout from "../layouts/index";

export default function BillingAddress() {
  return (
    <Layout>
      <div className="billing-address-area mt-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div>
                <form action="/action_page.php">
                  <label htmlFor="fname">Name</label>
                  <input
                    type="text"
                    id="fname"
                    name="firstname"
                    placeholder="Your name.."
                  />
                  <label htmlFor="lname">Phone Number</label>
                  <input
                    type="text"
                    id="lname"
                    name="lastname"
                    placeholder="Your last name.."
                  />
                  <label htmlFor="lname">Email</label>
                  <input
                    type="text"
                    id="lname"
                    name="lastname"
                    placeholder="Your last name.."
                  />

                  <label htmlFor="country">Country</label>
                  <select id="country" name="country">
                    <option value="australia">Australia</option>
                    <option value="canada">Canada</option>
                    <option value="usa">USA</option>
                  </select>

                  <label htmlFor="lname">Address</label>
                  <input
                    type="text"
                    id="lname"
                    name="lastname"
                    placeholder="Your last name.."
                  />
                  <input type="submit" defaultValue="Submit" />
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
                <tr>
                  <td>p1</td>
                  <td>33</td>
                </tr>

                <tr>
                  <td>p2</td>
                  <td>44</td>
                </tr>
                <tr>
                  <td>Sub total</td>
                  <td>44</td>
                </tr>

                <tr>
                  <td>Total</td>
                  <td>44</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
