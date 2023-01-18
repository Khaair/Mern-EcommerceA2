import axios from "axios";
import moment from "moment";
import { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
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

  const getorderNumber = localStorage.getItem("orderNumber");

  useEffect(() => {
    const singlePosts = data?.find((post: any) => {
      console.log(post?.ordernumber, "haha");
      if (post?.ordernumber === getorderNumber) {
        return {
          ...post,
        };
      }
    });
    setSinglePostInfo(singlePosts);
  }, [data, getorderNumber]);

  const componentRef = useRef();

  const handlepdf = useReactToPrint({
    content: () => componentRef?.current,
  } as any);

  return (
    <Layout>
      <div className="checkout-area">
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
            <div className="col-lg-12">
              <div className="checkout-print-wrapper" ref={componentRef as any}>
                <div className="row">
                  <p className="mb-5">
                    Thank you. Your order has been received.
                  </p>

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
                    <table id="cart">
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
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="container">
                <button className="btn btn-primary w-100" onClick={handlepdf}>
                  Print Invoice
                </button>
              </div>
            </div>
          </div>

          <div className="product-rating-order-info-area">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="card-product-order-info">
                    <div className="product-order-info-content-wrapper">
                      <div>
                        <p>order#1324565365</p>
                        <p>swatch</p>
                      </div>
                      <div>
                        <h4>Total: 500</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="card-product-rating-info">
                    <div className="card-product-rating-top-content-wrapper">
                      <p>Deliveried on 20.01.2023</p>
                      <p>Something else</p>
                    </div>

                    <div className="product-tracking-info-show">
                      <div className="progress-container">
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="circle"></div>
                      </div>
                      <div className="progress-text-container">
                        <div>
                          <p>processing</p>
                        </div>
                        <div>
                          <p>shipped</p>
                        </div>
                        <div>
                          <p>deliveried</p>
                        </div>
                      </div>
                    </div>

                    <div className="product-tracking-info-table-wrapper">
                      <div className="row">
                        <div className="col-lg-10">
                          <table className="product-rating-info-table">
                            <tr>
                              <td>
                                <div className="product-rating-info-img-wrapper">
                                  <div>
                                    <img
                                      src="https://dgarma-prod.s3.ap-southeast-1.amazonaws.com/public/products/813Dgarma_products-1a.jpg"
                                      alt="product rating img"
                                    />
                                  </div>
                                  <div className="mx-3 w-50">
                                    Pique Mix Blend Pique Mix Blend Pique Mix
                                    Blend Pique Mix Blend
                                  </div>
                                </div>
                              </td>
                              <td>৳ 500</td>

                              <td>Qty: 1</td>
                              <td>500</td>
                            </tr>
                          </table>
                        </div>
                        <div className="col-lg-2">
                          <button className="btn btn-info mt-3">
                            Write Review
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
