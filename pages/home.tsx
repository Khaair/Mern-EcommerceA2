import React, { useEffect, useState } from "react";

export default function EcomHome() {
  const productdata = [
    {
      productId: 1,
      id: 1,
      title: "Buffalo burgers A",
      type: "Wild salmon",
      price: 290,
    },
    {
      productId: 2,
      id: 2,
      title: "Buffalo burgers B",
      type: "Wild salmon",
      price: 290,
    },
    {
      productId: 3,
      id: 3,
      title: "Buffalo burgers C",
      type: "Wild salmon",
      price: 290,
    },
    {
      productId: 4,
      id: 4,
      title: "Buffalo burgers D",
      type: "Wild salmon",
      price: 290,
    },
    {
      productId: 5,
      id: 5,
      title: "Buffalo burgers E",
      type: "Wild salmon",
      price: 290,
    },
    {
      productId: 6,
      id: 6,
      title: "Buffalo burgers F",
      type: "Wild salmon",
      price: 290,
    },
    {
      productId: 7,
      id: 7,
      title: "Buffalo burgers G",
      type: "Wild salmon",
      price: 290,
    },
    {
      productId: 8,
      id: 8,
      title: "Buffalo burgers H",
      type: "Wild salmon",
      price: 290,
    },
    {
      productId: 9,
      id: 9,
      title: "Buffalo burgers I",
      type: "Wild salmon",
      price: 290,
    },
    {
      productId: 10,
      id: 10,
      title: "Buffalo burgers J",
      type: "Wild salmon",
      price: 290,
    },
  ];

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
              <div className="col-lg-12 text-center">
                <h2>{items.length}</h2>
              </div>
            </div>

            <div className="row">
              {productdata?.map((product: any, index: any) => {
                const productDetails = {
                  productId: product?.productId,
                  price: product?.price,
                  title: product?.title,
                };
                return (
                  <div key={index} className="col-lg-3">
                    <div className="dgarma-product-show-card">
                      <div className="dgarma-product-show-img text-center">
                        <img
                          src="/img/f-s-1.jpg"
                          alt="dgarma-product-show-img"
                        />
                      </div>
                      <div className="dgarma-product-show-card-content">
                        <h3>{product?.title}</h3>
                        <span>Wild salmon</span>
                        <div className="dgarma-product-show-wrapper">
                          <p>
                            <span>Price:</span>৳ 290.00
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
