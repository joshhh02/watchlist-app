import apiClient from './apiClient';

export interface LoginRegisterPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    _id: string;
    email: string;
  };
  token: string;
}

export interface Media {
  _id: string;
  title: string;
  type: string;
  releaseYear: number;
  genres: string[];
  posterUrl?: string;
  description?: string;
}

export interface WatchlistItem {
  _id: string;
  mediaTitle: string;
  status: string;
  rating?: number;
}

export interface Comment {
  _id: string;
  userId: string;
  commentText: string;
  rating?: number;
}

export interface AddCommentPayload {
  mediaId: string;
  userId: string;
  commentText: string;
}

export const registerUser = (email: string, password: string) => {
  return apiClient.post<AuthResponse>('auth/register', { email, password });
};

export const loginUser = (email: string, password: string) => {
  return apiClient.post<AuthResponse>('auth/login', { email, password });
};

export const getMedia = () => {
  return apiClient.get<Media[]>('media');
};

export const getMediaById = (id: string) => {
  return apiClient.get<Media>(`media/${id}`);
};

export const getWatchlist = (userId: string) => {
  return apiClient.get<WatchlistItem[]>(`watchlist/${userId}`);
};

export const addToWatchlist = (data: Record<string, unknown>) => {
  return apiClient.post('watchlist', data);
};

export const updateWatchlistItem = (id: string, data: Record<string, unknown>) => {
  return apiClient.put(`watchlist/${id}`, data);
};

export const deleteWatchlistItem = (id: string) => {
  return apiClient.delete(`watchlist/${id}`);
};

export const getComments = (mediaId: string) => {
  return apiClient.get<Comment[]>(`comments/${mediaId}`);
};

export const addComment = (data: AddCommentPayload) => {
  return apiClient.post<Comment>('comments', data);
};
