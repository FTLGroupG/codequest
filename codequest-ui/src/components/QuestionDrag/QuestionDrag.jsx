import React from "react";
import "./QuestionDrag.css";

const QuestionDrag = () => {
  const correctResult = () => {
    // console.log("Correct!");
    document.getElementById("message").innerHTML = "Correct!";
    document.getElementById("blank").className = "correct-answer";
  };

  const wrongResult = () => {
    // console.log("You'll get it next time!");
    document.getElementById("message").innerHTML = "You'll get it next time!";
    document.getElementById("blank").className = "wrong-answer";
  };

  const drag = (event) => {
    event.dataTransfer.setData("text", event.target.id);
    // console.log("dragging");
  };

  const allowDrop = (event) => {
    event.preventDefault();
  };

  const drop = (event) => {
    event.preventDefault();
    let selectedId = event.dataTransfer.getData("text");
    document.getElementById("blank").innerHTML =
      document.getElementById(selectedId).innerHTML;

    if (document.getElementById(selectedId).innerHTML === "for") {
      event.target.style.backgroundColor = "";
      correctResult();
    } else {
      event.target.style.backgroundColor = "";
      wrongResult();
    }
  };

  const dragEnter = (event) => {
    if (event.target.id == "blank") {
      event.target.style.backgroundColor = "yellow";
    }
  };

  const dragLeave = (event) => {
    if (event.target.id == "blank") {
      event.target.style.backgroundColor = "";
    }
  };

  return (
    <div id="content">
      <div className="first-question-type">
        <h2 id="message"></h2>
        <h1 id="question">
          <span
            id="blank"
            onDrop={drop}
            onDragOver={allowDrop}
            onDragEnter={dragEnter}
            onDragLeave={dragLeave}
          ></span>
          i in array:
        </h1>
        <h1 id="tab"> print (array[i]) </h1>

        <br />
        <div id="options-list">
          <h1>
            <span
              className="option"
              id="for"
              onDragStart={drag}
              draggable="true"
            >
              for
            </span>
            <span
              className="option"
              id="let"
              onDragStart={drag}
              draggable="true"
            >
              let
            </span>
            <span
              className="option"
              id="def"
              onDragStart={drag}
              draggable="true"
            >
              def
            </span>
            <span
              className="option"
              id="if"
              onDragStart={drag}
              draggable="true"
            >
              if
            </span>
          </h1>
        </div>
      </div>

      <div className="curriculumCardButtonCard">
        <a href="/quiz">
          <button className="curriculumCardButton">Back</button>
        </a>

        <a href="/finished">
          <button className="curriculumCardButton">Next</button>
        </a>
      </div>
    </div>
  );
};

export default QuestionDrag;
