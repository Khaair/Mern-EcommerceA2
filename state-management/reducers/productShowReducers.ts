import {
  FETCH_PRODUCTSSHOW_FAILURE_REQUEST,
  FETCH_PRODUCTSSHOW_SUCCESS_REQUEST,
  FETCH_PRODUCTSSHOW__REQUEST,
} from "../types";
const initalState = {
  loading: false,
  postsData: [],
  error: "",
};
export const productShowReducers = (state = initalState, action: any) => {
  switch (action.type) {
    case FETCH_PRODUCTSSHOW__REQUEST:
      return { ...state, loading: true };
    case FETCH_PRODUCTSSHOW_SUCCESS_REQUEST:
      return {
        loading: false,
        postsData: action.payload,
      };
    case FETCH_PRODUCTSSHOW_FAILURE_REQUEST:
      return {
        loading: false,
        postsData: [],
        error: action.payload,
      };
    default:
      return state; 
  }
};
export default productShowReducers;
