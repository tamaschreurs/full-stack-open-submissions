import React from "react";
import { connect } from "react-redux";

const Notification = ({ message }) => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  };

  if (!message) {
    return null;
  }

  return <div style={style}>{message}</div>;
};

const mapStateToProps = (state) => {
  return {
    message: state.message.content,
  };
};

const ConnectedNotification = connect(mapStateToProps)(Notification);

export default ConnectedNotification;
