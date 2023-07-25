import React from "react";
import "./Modules.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Finished from "../Finished/Finished";
import { useContext, useEffect } from "react";
import Quiz from "../Quiz/Quiz";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthContext from "../../contexts/auth";

export default function Modules({ userProgress, leftOff, getProgress }) {
  const { userContext } = useContext(AuthContext);
  const [user, setUser] = userContext;

  useEffect(() => {
    // would need useEffect here when finish button is
    // clicked and routed to module, fetch new userprogress
    console.log("inside modules");
    getProgress();
  }, []);

  return (
    <div className="Modules">
      <div className="moduleCard">
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
