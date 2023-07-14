import React from "react";
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
      {console.log(questions)}
      <div className="quizContent">
        <h2>Question 1/10</h2>
        <div className="question">
          <h2>{questions.length > 0 && questions[0].question}</h2>
          <div className="answerRectangle"></div>
        </div>
        <div className="answers">
          {console.log(questions)}
          {questions.length > 0 ? (
            <>
              <button>{questions[0].incorrect_answers[0]}</button>
              <button>{questions[0].incorrect_answers[1]}</button>
              <button>{questions[0].answer}</button>
              <button>{questions[0].incorrect_answer_spanish[2]}</button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
