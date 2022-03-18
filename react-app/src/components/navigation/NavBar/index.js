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
      <div id='nav-title-column'>
          <NavLink className='nav-link' id='app-title-nav' to='/' exact={true} activeClassName='active'>
            <div id='app-logo-nav' >
              <i className="fa-regular fa-comment"></i>
            </div>
            Fluentsy
          </NavLink>
      </div>
      <div id='nav-center-column'>
          <NavLink className='nav-link' id='find-conversation-partners' to='/users' exact={true} activeClassName='active'>
            Find Conversation Partners
          </NavLink>
          <SignUpModal showModal={showSignUpModal} setShowModal={setShowSignUpModal} />
      </div>
      <div id='nav-right-column'>
        {sessionLinks}
      </div>
    </nav>
  );
}

export default NavBar;
