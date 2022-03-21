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
import { getMessages, addMessage, clearMessages } from './store/messages';
import ProfilePage from './components/profiles/ProfilePage';
import Chat from './components/Chat/Chat';
import Loading from './components/other/Loading';
import Messages from './components/messages/Messages';
import {io} from 'socket.io-client';
// import { useSocket } from './context/Socket.js'

let socket;

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [ready, setReady] = useState(false);
  const [errors, setErrors] = useState([]);
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  // const {setSocket} = useSocket();

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
        socket = io();
        socket.emit('join', {room_id: +user.id});
        console.log('app level socket connected.')
        socket.on('chat', chat => {
          dispatch(addMessage(chat, +user.id));
        })
        // setSocket(socket);
      } else {
        dispatch(clearMessages());
      }
      setLoaded(true);
      if (socket && !user) {
        socket.disconnect()
        console.log('app level socket disconnected.')
      }
      return (() => {
        socket.disconnect()
        console.log('app level socket disconnected.')
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
            <Route path='/chat' exact={true} >
              <Chat />
            </Route>
            <Route path='/messages' exact={true} >
              <Messages />
            </Route>
            <Route path='/' exact={true} >
              <LandingPage />
            </Route>
          </Switch>
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
