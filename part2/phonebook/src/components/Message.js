import React from "react";

const Message = ({ message, type }) => {
  if (message === null) {
    return null;
  }

  return <div className={type}>{message}</div>;
};

export default Message;
