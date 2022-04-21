import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ProfileButton from '../ProfileButton';
import '../Navigation.css';
import LoginModal from '../../auth/login/LoginModal';
import SignUpModal from '../../auth/signup/SignUpModal';
import NoProfile from '../../profiles/NoProfile';
import Modal from '../../other/Modal';

const NavBar = () => {
  const user = useSelector(state => state.session.user);
  const profileState = useSelector(state => state.profiles);
  const profiles = Object.values(profileState);
  const userProfile = profiles?.reduce((profileMatch,profile) => {
      if (profile?.userId === user?.id) profileMatch = profile;
      return profileMatch;
  }, null);
  const [showNoProfileModal, setShowNoProfileModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [profile, setProfile] = useState(false);
  let sessionLinks;
  if (user) {
    sessionLinks = (
      <div id='session-icons'>
        <div className='nav-icon-section'>
          <NavLink to='/' exact={true} className='nav-home' activeClassName='nav-selected-home'>
            <i className="fa-solid fa-house"></i>
          </NavLink>
        </div>
        <div className='nav-icon-section'>
          <NavLink to='/users' exact={true} className='nav-users'  activeClassName='nav-selected-users'>
            <i className="fa-solid fa-magnifying-glass"></i>
          </NavLink>
        </div>
        {profile && (
          <div className='nav-icon-section'>
            <NavLink to={{pathname: "/messages", state:{currentCorrespondent: null}}} exact={true} className='nav-messages'  activeClassName='nav-selected-messages'>
              <i className="fa-solid fa-envelope"></i>
            </NavLink>
          </div>
        )}
        {!profile && (
          <div className='nav-icon-section'>
            <div className='nav-messages'  activeClassName='nav-selected' onClick={() =>setShowNoProfileModal(true)}>
              <i className="fa-solid fa-envelope"></i>
            </div>
          </div>
        )}
        <div id="profile-button-icon">
          <ProfileButton user={user}/>
        </div>
        {showNoProfileModal && (
          <Modal onClose={()=> setShowNoProfileModal(false)}>
              <NoProfile setShowModal={setShowNoProfileModal} />
          </Modal>
        )}
      </div>
    )
  } else {
    sessionLinks = (
      <ul id='session-links'>
        <li>
          <button className='nav-button' onClick={()=> {setShowSignUpModal(true)}}>
            Sign Up
          </button>
          <SignUpModal showSignUpModal={showSignUpModal} setShowSignUpModal={setShowSignUpModal} />
        </li>
        <li>
          <button className='nav-button' onClick={()=> {setShowLoginModal(true)}}>
            Log In
          </button>
          <LoginModal showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal} />
        </li>
      </ul>
    )
  }

  useEffect(() => {
    setShowSignUpModal(false);
    setShowLoginModal(false);
  }, [user])

  useEffect(() => {
    if (userProfile) {
        setProfile(true);
    } else {
      setProfile(false);
    }
  }, [userProfile])

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
        {sessionLinks}
    </nav>
  );
}

export default NavBar;
