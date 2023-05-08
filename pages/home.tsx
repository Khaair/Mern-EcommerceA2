import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchPosts } from "../state-management/actions/productshow";
import { Bars } from "react-loader-spinner";

function EcomHome({ posts, postsInfo }: any) {
  const [productData, setProductData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  console.log(categoryData, "categoryData");

  // dispatch post and comments
  useEffect(() => {
    posts();
    setProductData(postsInfo?.postsData);
  }, [posts]);

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
    url: any;
  }) => {
    const { productId, price, title, url } = productDetails;

    // Get the existing cart from local storage
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Check if the product already exists in the cart
    const productIndex = cart.findIndex(
      (item: any) => item.productId === productId
    );
    console.log("productIndex", productIndex);
    if (productIndex !== -1) {
      alert("Already in cart");
      return;
    }

    // Add the new product to the cart
    cart.push({ productId, price, title, url });

    // Save the updated cart back to local storage
    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Added to cart");

    console.log("cart", cart);
  };

  const handlewovelfilter = (category: string) => {
    const wovelfilter = postsInfo?.postsData?.filter((product: any) => {
      if (product?.category === category) {
        return {
          ...product,
        };
      }
    });
    setProductData(wovelfilter);
  };

  const fetchdata = async () => {
    try {
      const datahere = await axios.get(
        "http://localhost:8080/api/product-category-show"
      );
      setCategoryData(datahere.data);
    } catch (err) {
      console.log(err, "error");
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <>
      {postsInfo?.loading ? (
        <div className="ecommerce-loader-wrapper">
          <Bars
            height="100"
            width="100"
            color="#4fa94d"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        <div>
          <div className="navbar-and-banner-area">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="banner-content-wrapper">
                    <div className="banner-content-title">
                      <h1>Simple and Easy </h1>
                      <h1>Shoping with us</h1>
                      <h1>Extra 10%</h1>
                      <h1>Savings</h1>

                      <h3 className="mt-2">25% Off On All Tops</h3>
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
          <div className="filter-area mt-5">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 text-center">
                  <div className="filter-btn">
                    {categoryData?.map((item, index) => {
                      return (
                        <button
                          key={index}
                          onClick={() => handlewovelfilter(item?.category)}
                          className="btn btn-info mx-2 mb-3"
                        >
                          {item?.category}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="feature-all-product-wrapper ">
            <div className="feature-product-area e-com-section-padding-small">
              <div className="container">
                <div className="row">
                  {productData?.map((product: any, index: any) => {
                    const productDetails = {
                      productId: product?._id,
                      price: product?.price,
                      title: product?.title,
                      url: product?.url,
                    };
                    return (
                      <div key={index} className="col-lg-3 mt-3">
                        <div className="dgarma-product-show-card">
                          <div className="dgarma-product-show-img text-center">
                            <img
                              src={product?.url}
                              alt="dgarma-product-show-img"
                            />
                          </div>
                          <div className="dgarma-product-show-card-content">
                            <Link href={`/posts/${product?._id}`}>
                              <h3>{product?.title}</h3>
                            </Link>
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
        </div>
      )}
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
