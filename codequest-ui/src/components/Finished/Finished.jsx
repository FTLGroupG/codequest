import React from "react";
import "./Finished.css";
import { Link, useParams } from "react-router-dom";
import { useState, useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Quiz from "../Quiz/Quiz";
import AuthContext from "../../contexts/auth";

export default function Finished(props) {
  const { moduleContext } = useContext(AuthContext);

  const [moduleId, setModuleId] = moduleContext;
  return (
    <div className="Finished">
      <div className="finishedContent">
        <h1>🎉 Congratulations! 🎉</h1>
        <h2>You have finished this lesson!</h2>
        <Link to={`/modules/${moduleId}/curriculum/finished/question`}>
          <button>Start Quiz</button>
        </Link>
      </div>
    </div>
  );
}
