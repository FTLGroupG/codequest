import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="Footer">
      <div className="content">
        <Link to="/">
          <img src="/src/assets/codequest-logo.png" alt="logo" width="100px" />
        </Link>
        <h3>Copyright © 2023</h3>
        <h3>Privacy Policy</h3>
      </div>
    </div>
  );
}
