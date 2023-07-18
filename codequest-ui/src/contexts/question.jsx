import * as React from "react";
import apiClient from "../services/apiClient";
import AuthContext from "./auth";
import Loading from "../components/Loading/Loading";

import { useEffect } from "react";

const QuestionContext = React.createContext({});

export const QuestionContextProvider = ({ children }) => {
  // useContext hook
  const { userContext } = React.useContext(AuthContext);
  const [user, setUser] = userContext;

  const { moduleContext } = React.useContext(AuthContext);
  const [moduleId, setModuleId] = moduleContext;

  // useEffect hooks
  const [questions, setQuestions] = React.useState([]);
  const [counter, setCounter] = React.useState(0);
  const [initialized, setInitialized] = React.useState(false);
  const [error, setError] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);

  // after component is mounted after authenticating user, fetch all the data if possible
  React.useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true);

      try {
        const { data, errorQuestion } = await apiClient.fetchQuestionByModule(
          moduleId
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

    // check if user is logged in
    if (user?.email) {
      fetchQuestions();
    } else {
      setInitialized(true);
    }
  }, [user]);

  // check if there where any errors after doing a request
  if (error) {
    return (
      <h1 style={{ color: "red" }}>
        An error has ocurred while fetching nutrition items!
      </h1>
    );
  }

  // check if it is loading before rendering main component
  if (isLoading) {
    return <Loading />;
  }

  // check if the nutrition data has been initialized, if not display a loading message
  return (
    <QuestionContext.Provider
      value={{
        questionContext: [questions, setQuestions],
        counterContext: [counter, setCounter],
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};

export default QuestionContext;
