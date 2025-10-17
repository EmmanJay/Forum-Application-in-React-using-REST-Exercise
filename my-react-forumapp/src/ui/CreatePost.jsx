import React, { useState } from 'react';
import { Paper, TextField, Button, Box, Typography } from '@mui/material';
import { PostAdd } from '@mui/icons-material';

export default function CreatePost({ onPostSubmit }) {
  const [postContent, setPostContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!postContent.trim()) return;
    onPostSubmit(postContent);
    setPostContent('');
  };

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3, bgcolor: '#e8f5e8' }}>
      <Typography variant="h6" gutterBottom color="#2e7d32">
        Create New Discussion
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          multiline
          rows={3}
          variant="outlined"
          placeholder="Share your thoughts..."
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type="submit"
            variant="contained"
            startIcon={<PostAdd />}
            disabled={!postContent.trim()}
            sx={{ bgcolor: '#2e7d32', '&:hover': { bgcolor: '#1b5e20' } }}
          >
            Publish Post
          </Button>
        </Box>
      </form>
    </Paper>
  );
}