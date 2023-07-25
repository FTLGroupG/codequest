import { useState, useContext, useEffect } from "react";
import React from "react";
import {
  useNavigate,
  Link,
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
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
import ProfilesPage from "../ProfilesPage/ProfilesPage";
import ProfilesNew from "../ProfilesNew/ProfilesNew";
import ProfilesSelection from "../ProfilesSelection/ProfilesSelection";
import { AuthProvider } from "../../contexts/auth";
import NotFound from "../NotFound/NotFound";
import Loading from "../Loading/Loading";

// React Contexts
import AuthContext from "../../contexts/auth";

function App() {
  const { userContext } = useContext(AuthContext);
  const [user, setUser] = userContext;
  const [userProgress, setUserProgress] = useState({});
  const [errors, setErrors] = useState();

  const leftOff = Object.values(userProgress)
    .filter((key) => typeof key === "boolean")
    .filter(Boolean).length;

  const getProgress = async () => {
    try {
      const { data, error } = await apiClient.fetchUserFromToken();
      if (data) {
        console.log("inside get progress");
        setUserProgress(data.userprogress);
      }
      // if (error) {
      //   console.log("error getting userprogress", error);
      // }
    } catch (error) {
      console.error("Error fetching userprogrss from me", error);
    }
  };

  useEffect(() => {
    getProgress();
  }, []);

  const handleOnLogout = () => {
    setUser({});
    //remove token from localStorage
    localStorage.removeItem(apiClient.tokenName);
    localStorage.removeItem("selectedProfile");
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
              element={
                <Login
                  errors={errors}
                  setErrors={setErrors}
                  userProgress={userProgress}
                  setUserProgress={setUserProgress}
                  leftOff={leftOff}
                />
              }
            />
            <Route
              path="/register"
              element={<Register errors={errors} setErrors={setErrors} />}
            />
            <Route path="/account-profiles" element={<ProfilesSelection />} />
            <Route path="/profiles/*" element={<ProfilesPage user={user} />} />
            <Route path="/profile/create" element={<ProfilesNew />} />
            <Route path="/forbidden" element={<AccessForbidden />} />
            <Route
              path="/modules/*"
              element={
                <Modules
                  userProgress={userProgress}
                  leftOff={leftOff}
                  getProgress={getProgress}
                />
              }
            />
            //<Route path="/modules/*" element={<Modules />} />
            <Route path="/notFound" element={<NotFound />} />
            <Route path ="/loading" element={<Loading />} />
            <Route path="/modules/:id/curriculum" element={<Curriculum />} />
            <Route
              path="/modules/:id/curriculum/finished/"
              element={<Finished />}
            />
            <Route
              exact
              path="/modules/:id/curriculum/question"
              element={<Quiz user={user} />}
            />
           // <Route path="/modules/:id/curriculum/question" element={<Quiz />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </>
  );
}

export default App;
