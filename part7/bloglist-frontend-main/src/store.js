import { createStore, applyMiddleware, combineReducers } from "redux";
import blogReducer from "./reducers/blogReducer";
import messageReducer from "./reducers/messageReducer";
import thunk from "redux-thunk";

const reducer = combineReducers({
  blogs: blogReducer,
  message: messageReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
