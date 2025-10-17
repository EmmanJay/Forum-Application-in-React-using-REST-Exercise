import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { AccountCircle, ExitToApp } from '@mui/icons-material';
import { UserContext } from '../auth/UserContext';

export default function AppHeader() {
  const { currentUser, userLogout } = useContext(UserContext);

  return (
    <AppBar position="static" sx={{ bgcolor: '#2e7d32' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          Community Forum
        </Typography>
        {currentUser && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AccountCircle />
              <Typography variant="body1">
                {currentUser.username}
              </Typography>
            </Box>
            <Button
              color="inherit"
              startIcon={<ExitToApp />}
              onClick={userLogout}
              sx={{ border: '1px solid rgba(255,255,255,0.3)' }}
            >
              Sign Out
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}