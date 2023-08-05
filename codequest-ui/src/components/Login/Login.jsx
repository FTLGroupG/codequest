import { useState, useEffect, useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import AuthContext from "../../contexts/auth";
import apiClient from "../../services/apiClient";
import LottieBackgroundAnimation from "../AnimationBackgroundComponent/AnimationBackgroundComponent";
import animation14 from "/src/assets/loginBackgroundAnimation.json";
import opened_eye from "/src/assets/open-eye.svg";
import closed_eye from "/src/assets/close-eye.svg";

export default function Login(props) {
  const { userContext } = useContext(AuthContext);
  const [user, setUser] = userContext;
  const [isLoading, setisLoading] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const loginFormInit = {
    email: "",
    password: "",
  };

  const [loginForm, setLoginForm] = useState(loginFormInit);

  useEffect(() => {
    props.setErrors();
  }, [props.userProgress]);

  const onFormChange = (event) => {
    setLoginForm((prevForm) => ({
      ...prevForm,
      [event.target.name]: event.target.value,
    }));
    props.setErrors();
  };

  const handleOnSubmit = async () => {
    const { data, error } = await apiClient.loginUser(loginForm);
    if (error) props.setErrors(error);
    if (data?.user) {
      setUser(data.user);
      apiClient.setToken(data.token);
      navigate("/account-profiles");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Render the login form
  return (
    <div className="Login">
      <LottieBackgroundAnimation animationData={animation14} />
      <div className="media"></div>
      {user?.email && <Navigate to="/modules" replace={true} />}
      <div className="card">
        <h2>Log into CodeQuest!</h2>
        {/* {user?.email && (
          <>
            {props.leftOff == 6 ? (
              <Navigate to={`/modules`} replace={true} />
            ) : (
              <Navigate
                to={`/modules/${props.leftOff + 1}/curriculum`}
                replace={true}
              />
            )}
          </>
        )} */}
        <br />

        <div className="form">
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="user@gmail.com"
              value={loginForm.email}
              onChange={onFormChange}
              required
            />
          </div>

          <label htmlFor="password">Password</label>
          <div className="password-input-field">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={loginForm.password}
              onChange={onFormChange}
              required
            />
            <div className="loginForm-passvisibility-icon">
              <img
                src={showPassword ? opened_eye : closed_eye}
                onClick={togglePasswordVisibility}
              />
            </div>
          </div>
          <p className="error" style={{ color: "red" }}>
            {props.errors}
          </p>
          <button
            className="btn"
            disabled={isLoading}
            onClick={(e) => handleOnSubmit()}
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </div>

        <div className="footer">
          <p>
            Don't have an account? Sign up <Link to="/register">here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
