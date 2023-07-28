import React from "react";
import "./ProfilesDetail.css";
import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../../services/apiClient";
import Loading from "../Loading/Loading";
import NotFound from "../NotFound/NotFound";
import "./ProfilesDetail.css";
import ProfileContext from "../../contexts/profile";

export default function ProfilesDetail({
  profileItem,
  errorMessage,
  isLoading,
}) {
  // Use the context to access profiles state and removeProfile function
  const { profileContext, removeProfile, selectedProfile, setSelectedProfile } =
    useContext(ProfileContext);
  const { profiles } = profileContext;
  const navigate = useNavigate();

  // Function to handle profile removal
  const handleRemoveProfile = async () => {
    try {
      await apiClient.remove(profileItem.id);
      // Redirect to the profiles list after successful removal
      navigate("/profiles");

      // Update the profiles list in the context after successful deletion
      removeProfile(profileItem.id);
    } catch (error) {
      console.error("Error removing profile:", error);
      // Handle error if needed
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (errorMessage) {
    return <NotFound message={errorMessage} />;
  }

  return (
    <div className="userProfile">
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

      {/* Add a button to remove the profile */}
      <button onClick={handleRemoveProfile}>Delete Profile</button>
    </div>
  );
}
