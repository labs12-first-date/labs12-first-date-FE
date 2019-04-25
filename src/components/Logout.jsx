import React from 'react';
import { Redirect } from 'react-router-dom';
import { auth } from '../firebase';

const Logout = () => {
  auth.logout();

  return <Redirect to="/" />;
};

export default Logout;
