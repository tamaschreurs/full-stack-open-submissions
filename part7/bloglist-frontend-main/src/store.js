import { createStore, applyMiddleware } from "redux";
import blogReducer from "./reducers/blogReducer";
import thunk from "redux-thunk";

const reducer = blogReducer;

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
