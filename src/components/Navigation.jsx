import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import './Navigation.css';
const Navigation = () => {
  const { user } = useContext(AuthContext);

  return (
    <nav>
      <ul>
        <>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/onboarding">Onboard</NavLink>
          </li>
        </>
        {user ? (
          <>
            <li>
              <NavLink to="/logout">Log out</NavLink>
            </li>
            <li>
              <NavLink to="/profile">Profile</NavLink>
            </li>
            <li>
              <NavLink to="/settings">Settings</NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/login">Log in</NavLink>
            </li>
            <li>
              <NavLink to="/signup">Sign Up</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
