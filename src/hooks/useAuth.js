import { useState, useEffect } from 'react';
import { auth } from '../firebase';

// need to add local storage for user

const useAuth = () => {
  const [user, setUser] = useState(auth.getCurrentUser());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // CDM
  useEffect(() => {
    auth.onUserChange(user => setUser(user));
  }, []);

  // logging
  useEffect(() => {
    console.log('auth change ->', user);
  }, [user]);

  const loginWithEmail = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      await auth.loginWithEmail(email, password);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setError(error.message);
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      auth.logout();
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  return {
    isLoading,
    error,
    loginWithEmail,
    logout,
    user
  };
};

export default useAuth;
