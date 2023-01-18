import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { fetchComments } from "../state-management/actions/comments";
import { fetchUsers } from "../state-management/actions/users";
import { fetchPosts } from "../state-management/actions/productshow";
import { Button, Tooltip } from "antd";
import PostCard from "./postCard";
import { Card } from "antd";
import Link from "next/link";
function SearchBar({
  posts,
  postsInfo,
  comments,
  commentInfo,
  users,
  userInfo,
}: any) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [grettingsMsg, setGrettingsMsg] = useState<string>("");

  // dispatch post and comments
  useEffect(() => {
    posts();
    comments();
    users();
  }, [posts, comments, users]);

  const handleFilter = (event: any) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = postsInfo?.postsData?.filter((value: any) => {
      return value?.title.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };
  useEffect(() => {
    var today = new Date();
    var curHr = today.getHours();

    if (curHr < 12) {
      setGrettingsMsg("শুভ সকাল! 👋");
    } else if (curHr < 18) {
      setGrettingsMsg("শুভ অপরাহ্ন! 👋");
    } else {
      setGrettingsMsg("শুভ সন্ধা! 👋");
    }
  }, []);
  return (
    <>
      <div className="searchbar-area">
        <div className="row">
          <div className="col-lg-12">
            <div>
              <div className="inputsearch-area">
                <input
                  type="text"
                  className="inputsearch"
                  placeholder="Search Product here.."
                  value={wordEntered}
                  onChange={handleFilter}
                />
              </div>
              {filteredData.length > 0 ? (
                <div className="dataResult">
                  {filteredData.slice(0, 15).map((item, index) => {
                    return (
                      <>
                        <div className="searchres-detais-area mt-3">
                          <div className="container">
                            <div className="row">
                              <div className="col-lg-12">
                                <Link href={`/posts/${item?._id}`}>
                                  <Card>
                                    <div key={index} className="searchres">
                                      <h3>{item?.title} </h3>
                                    </div>
                                  </Card>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
              ) : (
                <div className="banner-title-area"></div>
              )}
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
    comments: () => dispatch(fetchComments()),
    users: () => dispatch(fetchUsers()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
