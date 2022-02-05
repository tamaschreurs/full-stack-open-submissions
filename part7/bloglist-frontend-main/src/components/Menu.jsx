import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";

const Menu = ({ name, handleLogout }) => {
  return (
    <AppBar>
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          blogs
        </Button>
        <Box sx={{ flexGrow: 1 }}>
          <Button color="inherit" component={Link} to="/users">
            users
          </Button>
        </Box>
        <Typography
          sx={{ mr: 3 }}
          variant="overline"
        >{`Current user: ${name}`}</Typography>
        <Button color="inherit" onClick={handleLogout}>
          log out
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Menu;
