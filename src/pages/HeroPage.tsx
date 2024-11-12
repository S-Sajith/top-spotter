import SpotifyLogo from "../assets/Spotify_Logo_CMYK_White.png";
import spotifyIcon from "../assets/Spotify_Icon_CMYK_White.png";

const HeroPage = () => {
  const AUTH_ENDPOINT = import.meta.env.VITE_AUTH_ENDPOINT;
  const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
  const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URL;
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
      <div
        className="font-semibold text-white mb-8 w-7/12 mt-[20vh] md:mt-[25vh]"
        style={{ fontSize: "clamp(2rem, 5vw, 3rem)", lineHeight: "1.2" }}
      >
        Login to discover your{" "}
        <span className="text-brandPurple">most played</span> tracks, and save
        them straight into a <span className="text-brandPurple">playlist</span>{" "}
        on{" "}
        <img
          src={SpotifyLogo}
          alt="Spotify Logo"
          className="inline-block align-middle mt-1.5 md:mt-0"
          style={{ height: "70px", width: "auto" }}
        />
      </div>

      <button
        onClick={handleLogin}
        className="bg-brandPurple text-white p-4 rounded-full flex items-center md:self-start md:ml-[20vw]"
      >
        <img
          src={spotifyIcon}
          alt="Spotify logo"
          className="inline-block w-4 h-4 mr-1"
          style={{ width: "25px", height: "25px" }}
        />
        <span className="text-lg font-semibold">Connect to Spotify</span>
      </button>
    </div>
  );
};

export default HeroPage;
