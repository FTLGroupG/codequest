import React, { useContext, useEffect, useState } from "react";
import "./Modules.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Finished from "../Finished/Finished";
import Quiz from "../Quiz/Quiz";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthContext from "../../contexts/auth";
import ProfileContext from "../../contexts/profile";
import apiClient from "../../services/apiClient";

/**
 * Modules component displays the learning modules for a selected profile.
 * It fetches the userProgress data for the selected profile from the backend API.
 * It calculates the `leftOff` value based on the completed modules in `userProgress`.
 * The selectedProfileId is retrieved from the URL query parameter 'selectedProfile'.
 * The leftOff value is stored in localStorage to persist the user progress.
 */
export default function Modules() {
  // User context from AuthContext
  const { userContext } = useContext(AuthContext);
  const [user, setUser] = userContext;

  // Profile context from ProfileContext
  const {
    selectedProfile,
    setSelectedProfile,
    userProgress,
    setUserProgress,
    leftOff,
    setLeftOff,
  } = useContext(ProfileContext);

  // State to control when to show content
  const [showContent, setShowContent] = useState(false);

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

  /**
   * Fetch the `selectedProfile` from the URL query parameter 'selectedProfile'.
   * Update the `selectedProfile` state and store it in localStorage.
   * This effect runs when the URL query parameter 'selectedProfile' or the `setSelectedProfile` function changes.
   */
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const selectedProfile = searchParams.get("selectedProfile");
    if (selectedProfile) {
      setSelectedProfile(parseInt(selectedProfile, 10));
      localStorage.setItem("selectedProfile", selectedProfile);

      // setTimeout(() => {
      //   setShowContent(true);
      // }, 100);
    }
  }, [location.search, setSelectedProfile]);

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
   * Store the `leftOff` value in localStorage to persist user progress.
   * This effect runs whenever the `leftOff` changes.
   */
  useEffect(() => {
    if (leftOff) {
      localStorage.setItem("leftOff", leftOff);
    }
    setLeftOff(localStorage.getItem("leftOff"));
  }, [leftOff]);

  return (
    <div className="Modules">
      <div className="moduleCard">
        {showContent && leftOff
          ? user?.email &&
            (leftOff === 6 ? (
              <Navigate to={`/modules`} replace={true} />
            ) : (
              <Navigate
                to={`/modules/${parseInt(leftOff) + 1}/curriculum`}
                replace={true}
              />
            ))
          : null}
        <h1>Learn Python</h1>
        <div className="moduleCircles">
          <Link to={`/modules/1/curriculum`}>
            <span
              className={`module-1 circle ${1 <= leftOff ? "completed" : ""}`}
            >
              <h4>Data Types</h4>
            </span>
          </Link>
          <Link to={`/modules/2/curriculum`}>
            <span
              className={`module-2 circle ${2 <= leftOff ? "completed" : ""}`}
            >
              <h4>Variables</h4>
            </span>
          </Link>
          <Link to={`/modules/3/curriculum`}>
            <span
              className={`module-3 circle ${3 <= leftOff ? "completed" : ""}`}
            >
              <h4>Conditionals</h4>
            </span>
          </Link>
          <Link to={`/modules/4/curriculum`}>
            <span
              className={`module-4 circle ${4 <= leftOff ? "completed" : ""}`}
            >
              <h4>Lists</h4>
            </span>
          </Link>
          <Link to={`/modules/5/curriculum`}>
            <span
              className={`module-5 circle ${5 <= leftOff ? "completed" : ""}`}
            >
              <h4>Loops</h4>
            </span>
          </Link>
          <Link to={`/modules/6/curriculum`}>
            <span
              className={`module-6 circle ${6 <= leftOff ? "completed" : ""}`}
            >
              <h4>Functions</h4>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
