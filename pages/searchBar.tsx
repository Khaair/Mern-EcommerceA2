import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { fetchComments } from "../state-management/actions/comments";
import { fetchUsers } from "../state-management/actions/users";
import { fetchPosts } from "../state-management/actions/posts";
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

  console.log(filteredData, "search");

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

    console.log(curHr, "getHours");

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
            <h4 className="mb-3">{grettingsMsg}</h4>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div>
              <div className="inputsearch-area">
                <input
                  type="text"
                  className="inputsearch"
                  placeholder="Search post here.."
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
                                      <p>{item?.body}</p>
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
                <div className="banner-title-area">
                  <div className="row">
                    <div className="col-lg-12">
                      <h1 className="blog-head-title">BD Ecommerce</h1>
                      <p>
                        In other words, the digital journal. Maybe you want to
                        document life as a mother, your fashion sense, your
                        adventures as your travel, or just life in general,
                        blogging is one of the easiest ways to get your thoughts
                        out there to the masses. (Of course you can always blog
                        privately if you’d rather just document your life for
                        your own personal reflection.) I love seeing how many
                        people are finally exploring the world of blogging and
                        the community of inspiring and talented individuals that
                        populate it. However, it’s become a larger discussion on
                        whether it’s okay to document your kids on such
                        platforms since they can’t really give consent as
                        babies, but personally if I could go back and read a
                        blog by my own mother as a young mom that would be the
                        most beautiful and priceless gift. And one of the best
                        things about blogging is there is no limit on how long
                        or what you can document. It will be interesting to see
                        if this generation will still be blogging, in whatever
                        form that takes on, in the next 50 years.
                      </p>
                    </div>
                  </div>
                </div>
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
