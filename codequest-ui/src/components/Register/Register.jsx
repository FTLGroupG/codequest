import * as React from "react";
import { useState, useEffect, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import "./Register.css";
import AuthContext from "../../contexts/auth";
import apiClient from "../../services/apiClient";
import LottieBackgroundAnimation from "../AnimationBackgroundComponent/AnimationBackgroundComponent";
import animation13 from "/src/assets/registerBackgroundAnimation.json";
import opened_eye from "/src/assets/open-eye.svg";
import closed_eye from "/src/assets/close-eye.svg";

export default function Register(props) {
  const registrationFormInit = {
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    passwordConfirm: "",
  };

  const { userContext } = useContext(AuthContext);
  const [user, setUser] = userContext;
  const [registrationForm, setRegistrationForm] =
    useState(registrationFormInit);
  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setisLoading] = useState();

  useEffect(() => {
    props.setErrors();
  }, []);

  const onFormChange = (event) => {
    setRegistrationForm((prevForm) => ({
      ...prevForm,
      [event.target.name]: event.target.value,
    }));
    //reset error text while user making changes
    props.setErrors();
  };

  const handleOnSubmit = async () => {
    if (registrationForm.password !== registrationForm.passwordConfirm) {
      props.setErrors("Passwords do not match!");
      return 0;
    }
    // create request
    const { data, error } = await apiClient.signupUser(registrationForm);
    if (error) props.setErrors(error);
    if (data?.user) {
      setUser(data?.user);
      apiClient.setToken(data.token);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="Register">
      <div className="animation13">
        <LottieBackgroundAnimation animationData={animation13} />
      </div>
      {user?.email && <Navigate to="/account-profiles" replace={true} />}
      <div className="media"></div>
      <div className="card">
        <h2>Join CodeQuest!</h2>

        <div className="footer">
          <p>
            Already have an account? Login <Link to="/login">here</Link>
          </p>
        </div>

        <br />

        <div className="form">
          <div className="split-inputs">
            <div className="input-field"></div>

            <div className="input-field"></div>
          </div>

          <br />

          <div className="split-inputs">
            <div className="input-field">
              <label htmlFor="name">First Name</label>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={registrationForm.firstName}
                onChange={onFormChange}
              />
            </div>
            <div className="input-field">
              <label htmlFor="name">Last Name</label>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={registrationForm.lastName}
                onChange={onFormChange}
              />
            </div>
          </div>

          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={registrationForm.email}
              onChange={onFormChange}
            />
          </div>

          <div className="input-field">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={registrationForm.username}
              onChange={onFormChange}
            />
          </div>
          <label htmlFor="password">Password</label>
          <div className="input-field">
            <div className="password-input-field">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={registrationForm.password}
                onChange={onFormChange}
              />
              <div className="registerForm-passvisibility-icon">
                <img
                  src={showPassword ? opened_eye : closed_eye}
                  onClick={togglePasswordVisibility}
                />
              </div>
            </div>

            <div className="input-field">
              <label htmlFor="passwordConfirm">Confirm Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="passwordConfirm"
                placeholder="Confirm password"
                value={registrationForm.passwordConfirm}
                onChange={onFormChange}
              />
            </div>
          </div>
          <p className="error" style={{ color: "red" }}>
            {props?.errors}
          </p>
          <button className="btn" disabled={isLoading} onClick={handleOnSubmit}>
            {isLoading ? "Loading..." : "Create Account"}
          </button>
        </div>
      </div>
    </div>
  );
}
