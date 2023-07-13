import * as React from "react";
import { useState, createContext } from "react";

const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});

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
