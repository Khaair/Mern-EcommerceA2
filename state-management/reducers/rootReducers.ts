import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import commentReducers from "./commentReducers"; 
import userReducers from "./userReducers";
import userPhotoReducers from "./userPhotoReducers";
import productShowReducers from "./productShowReducers";
import CounterReducer from "./CounterReducer";





import postReducers from "./postReducers";
const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  posts: postReducers,
  comments: commentReducers,
  users: userReducers,
  usersphoto: userPhotoReducers,
  productshow: productShowReducers,
  counterreducer: CounterReducer,



});
// export default rootReducer;
export default persistReducer(persistConfig, rootReducer);
export type RootState = ReturnType<typeof rootReducer>;
