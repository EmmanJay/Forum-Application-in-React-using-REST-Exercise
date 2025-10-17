import React, { useState, useContext } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Link
} from '@mui/material';
import { Login } from '@mui/icons-material';
import { UserContext } from '../auth/UserContext';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import apiClient from '../lib/apiClient';

export default function SignIn() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { userLogin } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await apiClient.signInUser(credentials.username, credentials.password);
      
      console.log('Login API response:', result); // Add this to see the actual response
      
      // Handle the nested user object in the response
      if (result && result.success && result.user && result.user.id) {
        userLogin(result.user); // Pass the user object, not the entire result
        navigate('/');
      } else if (result && result.user && result.user.id) {
        // Also handle case where success might be missing but user data exists
        userLogin(result.user);
        navigate('/');
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Sign in failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4, bgcolor: '#f8fffc' }}>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Login sx={{ fontSize: 48, color: '#2e7d32', mb: 2 }} />
          <Typography variant="h4" gutterBottom color="#2e7d32">
            Welcome Back
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Sign in to your account
          </Typography>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            margin="normal"
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            required
            disabled={isLoading}
          />
          
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            required
            disabled={isLoading}
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={isLoading}
            sx={{ 
              mt: 3, 
              mb: 2,
              bgcolor: '#2e7d32',
              '&:hover': { bgcolor: '#1b5e20' },
              py: 1.5
            }}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>

        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Typography variant="body2">
            Don't have an account?{' '}
            <Link component={RouterLink} to="/signup" color="#2e7d32" fontWeight="bold">
              Create one here
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}