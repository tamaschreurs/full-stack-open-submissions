import React from "react";
import { TextField, Button } from "@mui/material";

const LoginForm = ({
  handleLogin,
  username,
  password,
  handlePasswordChange,
  handleUsernameChange,
}) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
        <TextField
          id="username"
          type="text"
          value={username}
          name="Username"
          label="Username"
          onChange={handleUsernameChange}
          autoComplete="off"
        />
      </div>
      <div>
        <TextField
          id="password"
          type="password"
          value={password}
          name="Password"
          label="Password"
          onChange={handlePasswordChange}
        />
      </div>
      <Button type="submit">login</Button>
    </form>
  );
};

export default LoginForm;
