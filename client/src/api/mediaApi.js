import apiClient from './apiClient';

export const registerUser = (email, password) => {
  return apiClient.post('auth/register', { email, password });
};

export const loginUser = (email, password) => {
  return apiClient.post('auth/login', { email, password });
};

export const getMedia = () => {
  return apiClient.get('media');
};

export const getMediaById = (id) => {
  return apiClient.get(`media/${id}`);
};

export const getWatchlist = (userId) => {
  return apiClient.get(`watchlist/${userId}`);
};

export const addToWatchlist = (data) => {
  return apiClient.post('watchlist', data);
};

export const updateWatchlistItem = (id, data) => {
  return apiClient.put(`watchlist/${id}`, data);
};

export const deleteWatchlistItem = (id) => {
  return apiClient.delete(`watchlist/${id}`);
};

export const getComments = (mediaId) => {
  return apiClient.get(`comments/${mediaId}`);
};

export const addComment = (data) => {
  return apiClient.post('comments', data);
};
