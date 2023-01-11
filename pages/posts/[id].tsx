import { Col, Image, Row } from "antd";
import router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Layout from "../../layouts/index";
import { connect } from "react-redux";
import { fetchComments } from "../../state-management/actions/comments";
import { fetchUsers } from "../../state-management/actions/users";
import ReactImageMagnify from "react-image-magnify";

import { fetchPosts } from "../../state-management/actions/productshow";

import Link from "next/link";
import { log } from "console";
import axios from "axios";
function Details({
  posts,
  postsInfo,
  comments,
  commentInfo,
  users,
  userInfo,
}: any) {
  const router = useRouter();
  const { id } = router.query;
  const [singlePostInfo, setSinglePostInfo] = useState<any>(undefined);
  const [singleCommentInfo, setSingleCommentInfo] = useState<any>(undefined);

  const [getPost, setPosts] = useState();
  const [comment, setComment] = useState<string>("");
  const [items, setItems] = useState([]);

  console.log(commentInfo?.commentData, "commentInfo success new");
  console.log(getPost, "getPost");

  // dispatch post and comments
  useEffect(() => {
    posts();
    comments();
  }, [posts, comments]);

  useEffect(() => {
    const posts = postsInfo?.postsData?.map((post: any) => {
      return {
        ...post,
        comments: commentInfo?.commentData?.filter(
          (comment: any) => comment?.postId === id
        ),
        users: userInfo?.usersData?.filter(
          (user: any) => post?.userId === user?._id
        ),
      };
    });
    setPosts(posts);

    const singlePosts = postsInfo?.postsData?.find((post: any) => {
      if (post?._id === id) {
        return {
          ...post,
        };
      }
    });
    setSinglePostInfo(singlePosts);
  }, [commentInfo?.commentData, id, postsInfo?.postsData, userInfo?.usersData]);

  const userNamee = JSON.parse(localStorage.getItem("userName") as string);

  const sendDatatoApp = async () => {
    const userId = userNamee;
    const postId = id;
    try {
      let x = await axios.post("http://localhost:8080/api/save-comment", {
        comment,
        postId,
        userId,
      });
      console.log(x?.status, "success");
      // if (x?.status === 200) {
      //   router.push("/");
      // }
    } catch (er) {
      console.log(er);
    }
    comments();
  };

  const addToCart = (productDetails: {
    productId: any;
    price: any;
    title: any;
    url: any;
  }) => {
    const productId = productDetails.productId;
    const price = productDetails.price;
    const title = productDetails.title;
    const url = productDetails.url;

    // Get the existing cart from local storage
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (cart) {
      setItems(cart);
    }
    // Add the new product to the cart
    cart.push({ productId, price, title, url });

    // Save the updated cart back to local storage
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const productDetails = {
    productId: singlePostInfo?._id,
    price: singlePostInfo?.price,
    title: singlePostInfo?.title,
    url: singlePostInfo?.url,
  };
  return (
    <Layout>
      <div className="details-page-area">
        <div className="container">
          <Row>
            <Col span={24}>
              <div className="details-page-left-side-wrapper">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="image-magnify-gallery">
                        <ReactImageMagnify
                          {...({
                            smallImage: {
                              alt: "Single product image",
                              isFluidWidth: true,
                              src: singlePostInfo?.url,
                              sizes:
                                "(min-width: 800px) 10.5vw, (min-width: 415px) 10vw, 100vw",
                            },
                            largeImage: {
                              alt: "Single product image",
                              src: singlePostInfo?.url,

                              width: 900,
                              height: 900,
                              sizes:
                                "(min-width: 800px) 20.5vw, (min-width: 415px) 10vw, 100vw",
                            },
                            isHintEnabled: true,
                          } as any)}
                        />
                      </div>
                      {/* <img src={singlePostInfo?.url} alt="" /> */}
                    </div>
                    <div className="col-lg-6">
                      <div className="post-details">
                        <h3>{singlePostInfo?.title}</h3>

                        <h3 className="text-danger mt-2">
                          ৳ {singlePostInfo?.price}
                        </h3>
                        <div className="mt-2">
                          <p>{singlePostInfo?.description}</p>
                        </div>
                        <div className="mt-3">
                          <h5 className="text-success">
                            Available stock: {singlePostInfo?.quantity} pices
                          </h5>
                          <h6 className="text-danger">
                            Catagory: {singlePostInfo?.category}
                          </h6>
                        </div>
                        <div className="mt-3">
                          <Link href="/billing-address">
                            <button
                              onClick={() => addToCart(productDetails)}
                              className="btn btn-warning"
                            >
                              Buy Now
                            </button>
                          </Link>
                          <button
                            onClick={() => addToCart(productDetails)}
                            className="btn btn-info mx-2"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={18}>
              <div className="details-page-left-side-wrapper">
                <form action="/action_page.php">
                  <div className="mb-3 mt-3">
                    <label htmlFor="comment">Comments:</label>
                    <textarea
                      className="form-control"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      style={{ margin: "12px" }}
                      placeholder="Enter Description"
                    />
                  </div>
                  <button
                    className="btn btn-primary mt-3"
                    type="button"
                    onClick={sendDatatoApp}
                  >
                    Post
                  </button>
                </form>
                <div>
                  {singlePostInfo?.comments?.map((item: any, index: any) => {
                    return (
                      <>
                        <div className="container">
                          <div style={{ paddingTop: "30px" }} key={index}>
                            <h5 style={{ color: "gray" }}>{item?.name}</h5>
                            <p>{item?.body}</p>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
              {getPost?.slice(0, 1)?.map((item: any, index: any) => {
                return (
                  <div key={item?._id}>
                    {item?.comments?.map((inneritem: any, index: any) => {
                      return (
                        <div key={index}>
                          <h5>{inneritem?.userId}</h5>
                          <div>
                            <p>{inneritem?.comment}</p>
                          </div>
                        </div>
                      );
                    })}

                    <p>{item?.comment}</p>
                  </div>
                );
              })}
            </Col>
            <Col span={6}>
              <div className="details-page-right-side-wrapper">
                <div className="container">
                  <div className="post-details">
                    <h3 className="">Latest Product</h3>
                    <hr />

                    {getPost?.splice(0, 3)?.map((post: any) => (
                      <div className="sidebar-single-post" key={post?._id}>
                        <Link href={`/posts/${post?._id}`}>
                          {" "}
                          <h4>{post?.title}</h4>
                        </Link>
                        <p>{post?.users[0]?.username}</p>

                        <p>{post?.body}</p>

                        <hr />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </Layout>
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
    comments: () => dispatch(fetchComments()),
    users: () => dispatch(fetchUsers()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Details);
