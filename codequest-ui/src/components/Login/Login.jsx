import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

export default function Login({ setAppState, setIsClicked }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is already logged in based on the persisted state
    const storedLoggedInStatus = localStorage.getItem("isLoggedIn");
    if (storedLoggedInStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

const handleOnInputChange = (event) => {
    if (event.target.name === "email") {
      if (event.target.value.indexOf("@") === -1) {
        setErrors((e) => ({ ...e, email: "Please enter a valid email." }));
      } else {
        setErrors((e) => ({ ...e, email: null }));
      }
    }

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors((e) => ({ ...e, form: null }));

    const user = {
      email: form.email,
      password: form.password,
    };

    try {
      const res = await axios.post(`http://localhost:3001/auth/login`, user);
      console.log("--------------------",res)

      if (res?.data?.user) {
        setIsLoggedIn(true);
        setIsClicked(false);
        setAppState(res.data);
        navigate("/login");

        // Store the authentication status in localStorage
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("token", res.data.token);
      } else {
        setErrors((e) => ({
          ...e,
          user: "Invalid username/password combination",
        }));
      }
    } catch (err) {
      console.log(err);
      const message = err?.response?.data?.error?.message;
      setErrors((e) => ({
        ...e,
        user: message ? String(message) : String(err),
      }));
    }
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    // Remove the authentication status from localStorage
    localStorage.removeItem("isLoggedIn");
    // Redirect the user to the login page
    navigate("/login");
  };

  if (isLoggedIn) {
    // Render the logged-in state
    return (
      <div className="Login">
        <div className="media"></div>

        <div className="card">
          <h2>Welcome back!</h2>
          <p>You are logged in.</p>
          <button className="btn" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  // Render the login form
  return (
    <div className="Login">
      <div className="media"></div>

      <div className="card">
        <h2>Log into CodeQuest!</h2>

        {Boolean(errors.form) && <span className="error">{errors.form}</span>}
        <br />

        <div className="form">
        <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="user@gmail.com"
              value={form.email}
              onChange={handleOnInputChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleOnInputChange}
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>
          <button className="btn" disabled={isLoading} onClick={handleOnSubmit}>
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


