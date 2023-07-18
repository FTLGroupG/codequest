import React from "react";
import "./Navbar.css";
import apiClient from "../../services/apiClient";
import { Link } from "react-router-dom";

export default function Navbar(props) {
  const handleOnClickLogout = () => {
    props.handleOnLogout();
  };

  return (
    <div className="Navbar">
      <div className="content">
        <div className="logo">
          <Link to="/">
            <img
              src="/src/assets/codequest-logo2.png"
              alt="logo"
              width="100px"
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

              <li className="signUp">
                <Link to="/register">Sign Up</Link>
              </li>
            </>
          ) : (
            <Link to="/login">
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
