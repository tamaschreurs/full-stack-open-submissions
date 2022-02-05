/* eslint-disable indent */
const reducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_MESSAGE":
      return action.data;
    case "REMOVE":
      clearTimeout(state.timeoutId);
      return {};
    default:
      return state;
  }
};

export const newMessage = (content, type) => {
  return (dispatch) => {
    dispatch({ type: "REMOVE" });
    const timeoutId = setTimeout(() => dispatch({ type: "REMOVE" }), 5000);
    dispatch({
      type: "SET_MESSAGE",
      data: { content, type, timeoutId },
    });
  };
};

export default reducer;
