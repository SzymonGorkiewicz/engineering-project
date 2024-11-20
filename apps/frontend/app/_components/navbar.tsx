import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';
import axios from "axios"
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await axios.post(`${BACKEND_URL}auth/logout`,{},{withCredentials: true})
      router.push('/login')
    }catch(error){
      console.error("Error while logging out")
    }
    
  }

  return (
    <AppBar position="static" sx={{marginBottom:5 ,borderBottom:2, borderColor:'gray'}}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link href="/homepage" passHref>
            <Button color="inherit">LifeTrack</Button>
          </Link>
          <Link href="/statistics" passHref>
            <Button color="secondary" variant='contained'>statistics</Button>
          </Link>
        </Typography>
        <Button variant='contained' color='secondary' onClick={handleLogout}>Logout</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
