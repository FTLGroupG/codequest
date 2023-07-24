import React from "react";
import "./UserProfile.css";
import { Link } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function UserProfile() {
  return (
    <div className="userProfile">
      <div className="userProfileName">
        <h3>FuzzyMonkey99</h3>
        <img src="/src/assets/profile-icon.png"></img>
      </div>

      <div className="coins">
        <img src="/src/assets/spinning-coin.gif"></img>
        <h3>550 Coins</h3>
      </div>

      <div className="userAnalyticsContainer">
        <div className="userAnalytics">
          <div className="userAnalyticsData">
            <h3>Achievements</h3>
          </div>
        </div>

        <div className="userAnalytics">
          <div className="userAnalyticsData">
            <h3>Badges</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
