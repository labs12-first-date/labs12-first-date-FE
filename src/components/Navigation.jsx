import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';
import logo from '../image/UnBlush.png';
const Navigation = () => {
  return (
    <nav>
      <ul>
        <NavLink to='/'>
          <img id='logo' src={logo} alt='logo' />
        </NavLink>

        <li>
          <NavLink to='/'>Home</NavLink>
        </li>
        <li>
          <NavLink to='/thunderdome'>Match</NavLink>
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
        <li>
          <NavLink to='/logout'>Log out</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
