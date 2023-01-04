import {
    FETCH_SIGNUP_FAILURE_REQUEST,
    FETCH_SIGNUP_SUCCESS_REQUEST,
    FETCH_SIGNUP__REQUEST,
  } from "../types";
  const initalState = {
    loading: false,
    signupsData: [],
    error: "",
  };
  export const signupReducers = (state = initalState, action: any) => {
    switch (action.type) {
      case FETCH_SIGNUP__REQUEST:
        return { ...state, loading: true };
      case FETCH_SIGNUP_SUCCESS_REQUEST:
        return {
          loading: false,
          signupsData: action.payload,
        };
      case FETCH_SIGNUP_FAILURE_REQUEST:
        return {
          loading: false,
          signupsData: [],
          error: action.payload,
        };
      default:
        return state; 
    }
  };
  export default signupReducers;
  