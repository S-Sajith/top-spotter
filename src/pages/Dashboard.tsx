import React, { useEffect, useState } from "react";
import {
  getUserTopTracks,
  createPlaylist,
  getUserProfile,
} from "../services/spotify";
import { useNavigate } from "react-router-dom";
import spotifyIcon from "../assets/Spotify_Icon_CMYK_White.png";

interface Track {
  id: string;
  name: string;
  artists: { name: string; id: string; external_urls: { spotify: string } }[];
  uri: string;
  album: {
    images: { url: string }[];
  };
  preview_url?: string;
  duration_ms: number;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const accessToken = localStorage.getItem("spotify_access_token");
    if (accessToken) {
      navigate("/createPlaylists");
    }
  }, []);

  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [timeRange, setTimeRange] = useState("short_term");
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await getUserProfile();
        setUserId(profile.id);
      } catch (error) {
        alert("Failed to load user profile.");
      }
    };

    const fetchTopTracks = async () => {
      try {
        const tracks = await getUserTopTracks(timeRange);
        setTopTracks(tracks);
      } catch (error) {
        alert("Failed to load top tracks.");
      }
    };

    fetchUserProfile();
    fetchTopTracks();
  }, [timeRange]);

  const handleCreatePlaylist = async () => {
    if (!userId) {
      alert("User ID is not available.");
      return;
    }

    try {
      const trackUris = topTracks.map((track) => track.uri);
      const playlistId = await createPlaylist(
        userId,
        "My Top Tracks Playlist",
        trackUris
      );
      alert(`Playlist created! ID: ${playlistId}`);
    } catch (error) {
      alert("Failed to create playlist.");
    }
  };

  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audio) {
      const newAudio = new Audio();
      setAudio(newAudio);
    }

    return () => {
      if (audio) {
        audio.pause();
        audio.src = "";
        setAudio(null);
      }
    };
  }, [audio]);

  const handlePlayPause = (trackId: string, previewUrl: string) => {
    if (!audio) return;

    if (playingTrackId === trackId) {
      audio.pause();
      setPlayingTrackId(null);
    } else {
      audio.src = previewUrl;
      audio.play();
      setPlayingTrackId(trackId);
    }
  };

  function formatDuration(ms: number) {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${parseInt(seconds) < 10 ? "0" : ""}${seconds}`;
  }

  return (
    <div className="p-4 relative h-full" role="main">
      <div className="flex flex-col items-start mb-4 md:flex-row md:justify-between">
        <h1 className="text-2xl font-bold text-white">Your Top Tracks</h1>
        <div className="flex mt-3 md:mt-0">
          <button
            className="bg-greyBg text-white p-2 rounded-full mr-2 text-xs"
            onClick={() => setTimeRange("short_term")}
            style={{
              backgroundColor: timeRange === "short_term" ? "#7F00FF" : "",
            }}
            aria-label="View top tracks from last month"
          >
            LAST MONTH
          </button>
          <button
            className="bg-greyBg text-white p-2 rounded-full mr-2 text-xs"
            onClick={() => setTimeRange("medium_term")}
            style={{
              backgroundColor: timeRange === "medium_term" ? "#7F00FF" : "",
            }}
            aria-label="View top tracks from last 6 months"
          >
            LAST 6 MONTHS
          </button>
          <button
            className="bg-greyBg text-white p-2 rounded-full text-xs"
            onClick={() => setTimeRange("long_term")}
            style={{
              backgroundColor: timeRange === "long_term" ? "#7F00FF" : "",
            }}
            aria-label="View top tracks of all time"
          >
            ALL TIME
          </button>
        </div>
      </div>
      <ul
        className="max-h-[70vh] overflow-y-auto divide-y divide-gray-300"
        style={{ scrollbarWidth: "thin", msOverflowStyle: "none" }}
        aria-live="polite"
      >
        <style>
          {`
            ul::-webkit-scrollbar {
              width: 7px;
            }
            ul::-webkit-scrollbar-track {
              background: #2d2d2d;
            }
            ul::-webkit-scrollbar-thumb {
              background-color: #555;
              border-radius: 10px;
              border: 2px solid #2d2d2d;
            }
          `}
        </style>
        {topTracks.map((track) => (
          <li key={track.id} className="flex items-center p-3 bg-greyBg">
            <div className="flex items-center space-x-4 flex-grow">
              <img
                src={track.album.images[1].url}
                alt={`${track.name} album art`}
                className="w-16 h-16 mr-0.5 md:mr-4"
              />
              <div className="flex flex-col flex-grow">
                <span className="text-sm text-whiteColor font-semibold mb-1">
                  {track.name}
                </span>
                <span className="text-xs text-gray-500 mb-1">
                  {track.artists.map((artist) => (
                    <React.Fragment key={artist.id}>
                      <a
                        href={artist.external_urls.spotify}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {artist.name}
                      </a>
                      {track.artists.length > 1 && ", "}
                    </React.Fragment>
                  ))}
                </span>
                <a
                  href={`https://open.spotify.com/track/${track.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-whiteColor hover:underline text-xs"
                  aria-label={`Listen to ${track.name} on Spotify`}
                >
                  <img
                    src={spotifyIcon}
                    alt="Spotify logo"
                    className="inline-block w-4 h-4 mr-1"
                    style={{ width: "21px", height: "21px" }}
                  />
                  Listen on Spotify
                </a>
              </div>
            </div>
            <div className="flex items-center ml-auto space-x-4">
              <span className="text-xs text-gray-400">
                {formatDuration(track.duration_ms)}
              </span>
              {track.preview_url && (
                <button
                  className={`bg-brandPurple rounded-full p-2 ${
                    playingTrackId === track.id ? "opacity-50" : ""
                  }`}
                  onClick={() =>
                    handlePlayPause(track.id, track.preview_url || "")
                  }
                  title={
                    playingTrackId === track.id
                      ? "Pause preview"
                      : "Play preview"
                  }
                  aria-label={
                    playingTrackId === track.id
                      ? `Pause preview of ${track.name}`
                      : `Play preview of ${track.name}`
                  }
                >
                  {playingTrackId === track.id ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-pause"
                      width="16"
                      height="16"
                    >
                      <rect x="6" y="4" width="4" height="16"></rect>
                      <rect x="14" y="4" width="4" height="16"></rect>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-play"
                      width="16"
                      height="16"
                    >
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  )}
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>

      <button
        onClick={handleCreatePlaylist}
        className="bg-brandPurple text-white p-2 rounded-full mt-4 absolute -bottom-8 right-4"
        aria-label="Create a playlist with your top tracks"
      >
        Create Playlist
      </button>
    </div>
  );
};

export default Dashboard;
