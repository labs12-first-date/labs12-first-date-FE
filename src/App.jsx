import React, { useState, useContext } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Login from './components/Login';
import Logout from './components/Logout';
// import Dashboard from './components/Dashboard';

import Profile from './components/Profile';
import { AuthContext } from './contexts/AuthContext';

const App = () => {
  const { isInitialized, user } = useContext(AuthContext);

  // change this to something more user-friendly, e.g. a nice spinner
  if (!isInitialized) return <div>Loading...</div>;

  return (
    <BrowserRouter>
      <div className="container">
        <Navigation />
        <h1 className="center">The Most Awkward Dating</h1>
        {user && (
          <p className="center">
            Signed in as <em>{user.email}</em>
          </p>
        )}
        <Switch>
          {/* <Route exact path="/" component={Dashboard} /> */}
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
