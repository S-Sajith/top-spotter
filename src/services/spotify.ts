import axios from 'axios';

const SPOTIFY_BASE_URL = 'https://api.spotify.com/v1';

const getAccessToken = (): string | null => {
  return localStorage.getItem('spotify_access_token');
};

export const getUserProfile = async (): Promise<{ id: string }> => {
  const token = getAccessToken();
  const response = await axios.get(`${SPOTIFY_BASE_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const getUserTopTracks = async (timeRange: string): Promise<any[]> => {
  const token = getAccessToken();
  const response = await axios.get(`${SPOTIFY_BASE_URL}/me/top/tracks`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: {
      limit: 50,
      time_range: timeRange
    }
  });
  return response.data.items;
};

export const createPlaylist = async (userId: string, name: string, trackUris: string[]): Promise<string> => {
  const token = getAccessToken();
  const playlistResponse = await axios.post(`${SPOTIFY_BASE_URL}/users/${userId}/playlists`, {
    name: name,
    description: 'Playlist created by SpottyPlaylist',
    public: false
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const playlistId = playlistResponse.data.id;

  await axios.post(`${SPOTIFY_BASE_URL}/playlists/${playlistId}/tracks`, {
    uris: trackUris
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return playlistId;
};
