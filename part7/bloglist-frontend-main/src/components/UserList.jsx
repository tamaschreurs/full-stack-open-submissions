import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import UserRow from "./UserRow";
import { initUsers } from "../reducers/userInfoReducer";

const UserList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initUsers());
  }, []);

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
              blogNo={user.blogs.length}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
