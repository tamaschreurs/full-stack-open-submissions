const reducer = (state = "", action) => {
  switch (action.type) {
    case "CHANGE":
      return action.data;
    default:
      return state;
  }
};

export const changeFilter = (content) => {
  return {
    type: "CHANGE",
    data: content.toLowerCase(),
  };
};

export default reducer;
