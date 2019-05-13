import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

const LoggedoutNavigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/login'>Log in</NavLink>
        </li>
        <li>
          <NavLink to='/signup'>Sign Up</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default LoggedoutNavigation;
