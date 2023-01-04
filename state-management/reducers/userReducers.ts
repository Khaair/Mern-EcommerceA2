import {
    FETCH_USERS_FAILURE_REQUEST,
    FETCH_USERS_SUCCESS_REQUEST,
    FETCH_USERS__REQUEST,
  } from "../types";
  const initalState = {
    loading: false,
    usersData: [],
    error: "",
  };
  export const postReducers = (state = initalState, action: any) => {
    switch (action.type) {
      case FETCH_USERS__REQUEST:
        return { ...state, loading: true };
      case FETCH_USERS_SUCCESS_REQUEST:
        return {
          loading: false,
          usersData: action.payload,
        };
      case FETCH_USERS_FAILURE_REQUEST:
        return {
          loading: false,
          usersData: [],
          error: action.payload,
        };
      default:
        return state; 
    }
  };
  export default postReducers;
  