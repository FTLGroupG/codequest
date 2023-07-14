import React from "react";
import "./QuestionSelect.css";

const QuestionSelect = () => {
  const correctResult2 = () => {
    // console.log("Correct!");
    document.getElementById("message").innerHTML = "Correct!";
  };

  const wrongResult2 = () => {
    // console.log("You'll get it next time!");
    document.getElementById("message").innerHTML = "You'll get it next time!";
  };

  return (
    <div id="content-2">
      {/* SECOND QUESTION TYPE */}
      <div className="second-question-type">
        <h2 id="message"></h2>
        <div className="question-2"> What is a boolean? </div>

        <button className="wrong-answer-2" onClick={wrongResult2}>
          a data type that is used to represent text rather than numbers
        </button>
        <br />
        <button className="correct-answer-2" onClick={correctResult2}>
          a result that can only have one of two possible values: true or false
        </button>
        <br />
        <button className="wrong-answer-2" onClick={wrongResult2}>
          a data type used to represent numbers that don’t have fractional
          values
        </button>
        <br />
        <button className="wrong-answer-2" onClick={wrongResult2}>
          a data type used to represent numbers with decimals
        </button>
      </div>
    </div>
  );
};

export default QuestionSelect;
