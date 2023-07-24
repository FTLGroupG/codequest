import React, { useEffect } from "react";
import "./Finished.css";
import { Link, useParams } from "react-router-dom";
import { useState, useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Quiz from "../Quiz/Quiz";
import AuthContext from "../../contexts/auth";
import QuestionContext from "../../contexts/question";
import AccessForbidden from "../AccessForbidden/AccessForbidden";
import useSound from "use-sound";
import cheerSound from "../../assets/mixkit-classroom-spontaneous-applause-500.wav";
import Confetti from "react-confetti"; 

export default function Finished(props) {
  const { id } = useParams();

  const { counterContext } = useContext(QuestionContext);
  const [counter, setCounter] = counterContext;

  const { userContext } = useContext(AuthContext);
  const [user, setUser] = userContext;

  const handleCounterReset = () => {
    setCounter(0);
  };


  const [play] = useSound(cheerSound);

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

  // Ensure the useSound hook is only initialized after a user gesture
  useEffect(() => {
    // Initialize useSound hook here to trigger AudioContext creation
    play();
  }, [play]);

  return (
    <div className="Finished">
      {/* Render the Confetti component to trigger the animation */}
      <Confetti width={window.innerWidth} height={window.innerHeight} />
      {id == 1 ? (
        displayFinishContent()
      ) : (
        <>{user.email ? displayFinishContent() : <AccessForbidden />}</>
      )}
    </div>
  );
}



