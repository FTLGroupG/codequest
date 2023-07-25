import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App.jsx";
import "./index.css";
import { AuthProvider } from "./contexts/auth";
import { QuestionContextProvider } from "./contexts/question.jsx";
import { ProfileContextProvider } from "./contexts/profile.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ProfileContextProvider>
        <QuestionContextProvider>
          <App />
        </QuestionContextProvider>
      </ProfileContextProvider>
    </AuthProvider>
  </React.StrictMode>
);
