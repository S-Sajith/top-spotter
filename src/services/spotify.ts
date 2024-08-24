import axios, { AxiosError } from 'axios';

const SPOTIFY_BASE_URL = 'https://api.spotify.com/v1';
const ACCESS_TOKEN_KEY = 'spotify_access_token';

const getAccessToken = (): string | null => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

const removeAccessToken = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
};

const axiosInstance = axios.create({
  baseURL: SPOTIFY_BASE_URL,
});

axiosInstance.interceptors.request.use(config => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      removeAccessToken();
      window.location.href = '/';
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export const getUserProfile = async (): Promise<{ id: string }> => {
  try {
    const response = await axiosInstance.get('/me');
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getUserTopTracks = async (timeRange: string): Promise<any[]> => {
  try {
    const response = await axiosInstance.get('/me/top/tracks', {
      params: {
        limit: 50,
        time_range: timeRange,
      },
    });
    return response.data.items;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createPlaylist = async (userId: string, name: string, trackUris: string[]): Promise<string> => {
  try {
    const playlistResponse = await axiosInstance.post(`/users/${userId}/playlists`, {
      name: name,
      description: 'Playlist created by TopTrax',
      public: false,
    });

    const playlistId = playlistResponse.data.id;

    await axiosInstance.post(`/playlists/${playlistId}/tracks`, {
      uris: trackUris,
    });

    return playlistId;
  } catch (error) {
    return Promise.reject(error);
  }
};

