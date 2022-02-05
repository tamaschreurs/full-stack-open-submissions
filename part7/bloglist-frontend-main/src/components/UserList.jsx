import React from "react";
import { useSelector } from "react-redux";
import UserRow from "./UserRow";

const UserList = () => {
  const { users } = useSelector((state) => state);

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <td></td>
            <td>blogs created</td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserRow
              key={user.id}
              name={user.name}
              id={user.id}
              blogNo={user.blogs.length}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
