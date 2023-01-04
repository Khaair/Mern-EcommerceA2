import { Avatar, Col, Modal, Row, Skeleton } from "antd";
import { connect } from "react-redux";
import { fetchComments } from "../state-management/actions/comments";
import { fetchUsers } from "../state-management/actions/users";
import { fetchPosts } from "../state-management/actions/posts";
import { DeleteOutlined, CommentOutlined } from "@ant-design/icons";
import { Card } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Home from "./home";
import Moment from "react-moment";
import axios from "axios";
import moment from "moment";
function PostCard({
  posts,
  postsInfo,
  comments,
  commentInfo,
  users,
  userInfo,
}: any) {
  const { Meta } = Card;

  const [getPost, setPosts] = useState<any>([]);
  const [getPhoto, setPhoto] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [getUser, setUsers] = useState<any>([]);

  const [singlePostId, setSinglePostId] = useState<any>(undefined);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // const handleOk = () => {
  //   setIsModalOpen(false);
  //   alert("After clicking ok delete api will call");
  // };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // dispatch post and comments
  useEffect(() => {
    posts();
    comments();
    users();
    fetchPhotos();
  }, [posts, comments, users]);
  console.log(postsInfo?.postsData, "postsInfo?.postsData hereeeeeee");
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

        photos: getPhoto?.filter((photo: any) => post?.id === photo?.id),
      };
    });
    setPosts(posts);
  }, [
    commentInfo?.commentData,
    getPhoto,
    postsInfo?.postsData,
    userInfo?.usersData,
  ]);

  const fetchPhotos = async () => {
    try {
      let response = await fetch(
        "https://jsonplaceholder.typicode.com/photos?_limit=20",
        {
          method: "GET",
        }
      );
      let json = await response.json();
      setPhoto(json);
      return json;
    } catch (error) {
      return error;
    }
  };
  let sortedArraygetPost = getPost?.sort(
    (a: any, b: any) =>
      (new Date(b.postTime) as any) - (new Date(a.postTime) as any)
  );
  return (
    <div className="post-card-area">
      <div className="container">
        <Row className="mt-5">
          <Col span={24}>
            <Home />
          </Col>
        </Row>

        <Row gutter={16} className="mt-5 ">
          {postsInfo?.loading ? (
            <Col span={24}>
              <div className="dna-wrapper-area">
                <Skeleton active />
              </div>
            </Col>
          ) : (
            sortedArraygetPost?.slice(0, 25)?.map((item: any, index: any) => {
              return (
                <Col className="text-center" span={24} lg={24} key={index}>
                  <div className="container">
                    <Link href={`/posts/${item?._id}`}>
                      <Card>
                        <div className="container">
                          <h2>{item?.title}</h2>

                          <div className="post-profile-card">
                            <div className="post-profile-card-avater-name mt-3">
                              <Avatar src={item?.photos[0]?.url} />
                              <h6 className="mx-2 ">
                                {item?.users[0]?.username}
                              </h6>
                            </div>
                            <div>
                              <p>{moment(item?.postTime).format("lll")}</p>
                            </div>
                          </div>
                          <p className="post-profile-card-body">
                            {" "}
                            {item?.body}
                          </p>

                          <div className="post-comment-counter">
                            <p> {item?.comments?.length}</p>
                            <CommentOutlined
                              key="comment"
                              style={{
                                fontSize: "19px",
                                color: "green",
                              }}
                            />
                          </div>
                        </div>
                      </Card>
                    </Link>
                  </div>
                </Col>
              );
            })
          )}
        </Row>
      </div>
    </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(PostCard);
