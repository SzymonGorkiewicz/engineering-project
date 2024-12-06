import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";

const DefaultNavBar = () => {
  return (
    <AppBar
      position="static"
      color="primary"
      sx={{ marginBottom: 5, borderBottom: 2, borderColor: "gray" }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link href="/" passHref>
            <Button color="secondary" sx={{ marginRight: 3 }}>
              LifeTrack
            </Button>
          </Link>
        </Typography>
        <Button variant="contained" color="secondary" href="/login">
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default DefaultNavBar;
