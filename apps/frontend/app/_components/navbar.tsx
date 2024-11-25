import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { IconButton } from "@mui/material";
import { useThemeContext } from "./themeContext";

const Navbar = () => {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const router = useRouter();
  const { darkMode, toggleDarkMode } = useThemeContext();

  const handleLogout = async () => {
    try {
      await axios.post(
        `${BACKEND_URL}auth/logout`,
        {},
        { withCredentials: true },
      );
      router.push("/login");
    } catch (error) {
      console.error(error, "Error while logging out");
    }
  };

  return (
    <AppBar
      position="static"
      color="primary"
      sx={{ marginBottom: 5, borderBottom: 2, borderColor: "gray" }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link href="/homepage" passHref>
            <Button color="primary">LifeTrack</Button>
          </Link>
          <Link href="/statistics" passHref>
            <Button color="secondary" variant="contained">
              statistics
            </Button>
          </Link>
        </Typography>
        <IconButton color="inherit" onClick={toggleDarkMode}>
          {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
        <Button variant="contained" color="primary" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
