// REACT IMPORTS
import React, { useState } from "react";

// CSS IMPORTS
import "./../style.css";

// THIRD PARTY IMPORTS
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("username");

  const handleBackToLogin = () => {
    try {
      if (isLoggedIn) {
        localStorage.clear();
      }
    } catch (error) {
      console.log("Error in handle back to login: ", error);
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleUsernameBlur = () => {
    setUsernameError(username === "" ? "Username is required" : "");
  };

  const handleEmailBlur = () => {
    setEmailError(email === "" ? "Email is required" : "");
  };

  const handlePasswordBlur = () => {
    setPasswordError(
      password === ""
        ? "Password is required"
        : password.length < 6
        ? "Password must be at least 6 characters long"
        : ""
    );
  };

  const handleConfirmPasswordBlur = () => {
    setConfirmPasswordError(
      confirmPassword === "" ? "Confirm Password is required" : ""
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setUsernameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    if (username === "") {
      setUsernameError("Username is required");
    }

    if (email === "") {
      setEmailError("Email is required");
    }

    if (password === "") {
      setPasswordError("Password is required");
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
    }

    if (confirmPassword === "") {
      setConfirmPasswordError("Confirm Password is required");
    } else if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
    }

    if (username && email && password && confirmPassword === password) {
      window.localStorage.setItem("username", username);
      window.localStorage.setItem("email", email);
      window.localStorage.setItem("password", password);
      toast.success(`${username} registered successfully`);
      navigate("/login");
    }
  };

  const handleReset = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");

    setUsernameError(false);
    setEmailError(false);
    setPasswordError(false);
    setConfirmPasswordError(false);
  };

  return (
    <div className="container-div">
      <div className="form-wrapper">
        <h2 className="form-title">Sign Up</h2>
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
            type="email"
            placeholder="Email"
            className="form-input"
            value={email}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
          />
          {emailError && <div className="error-message">{emailError}</div>}
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
          <input
            type="password"
            placeholder="Confirm Password"
            className="form-input"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            onBlur={handleConfirmPasswordBlur}
          />
          {confirmPasswordError && (
            <div className="error-message">{confirmPasswordError}</div>
          )}
          <div className="form-button-section">
            <button type="submit" className="form-button">
              Submit
            </button>
            <button type="reset" className="form-button" onClick={handleReset}>
              Reset
            </button>
          </div>
          <div className="signup-link">
            <Link
              className="nav-link"
              to="/login"
              aria-current="page"
              onClick={handleBackToLogin}
            >
              Back To Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
