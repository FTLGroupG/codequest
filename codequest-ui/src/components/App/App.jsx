import { useState, useContext } from "react";
import React from "react";
import {
  useNavigate,
  Link,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
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
import AccessForbidden from "../AccessForbidden/AccessForbidden";
import apiClient from "../../services/apiClient";
import QuestionSelect from "../QuestionSelect/QuestionSelect";
import UserProfile from "../UserProfile/UserProfile";
import { AuthProvider } from "../../contexts/auth";

// React Contexts
import AuthContext from "../../contexts/auth";

function App() {
  const { userContext } = useContext(AuthContext);
  const [user, setUser] = userContext;

  const [errors, setErrors] = useState();

  const handleOnLogout = () => {
    setUser({});
    //remove token from localStorage
    localStorage.removeItem(apiClient.tokenName);
  };

  function reveal() {
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 150;

      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
  }

  window.addEventListener("scroll", reveal);

  return (
    <>
      <div className="App">
        <Router>
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
            <Route path="/forbidden" element={<AccessForbidden />} />
            <Route path="/modules/*" element={<Modules />} />
            {/* <Route element={<PrivateRoute />}>
                <Route
                  path="/modules/:id/curriculum"
                  element={<Curriculum />}
                />
              </Route>
              <Route
                exact
                path="/modules/:id/curriculum/finished/"
                element={<PrivateRoute />}
              >
                <Route
                  exact
                  path="/modules/:id/curriculum/finished/"
                  element={<Finished />}
                />
              </Route>
              <Route
                exact
                path="/modules/:id/curriculum/question"
                element={<PrivateRoute />}
              >
                <Route
                  exact
                  path="/modules/:id/curriculum/question"
                  element={<Quiz />}
                />
              </Route> */}
            <Route path="/modules/:id/curriculum" element={<Curriculum />} />

            <Route
              path="/modules/:id/curriculum/finished/"
              element={<Finished />}
            />
            <Route path="/userProfile" element={<UserProfile />} />
            <Route path="/modules/:id/curriculum/question" element={<Quiz />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </>
  );
}

export default App;
