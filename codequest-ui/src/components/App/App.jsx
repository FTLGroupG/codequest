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
import Results from "../Results/Results";
import ProfileContext from "../../contexts/profile";

// React Contexts
import AuthContext from "../../contexts/auth";

function App() {
  const { userContext } = useContext(AuthContext);
  const [user, setUser] = userContext;
  const [errors, setErrors] = useState();

  const {
    profileContext,
    removeProfile,
    selectedProfile,
    setSelectedProfile,
    userProgress,
    setUserProgress,
    leftOff,
    setLeftOff,
  } = useContext(ProfileContext);

  const handleOnLogout = () => {
    setUser({});
    //remove token from localStorage
    localStorage.removeItem(apiClient.tokenName);
    localStorage.removeItem("selectedProfile");
    localStorage.removeItem("leftOff");
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

  const [isLoading, setIsLoading] = useState();
  const profileId = localStorage.getItem("selectedProfile");
  const [errorMessage, setErrorMessage] = useState();
  const [profileItem, setProfileItem] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);

      const { data, error } = await apiClient.fetchProfileById(profileId);

      if (data) {
        setProfileItem(data);
      } else {
        setErrorMessage(error);
      }

      setIsLoading(false);
    };

    fetchProfile();
  }, [profileId]);

  return (
    <>
      <div className="App">
        <Router>
          <Navbar
            handleOnLogout={handleOnLogout}
            user={user}
            profileItem={profileItem}
          />
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
            <Route path="/account-profiles" element={<ProfilesSelection />} />
            <Route
              path="/profiles/*"
              element={
                <ProfilesPage
                  user={user}
                  profileItem={profileItem}
                  errorMessage={errorMessage}
                  isLoading={isLoading}
                />
              }
            />
            <Route path="/profile/create" element={<ProfilesNew />} />
            <Route path="/forbidden" element={<AccessForbidden />} />
            <Route path="/modules/*" element={<Modules />} />
            <Route path="/notFound" element={<NotFound />} />
            <Route path="/loading" element={<Loading />} />
            <Route path="/modules/*" element={<Modules />} />
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
            <Route path="/modules/:id/curriculum/question" element={<Quiz />} />
            <Route
              path="/modules/:id/curriculum/results"
              element={<Results profileItem={profileItem} />}
            ></Route>
          </Routes>
          <Footer />
        </Router>
      </div>
    </>
  );
}

export default App;
