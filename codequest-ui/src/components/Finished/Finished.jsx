import React from "react";
import "./Finished.css";
import { Link, useParams } from "react-router-dom";
import { useState, useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Quiz from "../Quiz/Quiz";
import AuthContext from "../../contexts/auth";
import QuestionContext from "../../contexts/question";
import AccessForbidden from "../AccessForbidden/AccessForbidden";
import ProfileContext from "../../contexts/profile";

export default function Finished(props) {
  const { id } = useParams();

  const { counterContext } = useContext(QuestionContext);
  const [counter, setCounter] = counterContext;

  const { userContext } = useContext(AuthContext);
  const [user, setUser] = userContext;

  const { profileContext, removeProfile, selectedProfile, setSelectedProfile } =
    useContext(ProfileContext);

  const handleCounterReset = () => {
    setCounter(0);
    console.log(selectedProfile);
  };

  const displayFinishContent = () => {
    return (
      <div className="finishedContent">
        <h1>🎉 Good job! 🎉</h1>
        <h2>You have finished the reading portion for this lesson!</h2>
        <h2>Now let's move onto the quiz!</h2>
        <Link to={`/modules/${id}/curriculum/question`}>
          <button onClick={handleCounterReset}>Start Quiz</button>
        </Link>
      </div>
    );
  };
  return (
    <div className="Finished">
      {id == 1 ? (
        displayFinishContent()
      ) : (
        <>{user.email ? displayFinishContent() : <AccessForbidden />}</>
      )}
    </div>
  );
}
