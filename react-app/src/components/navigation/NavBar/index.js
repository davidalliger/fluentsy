import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ProfileButton from '../ProfileButton';
import '../Navigation.css';
import LoginModal from '../../auth/login/LoginModal';
import SignUpModal from '../../auth/signup/SignUpModal';

const NavBar = () => {
  const user = useSelector(state => state.session.user)
  let sessionLinks;
  if (user) {
    sessionLinks = (
      <ProfileButton user={user}/>
    )
  } else {
    sessionLinks = (
      <ul id='session-links'>
        <li>
          <LoginModal />
        </li>
        <li>
          <SignUpModal />
        </li>
      </ul>
    )
  }
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
