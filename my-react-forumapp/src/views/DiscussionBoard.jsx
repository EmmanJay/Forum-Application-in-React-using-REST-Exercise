import React, { useEffect, useState, useContext } from 'react';
import {
  Container,
  Box,
  Button,
  Typography,
  CircularProgress
} from '@mui/material';
import { NavigateBefore, NavigateNext } from '@mui/icons-material';
import { UserContext } from '../auth/UserContext';
import AppHeader from '../ui/AppHeader';
import PostsContainer from '../ui/PostsContainer';
import CreatePost from '../ui/CreatePost';
import apiClient from '../lib/apiClient';

export default function DiscussionBoard() {
  const { currentUser } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const loadPosts = async (page = 1) => {
    setIsLoading(true);
    try {
      const postsData = await apiClient.fetchPosts(page);
      setPosts(postsData);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPosts(currentPage);
  }, [currentPage]);

  const handleNewPost = async (content) => {
    try {
      await apiClient.createPost(currentUser.id, content);
      loadPosts(currentPage);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <AppHeader />
      <Container maxWidth="md" sx={{ py: 4 }}>
        {currentUser && <CreatePost onPostSubmit={handleNewPost} />}
        
        <Typography variant="h4" gutterBottom sx={{ color: '#2e7d32', mb: 3 }}>
          Community Discussions
        </Typography>

        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress sx={{ color: '#2e7d32' }} />
          </Box>
        ) : (
          <PostsContainer posts={posts} refreshPosts={() => loadPosts(currentPage)} />
        )}

        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mt: 4 }}>
          <Button
            variant="outlined"
            startIcon={<NavigateBefore />}
            onClick={() => setCurrentPage(p => p - 1)}
            disabled={currentPage <= 1}
            sx={{ color: '#2e7d32', borderColor: '#2e7d32' }}
          >
            Previous
          </Button>
          
          <Typography variant="body1" sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
            Page {currentPage}
          </Typography>
          
          <Button
            variant="outlined"
            endIcon={<NavigateNext />}
            onClick={() => setCurrentPage(p => p + 1)}
            sx={{ color: '#2e7d32', borderColor: '#2e7d32' }}
          >
            Next
          </Button>
        </Box>
      </Container>
    </Box>
  );
}