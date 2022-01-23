import { createStore, combineReducers } from "redux";
import anecdoteReducer from "./reducers/anecdoteReducer";
import messageReducer from "./reducers/messageReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  message: messageReducer,
});

const store = createStore(reducer, composeWithDevTools());

export default store;
