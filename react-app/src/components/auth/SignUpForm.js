import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpForm.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, repeatPassword ));
      if (data) {
        setErrors(data)
      }
    }
    else{
      setErrors(["Password: Requires Matching"])
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className="signup-form-container">
      <form className="form-background-sign-up" onSubmit={onSignUp}>
        <h1>Sign Up</h1>
        <div className="error-group-container">
          {errors.map((error, ind) => (
            <div className="error-text" key={ind}>{error}</div>
          ))}
        </div>

        <div className="username-container">
          <div className="placeholder">User Name</div>
          <input
            type='text'
            name='username'
            onChange={updateUsername}
            value={username}
            required
          ></input>
        </div>
        <div className="username-container">
          <div className="placeholder">Email</div>
          <input
            type='text'
            name='email'
            onChange={updateEmail}
            value={email}
          ></input>
        </div>
        <div className="password-container">
        <div className="placeholder">Password</div>
          <input
            type='password'
            name='password'
            onChange={updatePassword}
            value={password}
          ></input>
        </div>
        <div className="password-container">
        <div className="placeholder">Repeat Password</div>
          <input
            type='password'
            name='repeat_password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
        <button className="signup-button" type='submit'>Sign Up</button>
      </form>
    </div>

  );
};

export default SignUpForm;
