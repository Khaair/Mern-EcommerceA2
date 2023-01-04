import axios from "axios";
import {
  FETCH_USERPHOTO_FAILURE_REQUEST,
  FETCH_USERPHOTO_SUCCESS_REQUEST,
  FETCH_USERPHOTO__REQUEST,
} from "../types";

export const fetchUserPhotoLoad = () => {
  return {
    type: FETCH_USERPHOTO__REQUEST,
  };
};
export const fetchUserPhotoSuccess = (postInfo: any) => {
  return {
    type: FETCH_USERPHOTO_SUCCESS_REQUEST,
    payload: postInfo,
  };
};

export const fetchUserPhotoFailed = (error: any) => {
  return {
    type: FETCH_USERPHOTO_FAILURE_REQUEST,
    payload: error,
  };
};

export const fetchUsersPhotos = () => {
  return (dispatch: any) => {
    dispatch(fetchUserPhotoLoad());
    axios
      .get(`${process.env.NEXT_PUBLIC_APP_READER_BASE_URL}/show-user-photo`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        dispatch(fetchUserPhotoSuccess(res?.data?.splice(0, 20)));
      })
      .catch((err) => {
        dispatch(fetchUserPhotoFailed(err?.message));
      });
  };
};
