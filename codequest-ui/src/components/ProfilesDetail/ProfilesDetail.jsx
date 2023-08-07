import React from "react";
import "./ProfilesDetail.css";
import { useState, useContext, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import apiClient from "../../services/apiClient";
import Loading from "../Loading/Loading";
import NotFound from "../NotFound/NotFound";
import "./ProfilesDetail.css";
import AuthContext from "../../contexts/auth";
import ProfileContext from "../../contexts/profile";
import LottieAnimation from "../AnimationComponent/AnimationComponent";
import LottieBackgroundAnimation from "../AnimationBackgroundComponent/AnimationBackgroundComponent";
import animation8 from "/src/assets/newBadgeAnimation.json";
import animation9 from "/src/assets/achievementAnimation.json";
import animation16 from "/src/assets/achievementsBackgroundAnimation.json";
import opened_eye from "/src/assets/open-eye.svg";
import closed_eye from "/src/assets/close-eye.svg";

export default function ProfilesDetail({
  profileItem,
  errors,
  setErrors,
  isLoading,
}) {
  const { userContext } = useContext(AuthContext);
  const [user, setUser] = userContext;

  // Use the context to access profiles state and removeProfile function
  const {
    userProgress,
    setUserProgress,
    profileContext,
    removeProfile,
    setSelectedProfile,
    leftOff,
    setLeftOff,
  } = useContext(ProfileContext);
  const { profiles } = profileContext;
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

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

  const [showConfirmation, setShowConfirmation] = useState(false);
  const showRemoveConfirmation = () => {
    setShowConfirmation(true);
  };

  const handleChange = (event) => {
    setPassword(event.target.value);
    setErrors("");
    setErrorMessage("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // You can now call the handleRemoveProfile function and pass the password data to it
    handleRemoveProfile(password);
  };

  // Function to handle profile removal
  const handleRemoveProfile = async () => {
    try {
      const { data, error } = await apiClient.remove(profileItem.id, password);
      if (error) {
        setErrorMessage(
          "Password doesn't match account password! Please, try again."
        );
      } else {
        // Update the profiles list in the context after successful deletion
        removeProfile(profileItem.id);
        localStorage.removeItem("selectedProfile");
        localStorage.removeItem("leftOff");
        navigate("/account-profiles");
      }
    } catch (error) {
      console.error("Error removing profile:", error);
      setErrors("Error removing profile: ", error);
      // Handle error if needed
    }
    // Redirect to the profiles list after successful removal
  };

  if (isLoading) {
    return <Loading />;
  }

  if (errors) {
    return <NotFound message={errors} />;
  }

  const badges = [
    { number: 1, value: "Data Types" },
    { number: 2, value: "Variables" },
    { number: 3, value: "Conditionals" },
    { number: 4, value: "Lists" },
    { number: 5, value: "Loops" },
    { number: 6, value: "Functions" },
  ];

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="userProfile">
      <div className="animation16">
        <LottieBackgroundAnimation animationData={animation16} />
      </div>
      {user.email && !localStorage.getItem("selectedProfile") && (
        <Navigate to="/account-profiles" replace={true} />
      )}
      {/* <div className="coins">
        <div className="curriculumCardAnimation">
          <div className="coinAnimation">
            <LottieAnimation animationData={animation8} />
          </div>
        </div>
        <h3 className="profilesH3">550 Coins</h3>
      </div> */}

      <div className="userAnalyticsContainer">
        <div className="userAnalytics">
          <div className="userAnalyticsData">
            <h3>Achievements</h3>
            {leftOff === 6 && (
              <>
                <LottieAnimation
                  animationData={animation9}
                  className="achievementAnimation"
                />
                <h2>Quest: Learn Python</h2>
              </>
            )}
          </div>
        </div>

        <div className="userAnalytics">
          <div className="userAnalyticsData">
            <h3>Badges</h3>

            {badges.map(({ number, value }) => {
              // Check if the badge number is less than or equal to the leftOff value
              const badgeCompleted = number <= leftOff;

              return (
                <div key={number} className="badge-item">
                  <h2 className={badgeCompleted ? "gold-badge" : ""}>
                    {value}
                  </h2>
                  <div className="badgeAnimation">
                    {badgeCompleted && (
                      <LottieAnimation animationData={animation8} />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="removeForm-deleteButton">
        <button onClick={showRemoveConfirmation}>Delete Profile</button>
      </div>
      {showConfirmation && (
        <>
          <div className="removeForm-container">
            <form onSubmit={handleSubmit} className="removeForm">
              <div className="removeForm-content">
                <div>
                  <label htmlFor="password">Type password to continue:</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={handleChange}
                    className="removeForm-input-field"
                  />
                  <p className="error" style={{ color: "red" }}>
                    {errorMessage}
                  </p>
                </div>
                <div className="removeForm-passvisibility-icon">
                  <img
                    src={showPassword ? opened_eye : closed_eye}
                    onClick={togglePasswordVisibility}
                  />
                </div>
                <div className="removeForm-confirm-btn">
                  <button type="submit">Confirm Delete</button>
                </div>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
