import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchPosts } from "../state-management/actions/productshow";

function EcomHome({ posts, postsInfo }: any) {
  const [data, setData] = useState([]);
  console.log(data, "data is here");
  // dispatch post and comments
  useEffect(() => {
    posts();
  }, [posts]);
  console.log(postsInfo?.postsData, "postsInfo?.postsData hereeeeeee");

  const [items, setItems] = useState([]);

  useEffect(() => {
    // Get the existing cart from local storage
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (cart) {
      setItems(cart);
    }
  }, []);

  const addToCart = (productDetails: {
    productId: any;
    price: any;
    title: any;
  }) => {
    const productId = productDetails.productId;
    const price = productDetails.price;
    const title = productDetails.title;

    // Get the existing cart from local storage
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (cart) {
      setItems(cart);
    }
    // Add the new product to the cart
    cart.push({ productId, price, title });

    // Save the updated cart back to local storage
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  return (
    <>
      <div className="navbar-and-banner-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="banner-content-wrapper">
                <div className="banner-content-title">
                  <h2>This site under construction</h2>
                  <h3>25% Off On All Tops</h3>
                </div>
                <div className="banner-btn-wrapper">
                  <button className="first-banner-btn">Shop Now</button>
                  <button>Find More</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="e-com-product-show-area e-com-section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div
                style={{ backgroundImage: 'url("/img/prod-01.jpg")' }}
                className="product-card-area"
              >
                <h2>20% Off On Tank Tops</h2>
                <p>Lorem ipsum dolor sit amet consec tetur.</p>
                <div className="product-card-btn-wrapper">
                  <button>Shop Now</button>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div
                style={{ backgroundImage: 'url("/img/prod-02.jpg")' }}
                className="product-card-area"
              >
                <h2>20% Off On Tank Tops</h2>
                <p>Lorem ipsum dolor sit amet consec tetur.</p>
                <div className="product-card-btn-wrapper">
                  <button>Shop Now</button>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div
                style={{ backgroundImage: 'url("/img/prod-03.jpg")' }}
                className="product-card-area"
              >
                <h2>20% Off On Tank Tops</h2>
                <p>Lorem ipsum dolor sit amet consec tetur.</p>
                <div className="product-card-btn-wrapper">
                  <button>Shop Now</button>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div
                style={{ backgroundImage: 'url("/img/prod-04.jpg")' }}
                className="product-card-area"
              >
                <h2>20% Off On Tank Tops</h2>
                <p>Lorem ipsum dolor sit amet consec tetur.</p>
                <div className="product-card-btn-wrapper">
                  <button>Shop Now</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="feature-product-title-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2>Featured Products</h2>
              <span className="featured-product-span" />
            </div>
          </div>
        </div>
      </div>
      <div className="feature-all-product-wrapper ">
        <div className="feature-product-area e-com-section-padding-small">
          <div className="container">
            <div className="row">
              {postsInfo?.postsData?.map((product: any, index: any) => {
                const productDetails = {
                  productId: product?.productId,
                  price: product?.price,
                  title: product?.title,
                };
                return (
                  <div key={index} className="col-lg-3">
                    <div className="dgarma-product-show-card">
                      <div className="dgarma-product-show-img text-center">
                        <img src={product?.url} alt="dgarma-product-show-img" />
                      </div>
                      <div className="dgarma-product-show-card-content">
                        <h3>{product?.title}</h3>
                        <span>{product?.category}</span>
                        <div className="dgarma-product-show-wrapper">
                          <p>
                            <span>Price:</span>৳ {product?.price}
                          </p>
                          <button
                            onClick={() => addToCart(productDetails)}
                            type="button"
                          >
                            Add to cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state: { posts: any; comments: any; users: any }) => {
  return {
    postsInfo: state?.posts,
    commentInfo: state?.comments,
    userInfo: state?.users,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    posts: () => dispatch(fetchPosts()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EcomHome);
