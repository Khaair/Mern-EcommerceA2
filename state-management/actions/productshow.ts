import axios from "axios";
import {
  FETCH_PRODUCTSSHOW_FAILURE_REQUEST,
  FETCH_PRODUCTSSHOW_SUCCESS_REQUEST,
  FETCH_PRODUCTSSHOW__REQUEST,
} from "../types";

export const fetchPostsLoad = () => {
  return {
    type: FETCH_PRODUCTSSHOW__REQUEST,
  };
};
export const fetchPostSuccess = (postInfo: any) => {
  return {
    type: FETCH_PRODUCTSSHOW_SUCCESS_REQUEST,
    payload: postInfo,
  };
};

export const fetchPostFailed = (error: any) => {
  return {
    type: FETCH_PRODUCTSSHOW_FAILURE_REQUEST,
    payload: error,
  };
};

export const fetchPosts = () => {
  return (dispatch: any) => {
    dispatch(fetchPostsLoad());
    axios
      .get(`${process.env.NEXT_PUBLIC_APP_READER_BASE_URL}/product-show`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        dispatch(fetchPostSuccess(res?.data?.splice(0, 20)));
      })
      .catch((err) => {
        dispatch(fetchPostFailed(err?.message));
      });
  };
};
