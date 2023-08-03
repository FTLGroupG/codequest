import React from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar(props) {
  const navigate = useNavigate();
  const handleOnClickLogout = () => {
    props.handleOnLogout();
    navigate("/");
    navigate(0);
  };

  return (
    <div className="Navbar">
      <div className="content">
        <div className="logo">
          <Link to={props?.user?.email ? `/modules` : `/`}>
            <img
              src="/src/assets/codequest-logo2.png"
              alt="logo"
              width="100px"
            />
          </Link>
        </div>
        <ul className="links">
          {!props?.user?.email ? (
            <>
              <li>
                <Link to="/modules">Modules</Link>
              </li>
              <li>
                <Link to="/login">Log In</Link>
              </li>

              <li className="signUp">
                <Link to="/register">Sign Up</Link>
              </li>
            </>
          ) : (
            <>
              {localStorage.getItem("selectedProfile") && (
                <li>
                  <Link to="/modules">Modules</Link>
                </li>
              )}
              <li>
                <Link to="/account-profiles">Profiles</Link>
              </li>

              <button
                type="button"
                className="nav-btn-content"
                onClick={(e) => handleOnClickLogout()}
              >
                Log Out
              </button>
              {localStorage.getItem("selectedProfile") && (
                <li className="nav-userProfileName">
                  <Link
                    className="nav-userProfileName-content"
                    to={`/profiles/id/${props.profileItem.id}`}
                  >
                    <img src={props.profileItem.profile_img} />
                    <h2>{props.profileItem.first_name}</h2>
                  </Link>
                </li>
              )}
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
