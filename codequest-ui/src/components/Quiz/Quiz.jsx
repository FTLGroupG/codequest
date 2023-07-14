import React from "react";
import QuestionSelect from "../QuestionSelect/QuestionSelect";
import QuestionDrag from "../QuestionDrag/QuestionDrag";
import "./Quiz.css";

export default function Quiz() {
  return (
    <div className="Quiz">
      <div className="quizContent">
        <h2>Question 1/10</h2>
        <QuestionSelect />
      </div>

      <div className="curriculumCardButtonCard">
        <a href="/curriculum">
          <button className="curriculumCardButton">Back</button>
        </a>

        <a href="/question2">
          <button className="curriculumCardButton">Next</button>
        </a>
      </div>
    </div>
  );
}
