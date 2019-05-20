import React, { useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import useForm from '../hooks/useForm';
import { auth, firebase } from '../firebase';
import logo from '../image/UnBlush.png';
import Navigation from '../components/Navigation';
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
  const [showReset, setShowReset] = useState(false);
  const { values, handleChange, handleSubmit } = useForm(() => {
    auth.resetPasswordNoLogin(values.email);
  });

  return (
    <>
      <Navigation />
      <div id="login-signup">
        <img src={logo} alt="logo" />

        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        {showReset ? (
          <div id="form">
            <h2>Reset password</h2>
            <form onSubmit={handleSubmit}>
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={values.email || ''}
                onChange={handleChange}
              />
            </form>
            <button id="btn-reset">Reset</button>
          </div>
        ) : (
          <button id="btn-show-reset" onClick={() => setShowReset(true)}>
            Forgot password?
          </button>
        )}
      </div>
    </>
  );
};

export default Login;
