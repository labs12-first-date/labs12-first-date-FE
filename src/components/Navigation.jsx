import React, { useContext } from 'react';
import { FirestoreDocument } from 'react-firestore';
import Loading from './Loading';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import './Navigation.css';
const Navigation = () => {
  const { user } = useContext(AuthContext);

  return (
    <nav>
      {user ? (
        <FirestoreDocument
          path={`profiles/${user.uid}`}
          render={({ isLoading, data }) => {
            if (isLoading) {
              // console.log('This is the nav uid', user.uid);

              return <Loading />;
            } else if (!data.profile_completed) {
              return (
                <ul>
                  <li>
                    <NavLink to="/">Home</NavLink>
                  </li>

                  <li>
                    <NavLink to="/welcome">Onboard</NavLink>
                  </li>

                  <li>
                    <NavLink to="/logout">Log out</NavLink>
                  </li>
                  <li>
                    <NavLink to="/profile">Profile</NavLink>
                  </li>
                  <li>
                    <NavLink to="/settings">Settings</NavLink>
                  </li>
                  <li>
                    <NavLink to="/chats">Chats</NavLink>
                  </li>
                </ul>
              );
            } else {
              return (
                <ul>
                  <li>
                    <NavLink to="/">Home</NavLink>
                  </li>

                  <li>
                    <NavLink to="/logout">Log out</NavLink>
                  </li>
                  <li>
                    <NavLink to="/chats">Chats</NavLink>
                  </li>
                  <li>
                    <NavLink to="/profile">Profile</NavLink>
                  </li>
                  <li>
                    <NavLink to="/settings">Settings</NavLink>
                  </li>
                </ul>
              );
            }
          }}
        />
      ) : (
        <ul>
          <li>
            <NavLink to="/login">Log in</NavLink>
          </li>
          <li>
            <NavLink to="/signup">Sign Up</NavLink>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navigation;
