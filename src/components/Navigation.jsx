import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

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
            <NavLink to="/swipe">Deck</NavLink>
          </li>
        </>
        {user ? (
          <>
            <li>
              <NavLink to="/logout">Log out</NavLink>
            </li>
            <li>
              <NavLink to="/profile">profile</NavLink>
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
