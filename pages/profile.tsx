import { DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Col,
  message,
  Modal,
  Row,
  Upload,
  UploadProps,
} from "antd";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Layout from "../layouts";
import { fetchComments } from "../state-management/actions/comments";
import { fetchUsers } from "../state-management/actions/users";
import { fetchPosts } from "../state-management/actions/posts";
import { fetchUsersPhotos } from "../state-management/actions/userphoto";

import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
const getBase64 = (img: any, callback: any) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file: any) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

function Profile({
  posts,
  postsInfo,
  comments,
  commentInfo,
  users,
  userInfo,
  usersphoto,
  usersphotoInfo,
}: any) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState<boolean>(false);

  const [getSingleUserData, setSingleUserData] = useState<any>("");
  const [getPost, setPosts] = useState<any>([]);
  const [getUsers, setUsers] = useState<any>([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [SinglePhotoInfo, setSinglePhotoInfo] = useState("");

  const [notificationMsg, setNotificationMsg] = useState("");
  const [grettingsMsg, setGrettingsMsg] = useState<string>("");
  const [editTitle, setEditTitle] = useState<string>("");
  const [editbody, setEditBody] = useState<string>("");
  const [getPostId, setPostId] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const handleChange = (info: any) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url: any) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  console.log(SinglePhotoInfo?.at(-1)?.url, "SinglePhotoInfo hereeee haha");
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const userId = JSON.parse(localStorage.getItem("userId") as string);

  // dispatch post and comments
  useEffect(() => {
    posts();
    comments();
    users();
    usersphoto();
  }, [posts, comments, users, usersphoto]);

  //  get comment filter
  useEffect(() => {
    const posts = postsInfo?.postsData?.map((post: any) => {
      return {
        ...post,
        comments: commentInfo?.commentData?.filter(
          (comment: any) => post?._id === comment?.postId
        ),
        users: userInfo?.usersData?.filter(
          (user: any) => post?.userId === user?._id
        ),
      };
    });
    setPosts(posts);
  }, [commentInfo?.commentData, postsInfo?.postsData, userInfo?.usersData]);
  useEffect(() => {
    const users = userInfo?.usersData?.map((user: any) => {
      return {
        ...user,

        posts: postsInfo?.postsData?.filter(
          (post: any) => post?.userId === userId
        ),
      };
    });
    setUsers(users);
  }, [
    commentInfo?.commentData,
    postsInfo?.postsData,
    userInfo?.usersData,
    posts,
  ]);

  const router = useRouter();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    alert("After clicking ok delete api will call");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleClearLocalStorage = () => {
    localStorage.clear();
    router.push("/");
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchSingleUser = async () => {
    try {
      let res = await axios.get(
        `http://localhost:8080/api/show-single-user/${userId}`
      );

      console.log(res?.data, "profile");
      setSingleUserData(res?.data);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    fetchSingleUser();
  }, [userId]);

  const currentTime = new Date();

  console.log(currentTime, "currentTime");

  const sendDatatoApp = async () => {
    try {
      let x = await axios.post("http://localhost:8080/api/savepost", {
        title,
        body,
        userId,
        postTime: currentTime,
      });
      console.log(x?.status, "success");
      if (x?.status === 200) {
        handleCancel();
        posts();
      }
    } catch (er) {
      console.log(er);
    }
  };

  const deletepost = async (id: any) => {
    try {
      let mydata = await axios.delete(
        `http://localhost:8080/api/delete-post/${id}`
      );
      console.log(mydata);

      const filterd = getPost.filter((a: any) => a._id !== id);
      setUsers(filterd);
      posts();
    } catch (er) {
      console.log(er);
    }
  };

  const handleOkEdit = () => {
    setIsModalOpenEdit(false);
    alert("After clicking ok delete api will call");
  };

  const handleCancelEdit = () => {
    setIsModalOpenEdit(false);
  };

  const showModalEdit = () => {
    setIsModalOpenEdit(true);
  };

  const fetchdata = async (postId: any) => {
    setPostId(postId);
    try {
      const data = await axios.get(
        `http://localhost:8080/api/show-single-post/${postId}`
      );

      console.log(data, "update data here");

      setEditTitle(data.data.title);

      setEditBody(data.data.body);
    } catch (err) {
      console.log(err, "error");
    }

    showModalEdit();
  };

  const upDate = async () => {
    try {
      let ad = await axios.post(
        `http://localhost:8080/api/update-post/${getPostId}`,
        {
          title: editTitle,
          body: editbody,
          userId,
        }
      );
      handleCancelEdit();
      posts();
      console.log(ad);
    } catch (er) {
      console.log(er);
    }
  };
  const userNamee = JSON.parse(localStorage.getItem("userName") as string);

  const sendUserPhotoApp = async () => {
    try {
      let x = await axios.post("http://localhost:8080/api/save-user-photo", {
        username: userNamee,
        url: imageUrl,
        userId,
      });
      console.log(x?.status, "success");
      if (x?.status === 200) {
        handleCancel();
        posts();
        usersphoto();
      }
    } catch (er) {
      console.log(er);
    }
  };

  useEffect(() => {
    const usersphotoo = usersphotoInfo?.usersPhotosData?.filter(
      (photo: any) => {
        if (photo?.userId === userId) {
          return {
            ...photo,
          };
        }
      }
    );

    setSinglePhotoInfo(usersphotoo);
  }, [userId, usersphotoInfo?.usersPhotosData]);

  return (
    <>
      <Layout>
        <div className="deshboard-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="profile-picture-area d-flex">
                  <div>
                    <img src={SinglePhotoInfo?.at(-1)?.url} />
                  </div>
                  <div>
                    <Upload
                      name="avatar"
                      listType="picture-card"
                      className="avatar-uploader"
                      showUploadList={false}
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      beforeUpload={beforeUpload}
                      onChange={handleChange}
                    >
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt="avatar"
                          style={{
                            width: "100%",
                          }}
                        />
                      ) : (
                        uploadButton
                      )}
                    </Upload>
                  </div>
                </div>
                <button onClick={sendUserPhotoApp} className="btn btn-success">
                  Upload
                </button>
              </div>
              <div className="col-lg-4">
                <button onClick={showModal} className="btn btn-primary">
                  Create post
                </button>
              </div>
            </div>

            <Row>
              <Col span={24}>
                <form className="form">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-12">
                        <table style={{ width: "100%" }}>
                          <tbody>
                            <tr>
                              <td>
                                <label className="col-form-label  fw-bold fs-6">
                                  Full Name:
                                </label>
                              </td>
                              <td>
                                {" "}
                                <label className="col-form-label  fw-bold fs-6">
                                  {getSingleUserData?.username}
                                </label>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <label className="col-form-label  fw-bold fs-6">
                                  Email:
                                </label>
                              </td>
                              <td>
                                <label className="col-form-label  fw-bold fs-6">
                                  {getSingleUserData?.email}&nbsp;
                                </label>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <label className="col-form-label  fw-bold fs-6">
                                  Contact Phone:
                                </label>
                              </td>
                              <td>
                                <label className="col-form-label  fw-bold fs-6">
                                  01777975237 &nbsp;
                                </label>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <label className="col-form-label  fw-bold fs-6">
                                  Address:
                                </label>
                              </td>
                              <td>
                                <label className="col-form-label  fw-bold fs-6">
                                  Mohammadpur,Dhaka
                                </label>
                              </td>
                            </tr>
                            <br></br>
                            <br></br>

                            <tr>
                              <td>
                                <button
                                  onClick={handleClearLocalStorage}
                                  className="btn btn-primary"
                                >
                                  Logout
                                </button>
                              </td>

                              <td></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </form>
              </Col>
            </Row>

            <Modal
              title="Create a new post"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={null}
            >
              <div className="container">
                <form action="">
                  <div className="form-group mt-3">
                    <label htmlFor="">Enter Title</label>
                    <input
                      className="form-control"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      style={{ margin: "12px" }}
                      placeholder="Enter title"
                    />
                    <p style={{ color: "red" }}>{notificationMsg}</p>
                  </div>

                  <div className="form-group">
                    <label htmlFor="">Enter Description</label>

                    <textarea
                      className="form-control"
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
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
              </div>
            </Modal>
            <div className="bottom-section-area mt-5">
              <div className="row">
                <div className="col-lg-12">
                  <div className="card-profile-post-section text-center">
                    <h3>
                      Hey! {getSingleUserData?.username}, your all post here
                    </h3>
                  </div>
                </div>
                {getUsers
                  .slice(0, 1)[0]
                  ?.posts?.map((post: any, index: any) => {
                    return (
                      <div key={index} className="col-lg-12">
                        <div className="card-profile-post-section">
                          <div>
                            <h3>{post?.title}</h3>
                            <p> {getSingleUserData?.username}</p>
                            <p>{post?.body}</p>
                            <DeleteOutlined
                              key="delete"
                              style={{ fontSize: "19px", color: "red" }}
                              onClick={() => deletepost(post?._id)}
                            />
                            <div
                              onClick={() => fetchdata(post?._id)}
                              className="btn btn-primary mx-3"
                            >
                              Edit
                            </div>

                            <Modal
                              title="Edit this post"
                              open={isModalOpenEdit}
                              onOk={handleOkEdit}
                              onCancel={handleCancelEdit}
                              footer={null}
                            >
                              <div className="container">
                                <form action="">
                                  <div className="form-group mt-3">
                                    <label htmlFor="">Enter Title</label>
                                    <input
                                      className="form-control"
                                      value={editTitle}
                                      onChange={(e) =>
                                        setEditTitle(e.target.value)
                                      }
                                      style={{ margin: "12px" }}
                                      placeholder="Enter title"
                                    />
                                    <p style={{ color: "red" }}>
                                      {notificationMsg}
                                    </p>
                                  </div>

                                  <div className="form-group">
                                    <label htmlFor="">Enter Description</label>

                                    <textarea
                                      className="form-control"
                                      value={editbody}
                                      onChange={(e) =>
                                        setEditBody(e.target.value)
                                      }
                                      style={{ margin: "12px" }}
                                      placeholder="Enter Description"
                                    />
                                  </div>
                                  <button
                                    className="btn btn-primary mt-3"
                                    type="button"
                                    onClick={upDate}
                                  >
                                    Update
                                  </button>
                                </form>
                              </div>
                            </Modal>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

const mapStateToProps = (state: {
  posts: any;
  comments: any;
  users: any;
  usersphoto: any;
}) => {
  return {
    postsInfo: state?.posts,
    commentInfo: state?.comments,
    userInfo: state?.users,
    usersphotoInfo: state?.usersphoto,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    posts: () => dispatch(fetchPosts()),
    comments: () => dispatch(fetchComments()),
    users: () => dispatch(fetchUsers()),
    usersphoto: () => dispatch(fetchUsersPhotos()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
