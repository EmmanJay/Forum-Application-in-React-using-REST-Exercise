import axios from "axios";

const API_BASE = "http://hyeumine.com/";

const apiClient = {
  registerUser: async (username, password) => {
    try {
      console.log('Sending registration:', { username, password });
      
      // Create URLSearchParams for proper form data
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);
      
      const response = await axios.post(`${API_BASE}forumCreateUser.php`, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        timeout: 10000,
      });
      
      console.log('Registration response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Registration error details:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
      }
      throw error;
    }
  },

  signInUser: async (username, password) => {
    try {
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);
      
      const response = await axios.post(`${API_BASE}forumLogin.php`, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      
      console.log('Login response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  fetchPosts: async (page = 1) => {
    try {
      const response = await axios.get(`${API_BASE}forumGetPosts.php?page=${page}`);
      return response.data;
    } catch (error) {
      console.error('Fetch posts error:', error);
      throw error;
    }
  },

  createPost: async (userId, content) => {
    try {
      const formData = new URLSearchParams();
      formData.append('id', userId);
      formData.append('post', content);
      
      const response = await axios.post(`${API_BASE}forumNewPost.php`, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Create post error:', error);
      throw error;
    }
  },

  removePost: async (postId) => {
    try {
      const response = await axios.get(`${API_BASE}forumDeletePost.php?id=${postId}`);
      return response.data;
    } catch (error) {
      console.error('Delete post error:', error);
      throw error;
    }
  },

  addComment: async (userId, postId, comment) => {
    try {
      const formData = new URLSearchParams();
      formData.append('user_id', userId);
      formData.append('post_id', postId);
      formData.append('reply', comment);
      
      const response = await axios.post(`${API_BASE}forumReplyPost.php`, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Add comment error:', error);
      throw error;
    }
  },

  removeComment: async (commentId) => {
    try {
      const response = await axios.get(`${API_BASE}forumDeleteReply.php?id=${commentId}`);
      return response.data;
    } catch (error) {
      console.error('Remove comment error:', error);
      throw error;
    }
  }
};

export default apiClient;