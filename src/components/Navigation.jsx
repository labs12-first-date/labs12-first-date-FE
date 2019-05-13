import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';
const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/'>Home</NavLink>
        </li>
        <li>
          <NavLink to='/logout'>Log out</NavLink>
        </li>
        <li>
          <NavLink to='/chats'>Chats</NavLink>
        </li>
        <li>
          <NavLink to='/profile'>Profile</NavLink>
        </li>
        <li>
          <NavLink to='/settings'>Settings</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
