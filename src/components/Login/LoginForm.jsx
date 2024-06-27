// REACT IMPORTS
import React, { useState } from "react";

// CSS IMPORTS
import "./../style.css";

// THIRD PARTY IMPORTS
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleUsernameBlur = () => {
    setUsernameError(username === "" ? "Username is required" : "");
  };

  const handlePasswordBlur = () => {
    setPasswordError(password === "" ? "Password is required" : "");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setUsernameError("");
    setPasswordError("");

    if (username === "") {
      setUsernameError("Username is required");
    }

    if (password === "") {
      setPasswordError("Password is required");
    }

    const getUsername = localStorage.getItem("username");
    const getPassword = localStorage.getItem("password");

    if (username === getUsername && password === getPassword) {
      toast.success(`${getUsername} login successfully`);
      localStorage.setItem("isLoggedIn", true);
      setIsLoggedIn(true);
      navigate("/");

      setUsername("");
      setPassword("");
    } else {
      if (username !== "" && password !== "") {
        toast.error("Invalid username or password");
        setUsername("");
        setPassword("");
      }
    }
  };

  const handleReset = () => {
    setUsername("");
    setPassword("");

    setUsernameError("");
    setPasswordError("");
  };

  return (
    <div className="container-div">
      <div className="form-wrapper">
        <h2 className="form-title">Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            className="form-input"
            value={username}
            onChange={handleUsernameChange}
            onBlur={handleUsernameBlur}
          />
          {usernameError && (
            <div className="error-message">{usernameError}</div>
          )}
          <input
            type="password"
            placeholder="Password"
            className="form-input"
            value={password}
            onChange={handlePasswordChange}
            onBlur={handlePasswordBlur}
          />
          {passwordError && (
            <div className="error-message">{passwordError}</div>
          )}
          <div className="form-button-section">
            <button type="submit" className="form-button">
              Login
            </button>
            <button type="reset" className="form-button" onClick={handleReset}>
              Reset
            </button>
          </div>
        </form>
        <div className="signup-link">
          <Link className="nav-link" to="/signup" aria-current="page">
            SignUp
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
