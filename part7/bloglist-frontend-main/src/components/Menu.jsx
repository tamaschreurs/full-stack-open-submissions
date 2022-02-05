import React from "react";
import { Link } from "react-router-dom";

const Menu = ({ name, handleLogout }) => {
  return (
    <div>
      <Link to="/">blogs</Link> <Link to="/users">users</Link>{" "}
      {`${name} is logged in `}
      <button onClick={handleLogout}>log out</button>
    </div>
  );
};

export default Menu;
