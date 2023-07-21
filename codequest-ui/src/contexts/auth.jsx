import * as React from "react";
import { useState, createContext, useEffect } from "react";
import apiClient from "../services/apiClient";
import Loading from "../components/Loading/Loading";

const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const [isProcessing, setIsProcessing] = React.useState(false);
  const [initialized, setInitialized] = React.useState(false);
  const [error, setError] = React.useState();

  const fetchUserFromToken = async () => {
    setIsProcessing(true);
    try {
      const { data, error } = await apiClient.fetchUserFromToken();
      if (data) {
        setUser(data.user);
      }

      if (error) setError(error);
    } catch (error) {
      console.error("Fetching user from token error:", error);
      setError(error);
    }

    setInitialized(true);
    setIsProcessing(false);
  };

  React.useEffect(() => {
    /* User token exist in the local storage, 
    fetch token and get from the database to perform token validation, 
    effectively retrieving necessary data*/
    const token = localStorage.getItem(apiClient.tokenName);

    if (token) {
      apiClient.setToken(token);
      fetchUserFromToken();
    } else {
      setInitialized(true);
    }
  }, []);

  if (!initialized) {
    return <Loading message="Authenticating user..." />;
  }

  return (
    <AuthContext.Provider
      value={{
        userContext: [user, setUser],
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
