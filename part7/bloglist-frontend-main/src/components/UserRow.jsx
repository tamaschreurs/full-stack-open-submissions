import React from "react";
import { Link } from "react-router-dom";
const UserRow = ({ name, blogNo, id }) => {
  return (
    <tr>
      <td>
        <Link to={id}>{name}</Link>
      </td>
      <td>{blogNo}</td>
    </tr>
  );
};

export default UserRow;
