import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Logout = ({ history }) => {
  const { logout } = useContext(AuthContext);

  logout();

  history.replace('/');
  window.location.reload();
};

export default Logout;
