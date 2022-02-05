import { createStore, applyMiddleware, combineReducers } from "redux";
import blogReducer from "./reducers/blogReducer";
import messageReducer from "./reducers/messageReducer";
import userReducer from "./reducers/userReducer";
import userInfoReducer from "./reducers/userInfoReducer";
import thunk from "redux-thunk";

const reducer = combineReducers({
  blogs: blogReducer,
  message: messageReducer,
  user: userReducer,
  users: userInfoReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
