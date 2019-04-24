import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
const App = () => {
  return (
    <BrowserRouter>
      <div>
        <h1>The Most Awkward Dating</h1>
        <Switch>
          <Route path='/login' component={Login} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
