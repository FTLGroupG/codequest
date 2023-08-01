import React from "react";
import "./QuestionDrag.css";
import QuestionContext from "../../contexts/question";
import { useState, useContext, useEffect } from "react";
import apiClient from "../../services/apiClient";
import ProfileContext from "../../contexts/profile";
import useSound from "use-sound";
import correctSound from "../../assets/correct-6033.mp3";
import incorrectSound from "../../assets/wrong-sound.wav";
import lottie from "lottie-web";
import animationData from "/src/assets/correctAnimationNoLoop.json";
import { Link, useNavigate } from "react-router-dom";

const AnimationComponent = () => {
  useEffect(() => {
    // Lottie configuration
    const animationContainer = document.getElementById(
      "lottieQuestionDragContainer"
    ); // Replace 'lottie-container' with your container's ID
    const anim = lottie.loadAnimation({
      container: animationContainer,
      renderer: "svg", // Choose the renderer (svg, canvas, html)
      loop: false,
      autoplay: true,
      animationData: animationData,
    });

    return () => anim.destroy(); // Clean up on unmount
  }, []);

  return (
    <div
      id="lottieQuestionDragContainer"
      className="floating"
      style={{ width: "200px" }}
    ></div>
  );
};

export default function QuestionDrag({ user }) {
  const navigate = useNavigate();
  const { questionContext } = useContext(QuestionContext);
  const [questions, setQuestions] = questionContext;

  const [playCorrectSound] = useSound(correctSound);
  const [playincorrectSound] = useSound(incorrectSound);
  const [isCorrect, setIsCorrect] = useState(false);
  const { counterContext } = useContext(QuestionContext);
  const [counter, setCounter] = counterContext;

  const { profileContext, removeProfile, selectedProfile, setSelectedProfile } =
    useContext(ProfileContext);

  const finishModule = async (module_id) => {
    // update module in user progress table
    const { data, error } = await apiClient.completeModule(
      module_id,
      selectedProfile
    );
    if (error) {
      console.error("error in apiclient finish module", error);
    }
    navigate(`/modules/${questions[0].module_id}/curriculum/results`);
  };

  const addFinal = () => {
    const finishBtn = document.getElementById("curriculum-finish-btn");
    finishBtn.classList.add("visible");
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
    playCorrectSound();
    setIsCorrect(true);
    document.getElementById("message").innerHTML = "Correct!";
    document.getElementById("blank").className = "correct-answer";
    counter < questions.length - 1 ? addNext() : addFinal();
  };

  const wrongResult = () => {
    playincorrectSound();
    setIsCorrect(false);
    document.getElementById("message").innerHTML =
      "Hmm, that's not quite right. Try again!";
    document.getElementById("blank").className = "wrong-answer";
    counter < questions.length - 1 ? removeNext() : removeFinal();
  };

  const drag = (event) => {
    event.dataTransfer.setData("text", event.target.id);
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
        <div className="quizCard">
          <div className="quizContent">
            <div className="question">
              <h2>{questions.length > 0 && questions[counter].question}</h2>
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
                  {questions.length > 0 && (
                    <>
                      <span
                        className="option"
                        id={questions[counter].answer}
                        onDragStart={drag}
                        draggable="true"
                      >
                        {questions[counter].answer}
                      </span>

                      {questions[counter].incorrect_answers.map(
                        (wrong_answer) => {
                          return (
                            <span
                              className="option"
                              id={wrong_answer}
                              onDragStart={drag}
                              draggable="true"
                            >
                              {wrong_answer}
                            </span>
                          );
                        }
                      )}
                    </>
                  )}
                </h2>
              </div>
            </div>

            {isCorrect && (
              <div id="lottieAnimation">
                <AnimationComponent />
              </div>
            )}

            <h3>Click and drag your guess into the blank space!</h3>
          </div>
        </div>
      </div>

      <div className="curriculumCardButtonCard">
        {counter > 0 && (
          <button
            id="curriculum-back-btn"
            className="curriculumCardButton"
            onClick={decrementCounter}
          >
            Back
          </button>
        )}

        {counter == questions.length - 1 ? (
          <button
            id="curriculum-finish-btn"
            className="curriculumCardButton hidden"
            onClick={
              Object.keys(user).length !== 0
                ? () => finishModule(questions[0].module_id)
                : () => navigate("/register")
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
