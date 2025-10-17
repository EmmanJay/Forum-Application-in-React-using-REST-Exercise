import React, { useContext, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Box,
  IconButton,
  Collapse
} from '@mui/material';
import { Delete, Comment, ExpandMore, ExpandLess } from '@mui/icons-material';
import { UserContext } from '../auth/UserContext';
import apiClient from '../lib/apiClient';
import CommentItem from './CommentItem';

export default function ForumPost({ postData, refreshPosts }) {
  const { currentUser } = useContext(UserContext);
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);

  const handleDeletePost = async () => {
    await apiClient.removePost(postData.id);
    refreshPosts();
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    await apiClient.addComment(currentUser.id, postData.id, commentText);
    setCommentText('');
    refreshPosts();
  };

  const commentCount = postData.reply?.length || 0;

  return (
    <Card sx={{ mb: 2, borderLeft: '4px solid', borderLeftColor: '#4caf50' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="h6" gutterBottom>
              {postData.post}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Typography variant="body2" color="primary" fontWeight="bold">
                {postData.user || 'Anonymous'}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {postData.date}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton
              onClick={() => setShowComments(!showComments)}
              color="primary"
              size="small"
            >
              {showComments ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
            
            {currentUser && currentUser.id === postData.uid && (
              <IconButton
                color="error"
                size="small"
                onClick={handleDeletePost}
              >
                <Delete />
              </IconButton>
            )}
          </Box>
        </Box>

        <Button
          startIcon={<Comment />}
          onClick={() => setShowComments(!showComments)}
          variant="outlined"
          size="small"
          sx={{ mb: 2 }}
        >
          {commentCount} {commentCount === 1 ? 'Comment' : 'Comments'}
        </Button>

        <Collapse in={showComments}>
          <Box sx={{ mt: 2 }}>
            {postData.reply?.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                refreshComments={refreshPosts}
              />
            ))}
            
            {currentUser && (
              <form onSubmit={handleAddComment}>
                <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Write a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={!commentText.trim()}
                    sx={{ bgcolor: '#2e7d32' }}
                  >
                    Post
                  </Button>
                </Box>
              </form>
            )}
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  );
}