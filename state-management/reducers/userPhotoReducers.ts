import {
    FETCH_USERPHOTO_FAILURE_REQUEST,
    FETCH_USERPHOTO_SUCCESS_REQUEST,
    FETCH_USERPHOTO__REQUEST,
  } from "../types";
  const initalState = {
    loading: false,
    usersPhotosData: [],
    error: "",
  };
  export const userPhotoReducers = (state = initalState, action: any) => {
    switch (action.type) {
      case FETCH_USERPHOTO__REQUEST:
        return { ...state, loading: true };
      case FETCH_USERPHOTO_SUCCESS_REQUEST:
        return {
          loading: false,
          usersPhotosData: action.payload,
        };
      case FETCH_USERPHOTO_FAILURE_REQUEST:
        return {
          loading: false,
          usersPhotosData: [],
          error: action.payload,
        };
      default:
        return state; 
    }
  };
  export default userPhotoReducers;
  