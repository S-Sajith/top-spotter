const HeroPage = () => {
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const CLIENT_ID = "5f5e619c62b942069c1ce057f7df59df";
  const REDIRECT_URI = "http://localhost:5173/createPlaylists";
  const SCOPES = ["user-top-read", "playlist-modify-public"];

  const handleLogin = () => {
    window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES.join(
      "%20"
    )}&response_type=token&show_dialog=false`;
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        Login to discover your most played Spotify tracks, and save them
        straight into a playlist.
      </div>
      <button
        onClick={handleLogin}
        className="bg-green-500 text-white p-4 rounded"
      >
        Login
      </button>
    </div>
  );
};

export default HeroPage;
