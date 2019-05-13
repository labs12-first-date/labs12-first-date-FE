import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';
import Navigation from './components/Navigation';
import Login from './components/Login';
import Logout from './components/Logout';
import Signup from './components/Signup';
import NotFound from './components/Settings';
import Settings from './components/Settings';
import './App.css';
import Thunderdome from './components/thunderDome/ThunderDeck.jsx';
import SessionsList from './components/messaging/SessionsList';
import Session from './components/messaging/Session';
import Profile from './components/Profile';
import Onboarding from './components/onboarding/Onboarding';
import MainPage from './components/MainPage'
// import LocationDistance from './components/Location/Location';

const App = () => {
  const { isInitialized, user } = useContext(AuthContext);

  // just for logging
  // React.useEffect(() => {
  //   if (isInitialized && user) console.log(user.uid);
  // }, [user, isInitialized]);

  return !isInitialized ? (
    <div>Loading...</div>
  ) : (
    <BrowserRouter>
      <>
        <Navigation userNow={user} />

        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/profile" component={Profile} />
          <Route path="/signup" component={Signup} />
          <Route path="/welcome" component={Onboarding} />
          <Route path="/settings" component={Settings} />
          <Route path="/thunderdome" component={Thunderdome} />
          <Route exact path="/chats" component={SessionsList} />
          <Route path="/chats/:chatId" component={Session} />
          <Route component={NotFound} />
        </Switch>
        {/* <LocationDistance /> */}
      </>
    </BrowserRouter>
  );
};

export default App;
