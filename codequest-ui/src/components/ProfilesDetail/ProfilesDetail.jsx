import React from "react";
import "./ProfilesDetail.css";
import { useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import apiClient from "../../services/apiClient";
import Loading from "../Loading/Loading";
import NotFound from "../NotFound/NotFound";
import "./ProfilesDetail.css";
import ProfileContext from "../../contexts/profile";
import LottieAnimation from "../AnimationComponent/AnimationComponent";
import animation8 from "/src/assets/coinAnimation.json"

export default function ProfilesDetail({
  user,
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
      navigate("/account-profiles");

      // Update the profiles list in the context after successful deletion
      removeProfile(profileItem.id);
      localStorage.removeItem("selectedProfile");
      localStorage.removeItem("leftOff");
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
      {user.email && !selectedProfile && (
        <Navigate to="/account-profiles" replace={true} />
      )}
      <div className="coins">
        <div className="curriculumCardAnimation">
          <div className="coinAnimation">
            <LottieAnimation animationData={animation8}/>
          </div>
        </div>
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

        <div className="deleteButton">
          <button onClick={handleRemoveProfile}>Delete Profile</button>
        </div>
    </div>
  );
}
