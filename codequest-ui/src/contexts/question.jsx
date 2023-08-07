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

  // useEffect hooks
  const [questions, setQuestions] = React.useState([]);
  const [counter, setCounter] = React.useState(0);
  const [initialized, setInitialized] = React.useState(false);
  const [error, setError] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);

  // check if there where any errors after doing a request
  if (error) {
    return (
      <h1 style={{ color: "red" }}>
        An error has ocurred while fetching question items!
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
