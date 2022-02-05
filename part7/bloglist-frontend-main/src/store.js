import { createStore, applyMiddleware, combineReducers } from "redux";
import blogReducer from "./reducers/blogReducer";
import messageReducer from "./reducers/messageReducer";
import userReducer from "./reducers/userReducer";
import thunk from "redux-thunk";

const reducer = combineReducers({
  blogs: blogReducer,
  message: messageReducer,
  user: userReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
