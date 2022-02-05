import React from "react";
import { List, ListItem, ListItemText, Paper, Box } from "@mui/material";

const UserDetails = ({ user }) => {
  if (!user) {
    return null;
  }
  return (
    <div>
      <h2>{user.name}</h2>

      <Box sx={{ width: "fit-content" }}>
        <h3>added blogs</h3>
        <Paper>
          <List dense={true}>
            {user.blogs.map((blog) => (
              <ListItem key={blog.id}>
                <ListItemText>{blog.title}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </div>
  );
};

export default UserDetails;
