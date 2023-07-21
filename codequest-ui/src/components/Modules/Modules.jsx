import React from "react";
import "./Modules.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Finished from "../Finished/Finished";
import { useContext } from "react";
import Quiz from "../Quiz/Quiz";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthContext from "../../contexts/auth";

export default function Modules() {
  const { userContext } = useContext(AuthContext);
  const [user, setUser] = userContext;
  return (
    <div className="Modules">
      <div className="moduleCard">
        <h1>Learn Python</h1>
        <div className="moduleCircles">
          <Link to={`/modules/1/curriculum`}>
            <span className="selectedCircle">
              <h4>Data Types</h4>
            </span>
          </Link>
          <Link to={`/modules/2/curriculum`}>
            <span className="circle">
              <h4>Variables</h4>
            </span>
          </Link>
          <Link to={`/modules/3/curriculum`}>
            <span className="circle">
              <h4>Conditionals</h4>
            </span>
          </Link>
          <Link to={`/modules/4/curriculum`}>
            <span className="circle">
              <h4>Lists</h4>
            </span>
          </Link>
          <Link to={`/modules/5/curriculum`}>
            <span className="circle">
              <h4>Loops</h4>
            </span>
          </Link>
          <Link to={`/modules/6/curriculum`}>
            <span className="circle">
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
      <Routes>
        <Route path="curriculum/finished" element={<Finished />} />
      </Routes>
    </div>
  );
}
