import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import useForm from '../hooks/useForm';
import { auth } from '../firebase';
import { withRouter } from 'react-router-dom';

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/welcome',
  // We will display Google and Github + Email as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID
  ]
};

const Signup = ({ history }) => {
  const { values, handleChange, handleSubmit } = useForm(() => {
    auth.createUserWithEmail(values.email, values.password);
    history.replace('/welcome');
  });
  return (
    <>
      <h1>Sign up now to find the love of your life!</h1>
      <form onSubmit={handleSubmit}>
        <input
          name='email'
          type='email'
          placeholder='Email'
          value={values.email || ''}
          onChange={handleChange}
        />
        <input
          name='password'
          type='password'
          placeholder='Password'
          value={values.password || ''}
          onChange={handleChange}
        />
        <button>Sign up</button>
      </form>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </>
  );
};

export default withRouter(Signup);
