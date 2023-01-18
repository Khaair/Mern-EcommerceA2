import { Col, Image, Row } from "antd";
import router, { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import Layout from "../../layouts/index";
import { connect } from "react-redux";
import { fetchComments } from "../../state-management/actions/comments";
import { fetchUsers } from "../../state-management/actions/users";
import ReactImageMagnify from "react-image-magnify";
import StarRatings from "react-star-ratings";
import { fetchPosts } from "../../state-management/actions/productshow";
import Link from "next/link";
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
  const [rating, setRating] = useState(5);
  const [getfetchRatingdata, setGetfetchRatingdata] = useState();
  const [singleProductTotalRating, setsingleProductTotalRating] = useState([]);
  const [finalavaragevalue, setFinalavaragevalue] = useState();
  const [fiveRating, setFiveRating] = useState([]);
  const [fourRating, setFourRating] = useState([]);
  const [threeRating, setThreeRating] = useState([]);
  const [twoRating, setTwoRating] = useState([]);
  const [oneRating, setOneRating] = useState([]);
  const [totallength, setTotallength] = useState<number>(0);

  console.log(getfetchRatingdata, "getfetchRatingdata");
  console.log(finalavaragevalue, "finalavaragevalue");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setTotallength(
      oneRating?.length * 1 +
        twoRating?.length * 2 +
        threeRating?.length * 3 +
        fourRating?.length * 4 +
        fiveRating?.length * 5
    );
  }, [
    fiveRating?.length,
    fourRating?.length,
    oneRating?.length,
    threeRating?.length,
    twoRating?.length,
  ]);

  const calculateTotal = useCallback(() => {
    let total = 0;
    for (let i = 0; i <= singleProductTotalRating?.length - 1; i++) {
      total += singleProductTotalRating[i]?.ratingValue;
    }

    return total;
  }, [singleProductTotalRating]);
  useEffect(() => {
    let finalaavagragevalue: any = calculateTotal();
    console.log(finalaavagragevalue, "finalaavagragevalue hiii");
    setFinalavaragevalue((finalaavagragevalue / 5) as any);
  }, [calculateTotal, singleProductTotalRating]);

  let totalt =
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
  const storedUserId = JSON.parse(localStorage.getItem("userId") as string);

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

  const changeRating = (newRating: React.SetStateAction<number>) => {
    setRating(newRating);
  };

  const sendRatingtoApp = async (productId: any) => {
    try {
      let x = await axios.post("http://localhost:8080/api/product-rating-add", {
        userId: storedUserId,
        productId,
        ratingValue: rating,
      });

      if (x.status === 200) {
        fetchRatingdata();
        console.log(x.status, "success");
      }

      console.log(x.status, "success");
    } catch (er) {
      if (er) {
        console.log(er, "success");
      }
    }
  };

  const fetchRatingdata = async () => {
    try {
      const datahere = await axios.get(
        "http://localhost:8080/api/product-rating-show"
      );
      setGetfetchRatingdata(datahere.data);
    } catch (err) {
      console.log(err, "error");
    }
  };

  useEffect(() => {
    fetchRatingdata();
  }, []);

  useEffect(() => {
    const productTotalRating = getfetchRatingdata?.filter((rating: any) => {
      if (rating?.productId === id) {
        return {
          ...rating,
        };
      }
    });
    setsingleProductTotalRating(productTotalRating);
  }, [getfetchRatingdata, id]);

  useEffect(() => {
    const fiveRatingg = singleProductTotalRating?.filter((rating: any) => {
      if (rating?.ratingValue === 5) {
        return {
          ...rating,
        };
      }
    });
    setFiveRating(fiveRatingg);

    const fourRatingg = singleProductTotalRating?.filter((rating: any) => {
      if (rating?.ratingValue === 4) {
        return {
          ...rating,
        };
      }
    });
    setFourRating(fourRatingg);

    const threeRatingg = singleProductTotalRating?.filter((rating: any) => {
      if (rating?.ratingValue === 3) {
        return {
          ...rating,
        };
      }
    });
    setThreeRating(threeRatingg);

    const twoRatingg = singleProductTotalRating?.filter((rating: any) => {
      if (rating?.ratingValue === 2) {
        return {
          ...rating,
        };
      }
    });
    setTwoRating(twoRatingg);

    const oneRatingg = singleProductTotalRating?.filter((rating: any) => {
      if (rating?.ratingValue === 1) {
        return {
          ...rating,
        };
      }
    });
    setOneRating(oneRatingg);
  }, [getfetchRatingdata, singleProductTotalRating]);

  return (
    <Layout>
      <div className="details-page-area">
        <div className="container">
          <Row>
            <Col span={24}>
              <div className="details-page-top-card-wrapper">
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
                    </div>
                    <div className="col-lg-6">
                      <div className="post-details">
                        <h3>{singlePostInfo?.title}</h3>

                        <div>
                          <StarRatings
                            rating={finalavaragevalue}
                            starRatedColor="orange"
                            numberOfStars={5}
                            name="rating"
                            starDimension="20px"
                          />
                        </div>

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
              <div className="details-page-first-left-side-wrapper">
                <div className="row">
                  <div className="col-lg-4">
                    <h3>Avarage rating here:</h3>
                    <div>
                      <StarRatings
                        rating={finalavaragevalue}
                        starRatedColor="orange"
                        numberOfStars={5}
                        name="rating"
                        starDimension="20px"
                      />
                    </div>

                    <p>{singleProductTotalRating?.length} Ratings</p>
                  </div>
                  <div className="col-lg-4">
                    <div className="specfice-rating-star">
                      <StarRatings
                        rating={5}
                        starRatedColor="orange"
                        numberOfStars={5}
                        name="rating"
                        starDimension="20px"
                      />
                      <b className="mx-2 mt-1">{fiveRating?.length}</b>
                    </div>
                    <div className="specfice-rating-star">
                      <StarRatings
                        rating={4}
                        starRatedColor="orange"
                        numberOfStars={5}
                        name="rating"
                        starDimension="20px"
                      />
                      <b className="mx-2 mt-1">{fourRating?.length}</b>
                    </div>
                    <div className="specfice-rating-star">
                      <StarRatings
                        rating={3}
                        starRatedColor="orange"
                        numberOfStars={5}
                        name="rating"
                        starDimension="20px"
                      />
                      <b className="mx-2 mt-1">{threeRating?.length}</b>
                    </div>
                    <div className="specfice-rating-star">
                      <StarRatings
                        rating={2}
                        starRatedColor="orange"
                        numberOfStars={5}
                        name="rating"
                        starDimension="20px"
                      />
                      <b className="mx-2 mt-1">{twoRating?.length}</b>
                    </div>
                    <div>
                      <StarRatings
                        rating={1}
                        starRatedColor="orange"
                        numberOfStars={5}
                        name="rating"
                        starDimension="20px"
                      />
                      <b className="mx-2 mt-2">{oneRating?.length}</b>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div>
                      <StarRatings
                        rating={rating}
                        starRatedColor="orange"
                        numberOfStars={5}
                        name="rating"
                        starDimension="20px"
                        changeRating={changeRating}
                      />
                    </div>

                    <button
                      onClick={() => sendRatingtoApp(singlePostInfo?._id)}
                      className="btn btn-primary mt-4"
                    >
                      Rating Add
                    </button>
                  </div>
                </div>
              </div>
              <div className="details-page-left-side-wrapper">
                <form action="/action_page.php">
                  <div className="mb-3 mt-3">
                    <label htmlFor="comment">Comments:</label>
                    <textarea
                      className="form-control"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      style={{ marginTop: "12px" }}
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
                {getPost?.slice(0, 1)?.map((item: any, index: any) => {
                  return (
                    <div key={item?._id}>
                      {item?.comments?.map((inneritem: any, index: any) => {
                        return (
                          <div className="mt-5" key={index}>
                            <div className="single-product-comment-show-wrapper">
                              <img
                                src="https://secure.gravatar.com/avatar/8b8d6f209e2d1b976a7d0491ddf46150?s=60&d=mm&r=g"
                                alt=""
                              />
                              <div className="mx-3">
                                <h6>{inneritem?.userId}</h6>
                                <p>{inneritem?.comment}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}

                      <p>{item?.comment}</p>
                    </div>
                  );
                })}
              </div>
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
function calculateTotal(singleProductTotalRating: undefined) {
  throw new Error("Function not implemented.");
}
