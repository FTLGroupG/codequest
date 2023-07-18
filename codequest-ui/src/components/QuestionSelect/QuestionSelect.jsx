import React from "react";
import "./QuestionSelect.css";
import QuestionContext from "../../contexts/question";
import { useState, useContext, useEffect } from "react";

export default function QuestionSelect() {
  const { questionContext } = useContext(QuestionContext);
  const [questions, setQuestions] = questionContext;

  const { counterContext } = useContext(QuestionContext);
  const [counter, setCounter] = counterContext;

  const addVisibility = () => {
    const nextBtn = document.getElementById("curriculum-next-btn");
    nextBtn.classList.add("visible");
    nextBtn.classList.remove("hidden");
  };

  const removeVisibility = () => {
    const nextBtn = document.getElementById("curriculum-next-btn");
    nextBtn.classList.add("hidden");
    nextBtn.classList.remove("visible");
  };

  const handleResult = (event) => {
    var element = event.target; // Get the clicked element
    var content = element.innerHTML; // Get the content of the element

    if (content === questions[counter].answer) {
      document.getElementById("message").innerHTML = "Correct!";
      element.classList.add("correct-answer-2");
      addVisibility();
    } else {
      document.getElementById("message").innerHTML = "You'll get it next time!";
      element.classList.add("wrong-answer-2");
      removeVisibility();
    }
  };

  const incrementCounter = () => {
    if (counter < questions.length - 1) {
      setCounter(counter + 1);
      removeVisibility();
      document.getElementById("message").innerHTML = "";
    }
  };

  const decrementCounter = () => {
    if (counter > 0) setCounter(counter - 1);
    document.getElementById("message").innerHTML = "";
    removeVisibility();
  };

  return (
    <>
      <div id="content-2">
        {/* SECOND QUESTION TYPE */}
        <div className="second-question-type">
          <h2 id="message"></h2>
          <div className="question-2">
            {questions.length > 0 && questions[counter].question}
          </div>

          {questions.length > 0 ? (
            <>
              <button onClick={(event) => handleResult(event)}>
                {questions[counter].answer}
              </button>
              <br />
              <button onClick={(event) => handleResult(event)}>
                {questions[counter].incorrect_answers[0]}
              </button>
              <br />
              <button onClick={(event) => handleResult(event)}>
                {questions[counter].incorrect_answers[1]}
              </button>
              <br />
              <button onClick={(event) => handleResult(event)}>
                {questions[counter].incorrect_answers[2]}
              </button>
            </>
          ) : null}
        </div>
        <div className="curriculumCardButtonCard">
          {counter > 0 ? (
            <button
              id="curriculum-back-btn"
              className="curriculumCardButton"
              onClick={decrementCounter}
            >
              Back
            </button>
          ) : null}
          <button
            id="curriculum-next-btn"
            className="curriculumCardButton hidden"
            onClick={incrementCounter}
          >
            Next
          </button>
          {counter === questions.length ? (
            <button
              id="curriculum-finish-btn"
              className="curriculumCardButton hidden"
              onClick={incrementCounter}
            >
              Finish
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
}
