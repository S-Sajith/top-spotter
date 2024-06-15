import React, { useEffect, useState } from "react";
import {
  getUserTopTracks,
  createPlaylist,
  getUserProfile,
} from "../services/spotify";
import { useNavigate } from "react-router-dom";

interface Track {
  id: string;
  name: string;
  artists: { name: string }[];
  uri: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/createPlaylists");
  }, []);
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [timeRange, setTimeRange] = useState("short_term");
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      const profile = await getUserProfile();
      setUserId(profile.id);
    };

    const fetchTopTracks = async () => {
      const tracks = await getUserTopTracks(timeRange);
      setTopTracks(tracks);
    };

    fetchUserProfile();
    fetchTopTracks();
  }, [timeRange]);

  const handleCreatePlaylist = async () => {
    if (!userId) {
      alert("User ID is not available.");
      return;
    }

    const trackUris = topTracks.map((track) => track.uri);
    const playlistId = await createPlaylist(
      userId,
      "My Top Tracks Playlist",
      trackUris
    );
    alert(`Playlist created! ID: ${playlistId}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Top Tracks</h1>
      <div className="mb-4">
        <select
          onChange={(e) => setTimeRange(e.target.value)}
          value={timeRange}
        >
          <option value="short_term">Last Month</option>
          <option value="medium_term">Last 6 Months</option>
          <option value="long_term">All Time</option>
        </select>
      </div>
      <ul>
        {topTracks.map((track) => (
          <li key={track.id}>
            {track.name} by{" "}
            {track.artists.map((artist) => artist.name).join(", ")}
          </li>
        ))}
      </ul>
      <button
        onClick={handleCreatePlaylist}
        className="bg-green-500 text-white p-2 rounded mt-4"
      >
        Create Playlist
      </button>
    </div>
  );
};

export default Dashboard;
