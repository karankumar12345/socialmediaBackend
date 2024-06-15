import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgetPasswordEmail } from '../../Actions/Post';
import { Button, Typography } from '@mui/material';
import toast from 'react-hot-toast';
import './forget.css';

function Forget() {
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.userpost);

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(email)
    dispatch(forgetPasswordEmail(email));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearErrors' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, message]);

  return (
    <div className="forgotPassword">
    <form className="forgotPasswordForm" onSubmit={submitHandler}>
      <Typography variant="h3" style={{ padding: "2vmax" }}>
        Social Aap
      </Typography>

      <input
        type="email"
        placeholder="Email"
        required
        className="forgotPasswordInputs"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Button disabled={loading} type="submit">
        Send Token
      </Button>
    </form>
  </div>
  );
}

export default Forget;
