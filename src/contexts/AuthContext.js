import React from 'react';
import useAuth from '../hooks/useAuth';

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const { initialized, user, isLoading, error, loginWithEmail, logout } = useAuth();

  return (
    <AuthContext.Provider
      value={{
        initialized,
        user,
        isLoading,
        error,
        loginWithEmail,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
