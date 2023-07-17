import React from "react";

import QuestionSelect from "../QuestionSelect/QuestionSelect";
import QuestionDrag from "../QuestionDrag/QuestionDrag";
import "./Quiz.css";
import { Link, useParams } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import AuthContext from "../../contexts/auth";
import apiClient from "../../services/apiClient";

export default function Quiz() {
  const { moduleContext } = useContext(AuthContext);
  const [moduleId, setModuleId] = moduleContext;
  const id = moduleId;
  const { userContext } = useContext(AuthContext);
  const [user, setUser] = userContext;
  const [isLoading, setIsLoading] = useState(true);
  const [questionItem, setQuestionItem] = useState({});
  const [errorMessage, setErrorMessage] = useState();
  const [initialiazed, setInitialized] = useState();
  let [questions, setQuestions] = useState([]);
  const [questionId, setQuestionId] = useState(1);

  // useEffect(() => {
  //   const fetchQuestion = async () => {
  //     setIsLoading(true);

  //     const { data, error } = await apiClient.fetchQuestionById(questionId);
  //     if (data) {
  //       setQuestionItem(data);
  //     } else {
  //       setErrorMessage(error);
  //     }
  //     setIsLoading(false);
  //   };

  //   fetchQuestion();
  // }, []);
  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true);

      try {
        const { data, errorQuestion } = await apiClient.fetchQuestionByModule(
          id
        );

        if (errorQuestion) setError(errorQuestion);
        if (data?.questions) setQuestions(data?.questions);
      } catch (error) {
        console.error("Fetching data error:", error);
      }
      setIsLoading(false);
    };

    // check if user is logged in
    //if (user?.email) {
    fetchQuestions();
    //} else {
    //  setInitialized(true);
    // }
  }, []);

  return (
    <div className="Quiz">
      <div className="quizCard">
        {console.log(questions)}
        <div className="quizContent">
          <h2>Question 1/10</h2>
          <div className="question">
            <h2>{questions.length > 0 && questions[0].question}</h2>
            <div className="answerRectangle"></div>
          </div>

          <div className="horizontalAnswers">
            {console.log(questions)}
            {questions.length > 0 ? (
              <>
                <button>{questions[0].incorrect_answers[0]}</button>
                <button>{questions[0].incorrect_answers[1]}</button>
                <button>{questions[0].answer}</button>
                <button>{questions[0].incorrect_answers_spanish[2]}</button>
              </>
            ) : null}
          </div>
        </div>

        {/* <div className="curriculumCardButtonCard">
        <a href="/curriculum">
          <button className="curriculumCardButton">Back</button>
        </a>

        <a href="/question2">
          <button className="curriculumCardButton">Next</button>
        </a>

     </div> */}
      </div>

      <div className="quizCard">
        <div className="quizContent">
          <h2>Question 1/10</h2>
          <div className="question">
            <h2>What is a boolean?</h2>
          </div>

          <div className="verticalAnswers">
            <button>
              <h5>
                a data type that is used to represent text rather than numbers
              </h5>
            </button>
            <button>
              a result that can only have one of two possible values: true or
              false
            </button>
            <button>
              a data type used to represent numbers that don’t have fractional
              values
            </button>
            <button>a data type used to represent numbers with decimals</button>
          </div>
        </div>
      </div>

      <div className="quizCard">
        <div className="quizContent">
          <h2>Question 12/12</h2>
          <div className="question">
            <h2>Which code block correctly uses an integer?</h2>
          </div>
          <div className="horizontalAnswers">
            <div className="questionRectangle">
              <pre>
                <code>
                  my_integer = 42 print(my_integer) result = my_integer + 10
                  print(result) if my_integer 50: print("The integer is greater
                  than 50") else: print("The integer is not greater than 50")
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
