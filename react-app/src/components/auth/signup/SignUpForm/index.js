import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../../../store/session';
import NoProfile from '../../../profiles/NoProfile';
import Modal from '../../../other/Modal';
import LoginForm from '../../login/LoginForm'

const SignUpForm = ({setShowSignUpModal}) => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(true);
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    const data = await dispatch(signUp(username, email, password, repeatPassword));
    // setShowForm(true);
    if (data) {
      setErrors(data)
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

  const handleLogin = () => {
    setShowLoginForm(true);
    setShowSignUpForm(false);
  }

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <>
      {showSignUpForm && (

        <form
          onSubmit={onSignUp}
          className='basic-form'
        >
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <h2>Sign Up</h2>
          <div className ='basic-form-field'>
            <div className='basic-form-label'>
              <label>User Name</label>
            </div>
            <input
              className='basic-form-input'
              type='text'
              name='username'
              onChange={updateUsername}
              value={username}
            ></input>
          </div>
          <div className ='basic-form-field'>
            <div className='basic-form-label'>
              <label>Email</label>
            </div>
            <input
              className='basic-form-input'
              type='text'
              name='email'
              onChange={updateEmail}
              value={email}
            ></input>
          </div>
          <div className ='basic-form-field'>
            <div className='basic-form-label'>
              <label>Password</label>
            </div>
            <input
              className='basic-form-input'
              type='password'
              name='password'
              onChange={updatePassword}
              value={password}
            ></input>
          </div>
          <div className ='basic-form-field'>
            <div className='basic-form-label'>
              <label>Confirm Password</label>
            </div>
            <input
              className='basic-form-input'
              type='password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
            ></input>
          </div>
          <button
            type='submit'
            className='basic-form-button'
          >
            Sign Up
          </button>
          <div className='toggle-auth-div'>
            <span>Already have an account? </span>
            <span
              onClick={handleLogin}
              className='toggle-auth'
            >
              Log In
            </span>
          </div>
        </form>
      )}
      {showLoginForm && (
        <LoginForm showLoginForm={showLoginForm} setShowLoginForm={setShowLoginForm}/>
      )}
    </>
  );
};

export default SignUpForm;
