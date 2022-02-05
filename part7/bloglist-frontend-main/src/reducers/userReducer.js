/* eslint-disable indent */
import loginService from "../services/login";

const reducer = (state = null, action) => {
  switch (action.type) {
    case "SET_USER":
      return action.data;
    case "LOGOUT":
      return null;
    default:
      return state;
  }
};

export const setUserInfo = (info) => {
  return (dispatch) => {
    dispatch({ type: "SET_USER", data: info });
  };
};

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username,
        password,
      });
      dispatch({ type: "SET_USER", data: user });
      window.localStorage.setItem("userInfo", JSON.stringify(user));
      return user;
    } catch (exception) {
      return false;
    }
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    dispatch({
      type: "LOGOUT",
    });
  };
};

export default reducer;
