const messageAtStart = "Notification goes here";

const reducer = (state = messageAtStart, action) => {
  switch (action.type) {
    case "SHOW":
      return state;
    default:
      return state;
  }
};

export default reducer;
