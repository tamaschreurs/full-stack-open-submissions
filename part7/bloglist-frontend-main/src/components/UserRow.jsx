import React from "react";

const UserRow = ({ name, blogNo }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{blogNo}</td>
    </tr>
  );
};

export default UserRow;
