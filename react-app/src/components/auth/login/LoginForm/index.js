import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../../../store/session';
import SignUpForm from '../../signup/SignUpForm'

const LoginForm = ({setShowLoginModal}) => {
  const [errors, setErrors] = useState([]);
  const [showErrors, setShowErrors] = useState(false);
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
      document.querySelector('.basic-form').scrollTop = 0;
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

  useEffect(() => {
    if (errors?.length) {
      setShowErrors(true);
    }
  }, [errors])

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <>
      {showLoginForm && (
        <form
          onSubmit={onLogin}
          className='basic-form'
        >
          {showErrors && (
            <div className='basic-form-errors'>
              <ul className='basic-form-errors-ul'>
                {errors.map((error, ind) => (
                  <li key={ind} className='basic-form-errors-li'>
                    {error}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <h2>Log In</h2>
          <div className='basic-form-field'>
            <div className='basic-form-label'>
              <label htmlFor='email'>Email</label>
            </div>
            <div className='basic-form-input-container'>
              <input
                className='basic-form-input'
                name='email'
                type='text'
                placeholder='Email'
                value={email}
                onChange={updateEmail}
              />
            </div>
          </div>
          <div className='basic-form-field'>
            <div className='basic-form-label'>
              <label htmlFor='password'>Password</label>
            </div>
            <div className='basic-form-input-container'>
              <input
                className='basic-form-input'
                name='password'
                type='password'
                placeholder='Password'
                value={password}
                onChange={updatePassword}
              />
            </div>
          </div>
          <div className='basic-form-button-div'>
            <button
              type='submit'
              className='basic-form-button'
            >
              Log In
            </button>
          </div>
          <div className='basic-form-button-div'>
            <button
              onClick={demoLogin}
              className='basic-form-button'
            >
              Demo User
            </button>
          </div>
          <div className='toggle-auth-div'>
            <span>Don't have an account yet? </span>
            <span
              onClick={handleSignup}
              className='toggle-auth'
            >
              Sign Up
            </span>
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
