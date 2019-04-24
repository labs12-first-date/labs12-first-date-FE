import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
