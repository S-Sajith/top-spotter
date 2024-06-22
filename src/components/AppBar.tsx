import { Link } from "react-router-dom";
import logo from "../assets/topspotter-high-res-logo-transparent.png";

const AppBar = () => {
  return (
    <div className="bg-greyBg text-white p-3 flex items-center">
      <Link to="/">
        <img src={logo} alt="TopSpotter Logo" className="h-8" />
      </Link>
    </div>
  );
};

export default AppBar;
