import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const message = useSelector((state) => state.message);
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };

  if (!message) {
    return null;
  }

  return <div style={style}>{message.content}</div>;
};

export default Notification;
