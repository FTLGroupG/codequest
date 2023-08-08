import React from "react";
import QuestionSelect from "../QuestionSelect/QuestionSelect";
import QuestionDrag from "../QuestionDrag/QuestionDrag";
import "./Quiz.css";
import { useParams, Navigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import QuestionContext from "../../contexts/question";
import ProfileContext from "../../contexts/profile";
import apiClient from "../../services/apiClient";
import Loading from "../Loading/Loading";

export default function Quiz({ user }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const { questionContext } = useContext(QuestionContext);
  const [questions, setQuestions] = questionContext;

  const { counterContext } = useContext(QuestionContext);
  const [counter, setCounter] = counterContext;

  const { leftOff, userProgress } = useContext(ProfileContext);

  const incrementCounter = () => {
    if (counter < questions.length - 1) {
      setCounter(counter + 1);
    }
  };

  const decrementCounter = () => {
    if (counter > 0) setCounter(counter - 1);
  };

  const { id } = useParams();
  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true);

      try {
        const { data, errorQuestion } = await apiClient.fetchQuestionByModule(
          id
        );

        if (errorQuestion) setError(errorQuestion);
        if (data?.questions) {
          setQuestions(data?.questions);
        }
      } catch (error) {
        console.error("Fetching data error:", error);
      }
      setIsLoading(false);
    };

    fetchQuestions();
  }, []);

  if (error) {
    return (
      <h1 style={{ color: "red" }}>
        An error has ocurred while fetching questions!
      </h1>
    );
  }

  // check if it is loading before rendering main component
  if (isLoading) {
    return <Loading />;
  }

  // Wait for questions to be fetched before rendering
  if (isLoading || !questions) {
    return <Loading />;
  }

  return (
    <div className="Quiz">
      {console.log(leftOff)}
      {console.log(userProgress)}
      {user.email && !localStorage.getItem("selectedProfile") && (
        <Navigate to="/account-profiles" replace={true} />
      )}
      {questions[counter]?.type === "select" ? (
        <QuestionSelect user={user} />
      ) : (
        <QuestionDrag user={user} />
      )}
    </div>
  );
}
