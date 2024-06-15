import React, { useState, useEffect } from 'react';
import { Typography, Button, Avatar } from "@mui/material";
import "./register.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-hot-toast';
import { registerUser } from '../../Actions/User';

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(null);

  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (message) {
      toast.success(message);
    }
  }, [error, message]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result); // this will be the base64 string
    };
    reader.readAsDataURL(file);
  };

  const loginHandler =async (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
      name,
      avatar
    };
   await  dispatch(registerUser(userData));
// user goes to home page
    window.location.href = "/";

  };


  return (
   <div className="register">
    <form  className="registerForm"  onSubmit={loginHandler}>

    <Typography variant="h3" style={{ padding: "2vmax" }}>
          Social App
        </Typography>
     <Avatar src={avatar} alt="User" sx={{ width: 56, height: 56 }} />

        <input
          type="text"
          placeholder="Enter Your Name "
                className='input'
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
                className='input'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className='input'
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
  <input className='fileInput' type="file" accept="image/*" onChange={handleImageChange} />
    

   

        <Button type="submit" disabled={loading}>
          {loading ? "Registering in..." : "Register"}
        </Button>

        <Link to="/login">
          <Typography>Already Account?</Typography>
        </Link>
    </form>
   </div>
  )
}

export default Register
