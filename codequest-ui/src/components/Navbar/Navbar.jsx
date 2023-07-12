import React from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";


export default function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const checkLogin = () => {
    if (!isLoggedIn) {
      setIsClicked(true);
    }
  };

  const handleOnClick = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
    }
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    // Remove the authentication status from localStorage
    localStorage.removeItem("isLoggedIn");
    // Redirect the user to the login page
    navigate("/login");
  };

  
  

  return (
    <div className="Navbar">
      <div className="content">
        <div className="logo">
          <a href="/">
            <img
              src="http://codepath-lifetracker.surge.sh/static/media/codepath.70a9a31f.svg"
              alt="logo"
            />
          </a>
        </div>
        <ul className="links">
          <li onClick={checkLogin}>
            <a href={isLoggedIn ? "/login" : "/login"}>Log In</a>
          </li>

          <li onClick={checkLogin}>
            <a href={isLoggedIn ? "/register" : "/register"}>Sign Up</a>
          </li>
          <li onClick={checkLogin}>
            <a href={isLoggedIn ? "/modules" : "/modules"}>Modules</a>
          </li>
        </ul>
      </div>
    </div>
  );
}