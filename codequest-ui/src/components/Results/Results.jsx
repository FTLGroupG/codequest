import * as React from "react";
import { useState, useEffect, useContext } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import "./Results.css";
import AuthContext from "../../contexts/auth";
import apiClient from "../../services/apiClient";
import lottie from "lottie-web";
import animationData from "/src/assets/trophyAnimation.json"; // Replace with your animation file path
import LottieBackgroundAnimation from "../AnimationBackgroundComponent/AnimationBackgroundComponent";
import animation18 from "/src/assets/conquererBackgroundAnimation.json";

const AnimationComponent = () => {
  useEffect(() => {
    // Lottie configuration
    const animationContainer = document.getElementById("lottieTrophyContainer");
    const anim = lottie.loadAnimation({
      container: animationContainer,
      renderer: "svg", // Choose the renderer (svg, canvas, html)
      loop: false,
      autoplay: true,
      animationData: animationData,
    });

    return () => anim.destroy(); // Clean up on unmount
  }, []);

  return (
    <div
      id="lottieTrophyContainer"
      className="floating"
      style={{ width: "500px" }}
    ></div>
  );
};

export default function Results({ profileItem }) {
  const { userContext } = useContext(AuthContext);
  const [user, setUser] = userContext;
  const { id } = useParams();
  const [module, setModule] = useState();

  // Fetch module when the component mounts
  const fetchModules = async () => {
    try {
      const { data, error } = await apiClient.fetchModule(id);
      if (data?.module) {
        setModule(data.module);
      }
    } catch (error) {
      console.error("Error fetching module:", error);
    }
  };

  useEffect(() => {
    fetchModules();
  }, [id]);

  let key = 0;

  return (
    <div className="results">
      <div className="animation18">
        <LottieBackgroundAnimation animationData={animation18} />
      </div>
      {!localStorage.getItem("selectedProfile") && (
        <Navigate to="/account-profiles" replace={true} />
      )}
      <div className="results-container">
        <div className="results-content">
          <div id="lottieAnimation">
            <AnimationComponent />
          </div>

          <h1>
            Congratulations,&nbsp;
            <span id="results-name">{profileItem.first_name}</span>! <br></br>
            You completed the {module?.name} module!
          </h1>

          <h2>This achievement has been added to your profile.</h2>
          <h2 className="floating">
            Here are some resources to learn more: <br />
            <ul id="resourceLinks" key={key++}>
              {module?.resources.map((resource, index) => {
                return (
                  <li key={module?.placeholder[index]}>
                    <a target="_blank" className="resourceLink" href={resource}>
                      {module?.placeholder[index]}
                    </a>
                  </li>
                );
              })}
            </ul>
          </h2>
        </div>
        <div className="results-buttons">
          <Link to="/modules">
            <button>Back to Modules</button>
          </Link>
          {id < 6 && (
            <Link to={`/modules/${parseInt(id) + 1}/curriculum`}>
              <button>Next Lesson</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
