import React from "react";
import "./ProfilesDetail.css";
import { useContext, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import apiClient from "../../services/apiClient";
import Loading from "../Loading/Loading";
import NotFound from "../NotFound/NotFound";
import "./ProfilesDetail.css";
import ProfileContext from "../../contexts/profile";
import LottieAnimation from "../AnimationComponent/AnimationComponent";
import animation8 from "/src/assets/coinAnimation.json";

export default function ProfilesDetail({
  user,
  profileItem,
  errorMessage,
  isLoading,
}) {
  // Use the context to access profiles state and removeProfile function
  const {
    userProgress,
    setUserProgress,
    profileContext,
    removeProfile,
    selectedProfile,
    setSelectedProfile,
    leftOff,
    setLeftOff,
  } = useContext(ProfileContext);
  const { profiles } = profileContext;
  const navigate = useNavigate();

  /**
   * Fetch data from the backend API for the selected profile.
   * Update the `selectedProfile` and `userProgress` state based on the API response.
   * This effect runs when the `localStorage.getItem("selectedProfile")` changes.
   */
  useEffect(() => {
    const fetchDataAndSetSelectedProfile = async () => {
      try {
        const profileId = localStorage.getItem("selectedProfile");
        const response = await apiClient.fetchData(profileId);
        setSelectedProfile(profileId);
        setUserProgress(response.userprogress);
      } catch (error) {
        // Handle any error that might occur during the API call
        console.error("Error fetching data:", error);
      }
    };

    // Call the new function when 'localStorage.getItem("selectedProfile")'
    if (localStorage.getItem("selectedProfile")) {
      fetchDataAndSetSelectedProfile();
    }
  }, [localStorage.getItem("selectedProfile")]);

  /**
   * Calculate the value for `leftOff` based on the completed modules in `userProgress`.
   * This effect runs whenever the `userProgress` changes.
   */
  useEffect(() => {
    const leftOffValue = Object.values(userProgress)
      .filter((key) => typeof key === "boolean")
      .filter(Boolean).length;
    setLeftOff(leftOffValue);
  }, [userProgress]);

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

  const badges = [
    { number: 1, value: "badge 1" },
    { number: 2, value: "badge 2" },
    { number: 3, value: "badge 3" },
    { number: 4, value: "badge 4" },
    { number: 5, value: "badge 5" },
    { number: 6, value: "badge 6" },
  ];

  return (
    <div className="userProfile">
      {user.email && !localStorage.getItem("selectedProfile") && (
        <Navigate to="/account-profiles" replace={true} />
      )}
      <div className="coins">
        <div className="curriculumCardAnimation">
          <div className="coinAnimation">
            <LottieAnimation animationData={animation8} />
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
            {badges.map(({ number, value }) => {
              if (number <= leftOff) return <h2>{value}</h2>;
            })}
          </div>
        </div>
      </div>

      <div className="deleteButton">
        <button onClick={handleRemoveProfile}>Delete Profile</button>
      </div>
    </div>
  );
}
