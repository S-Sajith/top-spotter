const HeroPage = () => {
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const CLIENT_ID = "5f5e619c62b942069c1ce057f7df59df";
  const REDIRECT_URI = "http://localhost:5173/createPlaylists";
  const SCOPES = [
    "user-top-read",
    "playlist-modify-public",
    "playlist-modify-private",
  ];

  const handleLogin = () => {
    window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES.join(
      "%20"
    )}&response_type=token&show_dialog=false`;
  };

  return (
    <div className="flex flex-col justify-center items-center h-full text-center md:text-start">
      <div className="font-semibold text-white text-3xl md:text-5xl mb-8 w-7/12 mt-[20vh] md:mt-[25vh]">
        Login to discover your{" "}
        <span className="text-spotifyGreen">most played</span>{" "}
        <span className="text-spotifyGreen">Spotify </span>tracks, and save them
        straight into a <span className="text-spotifyGreen">playlist</span>.
      </div>
      <button
        onClick={handleLogin}
        className="bg-spotifyGreen text-white p-4 rounded-full text-lg font-semibold md:self-start md:ml-[20vw]"
      >
        Connect to Spotify
      </button>
    </div>
  );
};

export default HeroPage;
