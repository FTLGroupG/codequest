import { useState, useContext } from "react";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "../Navbar/Navbar";
import Home from "../Home/Home";
import Footer from "../Footer/Footer";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Modules from "../Modules/Modules";
import Curriculum from "../Curriculum/Curriculum";
import Finished from "../Finished/Finished";
import Quiz from "../Quiz/Quiz";
import apiClient from "../../services/apiClient";
import QuestionSelect from "../QuestionSelect/QuestionSelect";

// React Contexts
import AuthContext from "../../contexts/auth";
import QuestionDrag from "../QuestionDrag/QuestionDrag";

function App() {
  const { userContext } = useContext(AuthContext);

  const [user, setUser] = userContext;
  const [errors, setErrors] = useState();

  const handleOnLogout = () => {
    setUser({});

    //remove token from localStorage
    localStorage.removeItem(apiClient.tokenName);
  };

  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Navbar handleOnLogout={handleOnLogout} user={user} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={<Login errors={errors} setErrors={setErrors} />}
            />
            <Route
              path="/register"
              element={<Register errors={errors} setErrors={setErrors} />}
            />
            <Route path="/modules" element={<Modules />} />
            <Route path="/curriculum" element={<Curriculum />} />
            <Route path="/finished" element={<Finished />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/question" element={<QuestionSelect />} />
            <Route path="/question2" element={<QuestionDrag />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
