import * as React from "react";
import { useState, createContext } from "react";

const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [moduleId, setModuleId] = useState({});

  return (
    <AuthContext.Provider
      value={{
        userContext: [user, setUser],
        moduleContext: [moduleId, setModuleId],
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
