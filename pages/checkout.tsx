import axios from "axios";
import moment from "moment";
import { useState, useEffect } from "react";
import Layout from "../layouts";

export default function checkout() {
  const [data, setData] = useState([]);
  const [singlePostInfo, setSinglePostInfo] = useState<any>(undefined);

  console.log(data, "data checkout");
  console.log(singlePostInfo, "singlePostInfo checkout");

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

  const [myString, setMyString] = useState(null);

  useEffect(() => {
    const getorderNumber = localStorage.getItem("orderNumber");

    const singlePosts = data?.find((post: any) => {
      console.log(post?.ordernumber, "haha");
      if (post?.ordernumber === getorderNumber) {
        return {
          ...post,
        };
      }
    });
    setSinglePostInfo(singlePosts);
  }, [data]);

  return (
    <Layout>
      <div className="checkout-ara">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {/* <pre>
                <code>{JSON.stringify(singlePostInfo, null, 4)}</code>
              </pre> */}
              <div className="checkout-title text-center">
                <h2>Check Out</h2>
              </div>
            </div>
          </div>

          <div className="row">
            <p className="mb-5">Thank you. Your order has been received.</p>

            <div className="col-lg-3">
              <p>ORDER NUMBER: </p>
              <p>{singlePostInfo?.ordernumber}</p>
            </div>
            <div className="col-lg-3">
              <p> DATE:</p>
              <p>{moment(singlePostInfo?.date).format("lll")}</p>
            </div>
            <div className="col-lg-3">
              <p>TOTAL:</p>
              <p>৳ {singlePostInfo?.total}</p>
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
                {singlePostInfo?.cart.map((product: any, index: any) => {
                  return (
                    <tr key={index}>
                      <td>{product?.title}</td>
                      <td>{product?.price}</td>
                    </tr>
                  );
                })}

                <tr>
                  <td>Sub total</td>
                  <td>৳ {singlePostInfo?.total}</td>
                </tr>

                <tr>
                  <td>Total</td>
                  <td>৳ {singlePostInfo?.total}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
