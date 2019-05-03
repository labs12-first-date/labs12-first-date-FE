import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import useForm from '../hooks/useForm';
import { auth, firebase } from '../firebase';
import { Button } from '@blueprintjs/core';
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
    <div>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      <div id="form">
        <form onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={values.email || ''}
            onChange={handleChange}
          />
          <div>
            <Button intent="danger" icon="refresh">
              Reset Password
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
