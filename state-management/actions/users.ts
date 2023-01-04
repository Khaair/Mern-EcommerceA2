import axios from "axios";
import {
  FETCH_USERS_FAILURE_REQUEST,
  FETCH_USERS_SUCCESS_REQUEST,
  FETCH_USERS__REQUEST,
} from "../types";

export const fetchPostsLoad = () => {
  return {
    type: FETCH_USERS__REQUEST,
  };
};
export const fetchPostSuccess = (userInfo: any) => {
  return {
    type: FETCH_USERS_SUCCESS_REQUEST,
    payload: userInfo,
  };
};

export const fetchPostFailed = (error: any) => {
  return {
    type: FETCH_USERS_FAILURE_REQUEST,
    payload: error,
  };
};

export const fetchUsers = () => {
  return (dispatch: any) => {
    dispatch(fetchPostsLoad());
    axios
      .get(`${process.env.NEXT_PUBLIC_APP_READER_BASE_URL}/showusers`, {
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
