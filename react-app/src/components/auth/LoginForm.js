import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
    else{
      setErrors(["Login Error: Please Try Again"])
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className="signup-form-container">
      <form className="form-background-sign-up"onSubmit={onLogin}>
        <h1>Log In</h1>
        <div className="error-group-container">
          {errors.map((error, ind) => (
            <div className="error-text" key={ind}>{error}</div>
          ))}
        </div>
        <div className="username-container">
          <div className="placeholder">Email</div>
          <input
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
            required
          />
        </div>
        <div className="password-container">
          <div className="placeholder">Password</div>
          <input
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
            required
          />

        </div>
        <button className="signup-button" type='submit'>Login</button>
      </form>
    </div>

  );
};

export default LoginForm;
