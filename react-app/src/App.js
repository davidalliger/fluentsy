import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/login/LoginForm';
import SignUpForm from './components/auth/signup/SignUpForm';
import NavBar from './components/navigation/NavBar';
import LandingPage from './components/home/LandingPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import { authenticate } from './store/session';
import { getProfiles } from './store/profiles';
import ProfilePage from './components/profiles/ProfilePage';

function App() {
  const [loaded, setLoaded] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setAuthenticated(true);
    })();
  }, [dispatch]);

  useEffect(() => {
    console.log('in second useEffect, loaded is ', loaded);
    console.log('in second useEffect, user is ', user);
    (async() => {
      if (user) {
        await dispatch(getProfiles())
      }
      setLoaded(true);
    })();
  }, [dispatch, authenticated]);



  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:id' exact={true} >
          <ProfilePage />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <LandingPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
