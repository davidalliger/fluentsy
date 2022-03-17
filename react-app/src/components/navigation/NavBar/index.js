import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ProfileButton from '../ProfileButton';
import '../Navigation.css';
import LoginModal from '../../auth/login/LoginModal';
import SignUpModal from '../../auth/signup/SignUpModal';

const NavBar = () => {
  const user = useSelector(state => state.session.user);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  let sessionLinks;
  if (user) {
    sessionLinks = (
      <ProfileButton user={user}/>
    )
  } else {
    sessionLinks = (
      <ul id='session-links'>
        <li>
          <button className='nav-button' onClick={()=> {setShowSignUpModal(true)}}>
            Sign Up
          </button>
          <SignUpModal showModal={showSignUpModal} setShowModal={setShowSignUpModal} />
        </li>
        <li>
          <button className='nav-button' onClick={()=> {setShowLoginModal(true)}}>
            Log In
          </button>
          <LoginModal showModal={showLoginModal} setShowModal={setShowLoginModal} />
        </li>
      </ul>
    )
  }

  useEffect(() => {
    setShowSignUpModal(false);
    setShowLoginModal(false);
  }, [user])

  return (
    <nav id="nav-bar">
      <div>
          <NavLink className='nav-link' to='/' exact={true} activeClassName='active'>
            Fluentsy
          </NavLink>
      </div>
      <div>
          <NavLink className='nav-link' to='/users' exact={true} activeClassName='active'>
            Find Conversation Partners
          </NavLink>
      </div>
      {sessionLinks}
    </nav>
  );
}

export default NavBar;
