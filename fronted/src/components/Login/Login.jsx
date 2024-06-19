import React, { useEffect, useState } from "react";
import "./login.css"; // Ensure this CSS file exists and is properly styled
import { Typography, Button } from "@mui/material"; // Assuming MUI v5
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Actions/User";
import { toast } from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  // Select relevant states from Redux store
  const { loading, error, message } = useSelector((state) => state.user);

  // Effect to display toast messages for errors and success
  useEffect(() => {
    if (error) {
      toast.error(error); // Display error message
    }
    if (message) {
      toast.success(message); // Display success message
    }
  }, [error, message]); // Watch for changes in error or message

  // Function to handle login form submission
  const loginHandler = (e) => {
    e.preventDefault(); // Prevent default form submission
    dispatch(loginUser(email, password)); // Dispatch loginUser action
  };

  return (
    <div className="login">
      <form className="loginForm" onSubmit={loginHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Social App
        </Typography>

        {/* Email input field */}
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password input field */}
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Forgot password link */}
        <Link to="/forgot/password">
          <Typography>Forgot Password?</Typography>
        </Link>

        {/* Login button with loading state */}
        <Button type="submit">
        Submit
        </Button>

        {/* Link to register new user */}
        <Link to="/register">
          <Typography>New User?</Typography>
        </Link>
      </form>
    </div>
  );
};

export default Login;
