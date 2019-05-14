import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';
import logo from '../image/UnBlush.png';

const LoggedoutNavigation = () => {
  return (
    <nav>
      <ul>
        <img src={logo} alt="logo" />
        <li>
          <NavLink to="/login">Log in</NavLink>
        </li>
        <li>
          <NavLink to="/signup">Sign Up</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default LoggedoutNavigation;
