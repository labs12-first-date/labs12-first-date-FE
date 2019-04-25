import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Login from './components/Login';
import Logout from './components/Logout';
import { UserProvider } from './contexts/UserContext';

const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <div>
          <Navigation />
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
          </Switch>
        </div>
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;
