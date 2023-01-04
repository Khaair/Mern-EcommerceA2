import axios from "axios";
import {
  FETCH_SIGNUP_FAILURE_REQUEST,
  FETCH_SIGNUP_SUCCESS_REQUEST,
  FETCH_SIGNUP__REQUEST,
} from "../types";

export const fetchPostsLoad = () => {
  return {
    type: FETCH_SIGNUP__REQUEST,
  };
};
export const fetchPostSuccess = (signupInfo: any) => {
  return {
    type: FETCH_SIGNUP_SUCCESS_REQUEST,
    payload: signupInfo,
  };
};

export const fetchPostFailed = (error: any) => {
  return {
    type: FETCH_SIGNUP_FAILURE_REQUEST,
    payload: error,
  };
};

export const sendSignUpData = (value: any) => {
  return (dispatch: any) => {
    dispatch(fetchPostsLoad());
    axios
      .post(`${process.env.NEXT_PUBLIC_APP_READER_BASE_URL}/auth/signup`, {
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


