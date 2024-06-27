// REACT IMPORTS
import React, { useEffect, useState } from "react";

// THIRD PARTY IMPORTS
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// CUSTOM IMPORTS
import NavBar from './components/HomePage/NavBar';
import HomePage from './components/HomePage/HomePage';
import LoginForm from './components/Login/LoginForm';
import RegisterForm from './components/Register/RegisterForm';
import MainPage from './components/Products/MainPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loggedIn);
  }, []);


  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.clear()
    setIsLoggedIn(false);
  };

  return (
    <>
      <ToastContainer />
      <Router>
        <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          {
            isLoggedIn && (
              <Route path="/products" exact element={<MainPage />} />
            )
          }
          <Route path="/login" element={<LoginForm setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signup" element={<RegisterForm />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
