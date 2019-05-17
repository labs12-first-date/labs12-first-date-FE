import React, { useContext } from 'react';
import { FirestoreDocument } from 'react-firestore';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import styled from 'styled-components';
import ResponsiveMenu from 'react-responsive-navbar';
import logo from '../image/UnBlush.png';
import './Navigation.css';

const Menu = styled.div`
  ul {
    padding-top: 0;
  }
  li {
    display: inline;
    font-size: 13px;
    list-style-type: none;
    margin-left: 30px;
  }
  a {
    text-decoration: none;

    font-size: 20px;
    color: #25d381;
    &:hover {
      color: white;
    }
  }
  @media (max-width: 670px) {
    padding: 10px 0;
    nav ul {
      height: 100%;
      display: block;
      margin: 0 auto;
      margin-left: 0;
      padding-top: 0;
      display: block;
      text-align: center;
      border-bottom: 1px #25d381 solid;
      background: none;
    }

    nav ul li {
      padding: 10px 0;
      display: block;
      margin: 0 auto;

      display: block;
      margin: 0 auto;
      text-align: center;
    }
    nav ul img {
      display: none;
    }
  }
`;

const HamO = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 5px;
  color: white;
  font-size: 2.5rem;

  margin-bottom: 0;
  padding: 10px;
`;
const HamC = styled.div`
  margin-top: 10px;
  font-size: 2.5rem;
  color: white;

  padding-top: 0;
`;

const Navigation = () => {
  const { user } = useContext(AuthContext);

  return (
    <ResponsiveMenu
      menuOpenButton={<HamO>&#9776;</HamO>}
      menuCloseButton={<HamC>x</HamC>}
      changeMenuOn='670px'
      largeMenuClassName='large-menu-classname'
      smallMenuClassName='small-menu-classname'
      menu={
        <Menu>
          <nav>
            {user ? (
              <FirestoreDocument
                path={`profiles/${user.uid}`}
                render={({ isLoading, data }) => {
                  if (isLoading) {
                    return null;
                  } else {
                    return (
                      <ul>
                        <li>
                          <NavLink to='/'>
                            <img id='logo' src={logo} alt='logo' />
                          </NavLink>
                        </li>
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
                    );
                  }
                }}
              />
            ) : (
              <ul>
                <li>
                  <NavLink to='/'>
                    <img id='logo' src={logo} alt='logo' />
                  </NavLink>
                </li>
                <li className='login'>
                  <NavLink to='/login'>Log in</NavLink>
                </li>
                <li>
                  <NavLink to='/signup'>Sign Up</NavLink>
                </li>
              </ul>
            )}
          </nav>
        </Menu>
      }
    />
  );
};

export default Navigation;
