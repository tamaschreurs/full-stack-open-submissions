import { useMutation } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { LOGIN } from "../utils/queries";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [logIn, result] = useMutation(LOGIN);

  const handleSubmit = (event) => {
    event.preventDefault();

    const username = event.target.username.value;
    const password = event.target.password.value;

    logIn({ variables: { username, password } });
    setUsername("");
    setPassword("");
  };

  const setToken = props.setToken;
  const setPage = props.setPage;

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("user-token", token);
      setPage("authors");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data]);

  if (!props.show) {
    return null;
  }

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={handleSubmit}>
        username:
        <input
          type="text"
          value={username}
          name="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        password:
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button>log in</button>
      </form>
    </div>
  );
};

export default Login;
