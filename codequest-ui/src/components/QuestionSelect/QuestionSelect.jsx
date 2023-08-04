import React from "react";
import "./QuestionSelect.css";
import QuestionContext from "../../contexts/question";
import apiClient from "../../services/apiClient";
import { useState, useContext, useEffect } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import ProfileContext from "../../contexts/profile";
import AuthContext from "../../contexts/auth";
import useSound from "use-sound";
import correctSound from "../../assets/correct-6033.mp3";
import incorrectSound from "../../assets/wrong-sound.wav";
import lottie from "lottie-web";
import animationData from "/src/assets/correctAnimationNoLoop.json";

const AnimationComponent = () => {
  useEffect(() => {
    // Lottie configuration
    const animationContainer = document.getElementById(
      "lottieQuestionSelectContainer"
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
      id="lottieQuestionSelectContainer"
      className="floating"
      style={{ width: "200px" }}
    ></div>
  );
};

export default function QuestionSelect() {
  const {
    leftOff,
    setLeftOff,
  } = useContext(ProfileContext);
  const navigate = useNavigate();
  const { questionContext } = useContext(QuestionContext);
  const [questions, setQuestions] = questionContext;

  const [playCorrectSound] = useSound(correctSound);
  const [playincorrectSound] = useSound(incorrectSound);
  const [isCorrect, setIsCorrect] = useState(false);
  const { counterContext } = useContext(QuestionContext);
  const [counter, setCounter] = counterContext;

  const { userContext } = useContext(AuthContext);
  const [user, setUser] = userContext;
  const [optionsList, setOptionsList] = useState([]);

  useEffect(() => {
    // Reset isCorrect state when counter changes (i.e., user goes to the next question)
    setIsCorrect(false);
  
    // Shuffle the options for the current question
    const shuffle = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };
  
    setOptionsList(shuffle(questions[counter].options));
  }, [counter]);
  

  const finishModule = async (module_id) => {
    // update module in user progress table
    const { data, error } = await apiClient.completeModule(
      module_id,
      localStorage.getItem("selectedProfile")
    );
    if (error) {
      console.error("error in apiclient finish module", error);
    }
    setLeftOff(parseInt(localStorage.getItem("leftOff")) + 1)
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

  const handleResult = (event) => {
    var element = event.target; // Get the clicked element
    var content = element.innerText; // Get the content of the element

    if (content === questions[counter].answer) {
      playCorrectSound();
      setIsCorrect(true);
      document.getElementById("message").innerHTML = "Correct!";
      element.classList.add("correct-answer-2");
      counter < questions.length - 1 ? addNext() : addFinal();
    } else {
      // playincorrectSound();
      setIsCorrect(false);
      document.getElementById("message").innerHTML =
        "Hmm, that's not quite right. Try again!";
      element.classList.add("wrong-answer-2");
      counter < questions.length - 1 ? removeNext() : removeFinal();
    }
  };

  return (
    <>
      <div id="content-2">
        {/* SECOND QUESTION TYPE */}

        <div id="testDiv">
          {isCorrect && (
            <div id="lottieAnimation">
              <AnimationComponent />
            </div>
          )}
        </div>

        <div className="second-question-type">
          <h2 id="message"></h2>
          <div className="question-2">
            {questions.length > 0 && questions[counter].question}
          </div>

          {questions.length > 0 && (
            <>
              <img src={questions[counter].image_url} alt="" />

              {optionsList.map((option) => {
                return (
                  <React.Fragment key={option}>
                    <button onClick={(event) => handleResult(event)}>
                      {" "}
                      {option}
                    </button>
                    <br />
                  </React.Fragment>
                );
              })}
            </>
          )}
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
          {counter === questions.length - 1 ? (
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
      </div>
    </>
  );
}