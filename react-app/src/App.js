import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/login/LoginForm';
import SignUpForm from './components/auth/signup/SignUpForm';
import NavBar from './components/navigation/NavBar';
import LandingPage from './components/home/LandingPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import ProfilesFeed from './components/profiles/ProfilesFeed';
import { authenticate } from './store/session';
import { getProfiles } from './store/profiles';
import { getMessages, addMessage, editMessage, removeMessage, clearMessages, clearDeletedProfile } from './store/messages';
import ProfilePage from './components/profiles/ProfilePage';
import Loading from './components/other/Loading';
import Messages from './components/messages/Messages';
import {io} from 'socket.io-client';
import { getLanguages } from './store/languages';
import LanguagesPage from './components/languages/LanguagesPage'
import Footer from './components/navigation/Footer'
import HomePage from './components/home/HomePage';
import NotFound from './components/other/404'

let socket;

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [ready, setReady] = useState(false);
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setAuthenticated(true);
    })();
  }, [dispatch]);

  useEffect(() => {
    (async() => {
      if (user) {
        await dispatch(getProfiles());
        await dispatch(getMessages(+user.id));
        await dispatch(getLanguages());
        socket = io();
        socket.emit('join', {room_id: +user.id});
        socket.on('chat', chat => {
          dispatch(addMessage(chat, +user.id));
        })
        socket.on('edit_chat', payload => {
          dispatch(editMessage(payload, +user.id));
        })
        socket.on('delete_chat', payload => {
            dispatch(removeMessage(payload, +user.id));
        })
        socket.on('delete_profile_event', payload => {
            console.log('received delete_profile_event, dispatching clearDeletedProfile.')
            dispatch(clearDeletedProfile(payload));
        })
      } else {
        dispatch(clearMessages());
      }
      setLoaded(true);
      if (socket && !user) {
        socket.disconnect()
      }
      return (() => {
        socket.disconnect()
    })
    })();
  }, [dispatch, user]);

  useEffect(() => {
    if (authenticated && loaded) {
      setReady(true);
    }
  }, [authenticated, loaded]);

  return (
    <BrowserRouter>
      {(!ready) && (
        <Loading />
      )}
      {ready && (
        <div id='app'>
          <NavBar />
          <Switch>
            <Route path='/login' exact={true}>
              <LoginForm />
            </Route>
            <Route path='/sign-up' exact={true}>
              <SignUpForm />
            </Route>
            <ProtectedRoute path='/users' exact={true} >
              <ProfilesFeed />
            </ProtectedRoute>
            <ProtectedRoute path='/users/:id' exact={true} >
              <ProfilePage />
            </ProtectedRoute>
            <ProtectedRoute path='/messages' exact={true} >
              <Messages />
            </ProtectedRoute>
            <ProtectedRoute path='/languages' exact={true} >
              <LanguagesPage />
            </ProtectedRoute>
            <Route path='/' exact={true} >
              {user && (
                <HomePage />
              )}
              {!user && (
                <LandingPage />
              )}
            </Route>
            <Route path='/404-not-found'>
              <NotFound />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
          <Footer />
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
