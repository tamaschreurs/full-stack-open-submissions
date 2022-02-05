import React from "react";
import { Alert } from "@mui/material";

const Message = ({ message, type }) => {
  if (!message) {
    return null;
  }

  return <Alert severity={type}>{message}</Alert>;
};

export default Message;
