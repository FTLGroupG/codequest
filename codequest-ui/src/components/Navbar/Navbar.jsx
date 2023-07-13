import React from "react";
import "./Navbar.css";
import apiClient from "../../services/apiClient";
import { Link } from "react-router-dom";

export default function Navbar(props) {
  const handleLoggedIn = () => {
    localStorage.removeItem(apiClient.tokenName);
  };

  const handleOnClickLogout = () => {
    props.handleOnLogout();
  };

  return (
    <div className="Navbar">
      <div className="content">
        <div className="logo">
          <Link to="/">
            <img
              src="http://codepath-lifetracker.surge.sh/static/media/codepath.70a9a31f.svg"
              alt="logo"
            />
          </Link>
        </div>
        <ul className="links">
          <li>
            <Link to="/modules">Modules</Link>
          </li>
          {!props?.user?.email ? (
            <>
              <li>
                <Link to="/login">Log In</Link>
              </li>

              <li>
                <Link to="/register">Sign Up</Link>
              </li>
            </>
          ) : (
            <Link to="/">
              <button
                type="button"
                className="nav-btn-content"
                onClick={(e) => handleOnClickLogout()}
              >
                Log Out
              </button>
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
}
