import React from 'react';
import { NavLink } from 'react-router-dom';
import ResponsiveMenu from 'react-responsive-navbar';

import styled from 'styled-components';
import './Navigation.css';
import logo from '../image/UnBlush.png';

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
  @media (max-width: 600px) {
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

const LoggedoutNavigation = () => {
  return (
    <ResponsiveMenu
      menuOpenButton={<HamO>&#9776;</HamO>}
      menuCloseButton={<HamC>x</HamC>}
      changeMenuOn="600px"
      largeMenuClassName="large-menu-classname"
      smallMenuClassName="small-menu-classname"
      menu={
        <Menu>
          <nav>
            <ul>
              <NavLink to="/">
                <img src={logo} alt="logo" />
              </NavLink>
              <li>
                <NavLink to="/login">Log in</NavLink>
              </li>
              <li>
                <NavLink to="/signup">Sign Up</NavLink>
              </li>
            </ul>
          </nav>
        </Menu>
      }
    />
  );
};

export default LoggedoutNavigation;
