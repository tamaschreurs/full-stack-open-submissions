import React from "react";
import { Link } from "react-router-dom";
import { TableRow, TableCell } from "@mui/material";

const UserRow = ({ name, blogNo, id }) => {
  return (
    <TableRow>
      <TableCell>
        <Link to={id}>{name}</Link>
      </TableCell>
      <TableCell>{blogNo}</TableCell>
    </TableRow>
  );
};

export default UserRow;
