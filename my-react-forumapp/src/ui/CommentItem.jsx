import React, { useContext } from 'react';
import { Box, Typography, IconButton, Paper } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { UserContext } from '../auth/UserContext';
import apiClient from '../lib/apiClient';

export default function CommentItem({ comment, refreshComments }) {
  const { currentUser } = useContext(UserContext);

  const handleDelete = async () => {
    await apiClient.removeComment(comment.id);
    refreshComments();
  };

  const displayName = comment.user || comment.username || 'Anonymous';
  const canDelete = currentUser && currentUser.id === comment.uid;

  return (
    <Paper 
      variant="outlined" 
      sx={{ 
        p: 2, 
        mb: 1, 
        bgcolor: '#f1f8e9',
        borderLeft: '3px solid',
        borderLeftColor: '#81c784'
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            {comment.reply}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Typography variant="caption" fontWeight="bold" color="#2e7d32">
              {displayName}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {comment.date}
            </Typography>
          </Box>
        </Box>

        {canDelete && (
          <IconButton
            size="small"
            color="error"
            onClick={handleDelete}
            sx={{ ml: 1 }}
          >
            <Delete fontSize="small" />
          </IconButton>
        )}
      </Box>
    </Paper>
  );
}