const reducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_CONTENT":
      return { ...state, content: action.data };
    case "SET_TIMEOUTID":
      return { ...state, timeoutId: action.data };
    case "CLEAR_TIMEOUTID":
      window.clearTimeout(state.timeoutId);
      return { ...state, timeoutId: null };
    case "CLEAR_MESSAGE":
      return {};
    default:
      return state;
  }
};

export const setMessage = (content, duration) => {
  return (dispatch) => {
    dispatch({ type: "CLEAR_TIMEOUTID" });
    dispatch({ type: "SET_CONTENT", data: content });
    const timeoutId = setTimeout(
      () => dispatch({ type: "CLEAR_MESSAGE" }),
      duration * 1000
    );
    dispatch({ type: "SET_TIMEOUTID", data: timeoutId });
  };
};

export default reducer;
