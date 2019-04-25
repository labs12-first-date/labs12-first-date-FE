import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Login from './components/Login';
import Logout from './components/Logout';
import { AuthContext } from './contexts/AuthContext';

const App = () => {
  const { initialized } = useContext(AuthContext);

  // change this to something more user-friendly, e.g. a nice spinner
  if (!initialized) return <div>Loading...</div>;

  return (
    <BrowserRouter>
      <div>
        <Navigation />
        <h1>The Most Awkward Dating</h1>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
