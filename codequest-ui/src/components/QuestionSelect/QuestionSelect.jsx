import React from "react";
import "./QuestionSelect.css";
import QuestionContext from "../../contexts/question";
import { useState, useContext, useEffect } from "react";

export default function QuestionSelect() {
  const { questionContext } = useContext(QuestionContext);
  const [questions, setQuestions] = questionContext;

  const { counterContext } = useContext(QuestionContext);
  const [counter, setCounter] = counterContext;

  const handleResult = (event) => {
    var element = event.target; // Get the clicked element
    var content = element.innerHTML; // Get the content of the element

    if (content === questions[counter].answer) {
      document.getElementById("message").innerHTML = "Correct!";
      element.classList.add("correct-answer-2");
    } else {
      document.getElementById("message").innerHTML = "You'll get it next time!";
      element.classList.add("wrong-answer-2");
    }
  };

  return (
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
              {questions[counter].incorrect_answers_spanish[2]}
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}
