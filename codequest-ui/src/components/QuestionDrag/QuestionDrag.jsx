import React from "react";
import "./QuestionDrag.css";
import QuestionContext from "../../contexts/question";
import { useState, useContext, useEffect } from "react";
import apiClient from "../../services/apiClient";

export default function QuestionDrag({ user }) {
  const { questionContext } = useContext(QuestionContext);
  const [questions, setQuestions] = questionContext;

  const { counterContext } = useContext(QuestionContext);
  const [counter, setCounter] = counterContext;

  const finishModule = async (module_id) => {
    // update module in user progress table
    const { data, error } = await apiClient.completeModule(module_id);
    if (error) {
      console.error("error in apiclient finish module", error);
    }
    if (data?.user) {
      console.log(data?.user);
      console.log("module has been completed");
    }
  };

  const addFinal = () => {
    const finishBtn = document.getElementById("curriculum-finish-btn");
    finishBtn.classList.add("visibile");
    finishBtn.classList.remove("hidden");
  };

  const removeFinal = () => {
    const finishBtn = document.getElementById("curriculum-finish-btn");
    finishBtn.classList.add("hidden");
    finishBtn.classList.remove("visible");
  };

  const addNext = () => {
    const nextBtn = document.getElementById("curriculum-next-btn");
    nextBtn.classList.add("visible");
    nextBtn.classList.remove("hidden");
  };

  const removeNext = () => {
    const nextBtn = document.getElementById("curriculum-next-btn");
    nextBtn.classList.add("hidden");
    nextBtn.classList.remove("visible");
  };

  const incrementCounter = () => {
    if (counter < questions.length - 1) {
      setCounter(counter + 1);
      removeNext();
      document.getElementById("message").innerHTML = "";
    }
  };

  const decrementCounter = () => {
    if (counter > 0) setCounter(counter - 1);
    document.getElementById("message").innerHTML = "";
    counter < questions.length - 1 ? removeNext() : removeFinal();
  };

  const correctResult = () => {
    // console.log("Correct!");
    document.getElementById("message").innerHTML = "Correct!";
    document.getElementById("blank").className = "correct-answer";
    counter < questions.length - 1 ? addNext() : addFinal();
  };

  const wrongResult = () => {
    // console.log("You'll get it next time!");
    document.getElementById("message").innerHTML = "You'll get it next time!";
    document.getElementById("blank").className = "wrong-answer";
    counter < questions.length - 1 ? removeNext() : removeFinal();
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

    if (
      document.getElementById(selectedId).innerHTML ===
      questions[counter].answer
    ) {
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
    <>
      <div id="content">
        {/* <div className="quizCard">
        <div className="quizContent">
          <div className="question">
            <h2>Answer this </h2>
          </div>
          <div className="first-question-type">
            <h2 id="message"></h2>
            <h2 id="question">
              <span
                id="blank"
                onDrop={drop}
                onDragOver={allowDrop}
                onDragEnter={dragEnter}
                onDragLeave={dragLeave}
              ></span>
              i in array:
            </h2>
            <h2 id="tab"> print (array[i]) </h2>

            <br />
            <div id="options-list">
              <h2>
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
              </h2>
            </div>
          </div>
        </div>
      </div> */}

        <div className="quizCard">
          <div className="quizContent">
            <div className="question">
              <h2>
                {questions.length > 0 ? questions[counter].question : null}
              </h2>
            </div>
            <div className="first-question-type">
              <h2 id="message"></h2>
              <h2 id="question">
                <span
                  id="blank"
                  onDrop={drop}
                  onDragOver={allowDrop}
                  onDragEnter={dragEnter}
                  onDragLeave={dragLeave}
                ></span>
              </h2>

              <br />
              <div id="options-list">
                <h2>
                  {questions.length > 0 ? (
                    <>
                      <span
                        className="option"
                        id="for"
                        onDragStart={drag}
                        draggable="true"
                      >
                        {questions[counter].incorrect_answers[0]}
                      </span>
                      <span
                        className="option"
                        id="let"
                        onDragStart={drag}
                        draggable="true"
                      >
                        {questions[counter].incorrect_answers[1]}
                      </span>
                      <span
                        className="option"
                        id="def"
                        onDragStart={drag}
                        draggable="true"
                      >
                        {questions[counter].answer}
                      </span>
                      <span
                        className="option"
                        id="if"
                        onDragStart={drag}
                        draggable="true"
                      >
                        {questions[counter].incorrect_answers[2]}
                      </span>
                    </>
                  ) : null}
                </h2>
              </div>
            </div>
          </div>
        </div>
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
        {counter == questions.length - 1 ? (
          <button
            id="curriculum-finish-btn"
            className="curriculumCardButton hidden"
            onClick={
              Object.keys(user).length !== 0
                ? () =>
                    finishModule(
                      questions[0].module_id,
                      (window.location.href = "/modules")
                    )
                : (window.location.href = "/register")
            }
          >
            Finish
          </button>
        ) : (
          <button
            id="curriculum-next-btn"
            className="curriculumCardButton hidden"
            onClick={incrementCounter}
          >
            Next
          </button>
        )}
      </div>
    </>
  );
}
