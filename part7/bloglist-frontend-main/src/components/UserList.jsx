import React from "react";
import { useSelector } from "react-redux";
import UserRow from "./UserRow";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Paper,
} from "@mui/material";

const UserList = () => {
  const { users } = useSelector((state) => state);

  return (
    <div>
      <h2>Users</h2>
      <Box sx={{ width: "25%" }}>
        <Paper>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>blogs created</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <UserRow
                    key={user.id}
                    name={user.name}
                    id={user.id}
                    blogNo={user.blogs.length}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </div>
  );
};

export default UserList;
