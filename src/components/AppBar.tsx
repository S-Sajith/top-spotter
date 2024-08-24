import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/Logo.png";
import logoutIcon from "../assets/logout-icon.svg";

const AppBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("spotify_access_token");
    setIsLoggedIn(accessToken ? true : false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("spotify_access_token");
    navigate("/");
  };

  return (
    <div className="bg-greyBg text-white p-3 flex items-center justify-between">
      <Link to="/">
        <img src={logo} alt="TopTrax Logo" className="h-8" />
      </Link>
      {location.pathname === "/createPlaylists" && isLoggedIn && (
        <button
          onClick={handleLogout}
          className="ml-auto bg-spotifyGreen p-1 rounded cursor-pointer"
          title="Logout"
        >
          <img src={logoutIcon} alt="Logout" className="h-4 w-4 " />
        </button>
      )}
    </div>
  );
};

export default AppBar;
