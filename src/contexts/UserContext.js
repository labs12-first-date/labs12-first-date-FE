import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(auth.getCurrentUser());

  // CDM
  useEffect(() => {
    auth.onUserChange(user => setCurrentUser(user));
  }, []);

  // logging
  useEffect(() => {
    console.log('auth change ->', currentUser);
  }, [currentUser]);

  return <UserContext.Provider value={currentUser}>{children}</UserContext.Provider>;
};

export { UserProvider, UserContext };
