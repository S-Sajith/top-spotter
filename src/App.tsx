import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppBar from "./components/AppBar";
import Footer from "./components/Footer";
import HeroPage from "./pages/HeroPage";
import Dashboard from "./pages/Dashboard";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("spotify_access_token");

    if (!token && hash) {
      token =
        hash
          .substring(1)
          .split("&")
          .find((elem) => elem.startsWith("access_token"))
          ?.split("=")[1] || "";
      window.location.hash = "";
      window.localStorage.setItem("spotify_access_token", token);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-customBg font-sans">
      <BrowserRouter>
        <AppBar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HeroPage />} />
            <Route path="/createPlaylists" element={<Dashboard />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
