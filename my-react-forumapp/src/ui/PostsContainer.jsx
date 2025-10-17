import React from 'react';
import { Box, Typography } from '@mui/material';
import ForumPost from './ForumPost';

export default function PostsContainer({ posts, refreshPosts }) {
  if (!posts || posts.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6" color="text.secondary">
          No discussions yet. Start the conversation!
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {posts.map((post) => (
        <ForumPost
          key={post.id}
          postData={post}
          refreshPosts={refreshPosts}
        />
      ))}
    </Box>
  );
}