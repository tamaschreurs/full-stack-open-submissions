const reducer = (state = null, action) => {
  switch (action.type) {
    case "CREATE":
      return action.data;
    case "REMOVE":
      return null;
    default:
      return state;
  }
};

export const createMessage = (content, timeoutId) => {
  return {
    type: "CREATE",
    data: { content, timeoutId },
  };
};

export const removeMessage = () => {
  return {
    type: "REMOVE",
  };
};

export default reducer;
