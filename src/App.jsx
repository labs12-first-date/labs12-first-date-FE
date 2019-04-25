import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Login from './components/Login';
import Logout from './components/Logout';
import { AuthProvider } from './contexts/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div>
          <Navigation />
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
          </Switch>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
