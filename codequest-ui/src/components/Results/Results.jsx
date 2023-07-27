import * as React from "react";
import { useState, useEffect, useContext } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import "./Results.css";
import AuthContext from "../../contexts/auth";
import apiClient from "../../services/apiClient";

export default function Register() {
  const { userContext } = useContext(AuthContext);
  const [user, setUser] = userContext;
  const { id } = useParams(); // Uncomment this line to get the 'id' from the URL parameters
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
  }, [id]); // Add 'id' to the dependency array of useEffect

  return (
    <div className="results">
      {!user?.email && <Navigate to="/" replace={true} />}
      <div className="results-container">
        <div className="results-content">
          <h2>
            Congratulations! You have completed the {module?.name} module!
          </h2>
          <h3>You succesfully have been able to {module?.description}</h3>
          <p>Here are some resources to learn more: {module?.resources}</p>
          {/* Use 'module?.title' to display the title of the completed module */}
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
          {console.log(id)}
        </div>
      </div>
    </div>
  );
}
