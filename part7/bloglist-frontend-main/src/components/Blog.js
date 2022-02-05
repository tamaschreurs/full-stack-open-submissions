import React from "react";
import { Link } from "react-router-dom";
import { TableCell, TableRow } from "@mui/material";

const Blog = ({ blog }) => {
  return (
    <TableRow>
      <TableCell component={Link} to={`/blogs/${blog.id}`}>
        {blog.title}
      </TableCell>
      <TableCell sx={{ textAlign: "right" }}>{blog.author}</TableCell>
    </TableRow>
  );
};

export default Blog;
