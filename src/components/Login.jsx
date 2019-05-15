import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import useForm from '../hooks/useForm';
import { auth, firebase } from '../firebase';
import logo from '../image/UnBlush.png';
import Navigation from '../components/LoggedoutNavigation';
import './Login.css';

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/thunderdome',
  // We will display Google and Github + Email as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ]
};

const Login = () => {
  const { values, handleChange, handleSubmit } = useForm(() => {
    auth.resetPasswordNoLogin(values.email);
  });
  return (
    <>
      <Navigation />
      <div id="login-signup">
        <img src={logo} alt="logo" />

        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
        <div id="form">
          <form onSubmit={handleSubmit}>
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={values.email || ''}
              onChange={handleChange}
            />
          </form>
          <button id="btn-reset">Reset Password</button>
        </div>
      </div>
    </>
  );
};

export default Login;
