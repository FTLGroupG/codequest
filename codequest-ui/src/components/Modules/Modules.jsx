import React, { useContext, useEffect, useState } from "react";
import "./Modules.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Finished from "../Finished/Finished";
import Quiz from "../Quiz/Quiz";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthContext from "../../contexts/auth";
import ProfileContext from "../../contexts/profile";

export default function Modules() {
  const { userContext } = useContext(AuthContext);
  const [user, setUser] = userContext;

  const {
    selectedProfileId,
    setSelectedProfile,
    userProgress,
    setUserProgress,
    leftOff,
    setLeftOff,
  } = useContext(ProfileContext);
  const [showContent, setShowContent] = useState(false);

  // Calculate the value for `leftOff` based on `userProgress`
  useEffect(() => {
    const leftOffValue = Object.values(userProgress)
      .filter((key) => typeof key === "boolean")
      .filter(Boolean).length;
    setLeftOff(leftOffValue);
  }, [userProgress]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const selectedProfileId = searchParams.get("selectedProfile");
    if (selectedProfileId) {
      setSelectedProfile(parseInt(selectedProfileId, 10));
      localStorage.setItem("selectedProfile", selectedProfileId);

      setTimeout(() => {
        setShowContent(true);
      }, 100);
    }
  }, [location.search, setSelectedProfile]);

  console.log("leftOff" + leftOff);
  console.log("userProgress: " + userProgress);

  // Store the leftOff value in localStorage
  useEffect(() => {
    if (leftOff) {
      localStorage.setItem("leftOff", leftOff);
    }
    setLeftOff(localStorage.getItem("leftOff"));
  }, [leftOff]);

  return (
    <div className="Modules">
      {console.log("leftOff test: ", leftOff)}
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

      <div className="moduleCard">
        <h1>Learn React</h1>
        <div className="moduleCircles">
          <span className="circle">
            <h4>Data Types</h4>
          </span>
          <span className="circle">
            <h4>Variables</h4>
          </span>
          <span className="circle">
            <h4>Conditionals</h4>
          </span>
          <span className="circle">
            <h4>Lists</h4>
          </span>
          <span className="circle">
            <h4>Loops</h4>
          </span>
          <span className="circle">
            <h4>Functions</h4>
          </span>
        </div>
      </div>
      {/* <Routes>
        <Route path="curriculum/finished" element={<Finished />} />
      </Routes> */}
    </div>
  );
}
