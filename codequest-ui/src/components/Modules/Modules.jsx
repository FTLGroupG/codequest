import React from "react";
import "./Modules.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Finished from "../Finished/Finished";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function Modules() {
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
          <span className="circle">
            <Link to={`/modules/2/curriculum`}>
              <h4>Variables</h4>
            </Link>
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
