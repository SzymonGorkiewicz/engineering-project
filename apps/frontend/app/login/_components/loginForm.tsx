'use client'
import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Container,
  TextField,
  Typography,
  CssBaseline,
  Paper,
  Link,
} from '@mui/material';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import { useRouter } from 'next/navigation';

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string| null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper elevation={3} sx={{ p: 4, mt: 8, borderRadius: 2 }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOpenOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Typography variant="body1">
            Doesn&apost have an account?{' '}
            <Link href="/register" onClick={()=> router.push('/register')} underline="hover" color="primary">
                Sign Up
            </Link>
            </Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
