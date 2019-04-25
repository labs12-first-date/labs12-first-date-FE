import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const Navigation = () => {
  const user = useContext(UserContext);

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        {user ? (
          <li>
            <NavLink to="/logout">Log out</NavLink>
          </li>
        ) : (
          <li>
            <NavLink to="/login">Log in</NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
