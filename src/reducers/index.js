import postReducers from "./PostReducer";
import { combineReducers } from "redux";
import { useReducer } from "react";
import usersReducers from "./UsersReducers";

export default combineReducers({
  // dummy: () => "Hi there sending dummy", // dummy values till we make a valid reducer
  posts: postReducers,
  users: usersReducers,
});
