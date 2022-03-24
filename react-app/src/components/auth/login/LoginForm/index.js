import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../../../store/session';
import SignUpForm from '../../signup/SignUpForm'

const LoginForm = ({setShowLoginModal}) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(true);
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const demoLogin = async (e) => {
    e.preventDefault();
    const demoEmail = 'demo@aa.io';
    const demoPassword = 'password'
    const data = await dispatch(login(demoEmail, demoPassword));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSignup = () => {
    setShowSignUpForm(true);
    setShowLoginForm(false);
  }

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <>
      {showLoginForm && (
        <form onSubmit={onLogin}>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div>
            <label htmlFor='email'>Email</label>
            <input
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
            />
            <button type='submit'>Login</button>
            <button
              onClick={demoLogin}
            >
              Demo User
            </button>
            <div>
              <span>Don't have an account yet?</span>
              <span
                onClick={handleSignup}
                className='toggleAuth'
              >
                Sign Up
              </span>
            </div>
          </div>
        </form>
      )}
      {showSignUpForm && (
        <SignUpForm showSignUpForm={showSignUpForm} setShowSignUpForm={setShowSignUpForm}/>
      )}
    </>
  );
};

export default LoginForm;
