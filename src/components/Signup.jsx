import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import logo from '../image/UnBlush.png';
import useForm from '../hooks/useForm';
import { auth, firebase } from '../firebase';
import { withRouter } from 'react-router-dom';
import Navigation from '../components/Navigation';
import './Signup.css';
import { toast } from 'react-toastify';

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

const sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

const Signup = ({ history }) => {
  const { values, handleChange, handleSubmit } = useForm(async () => {
    try {
      await auth.createUserWithEmail(values.email, values.password);
      sleep(500).then(() => {
        history.replace('/welcome');
      });
    } catch (error) {
      toast(error.message);
    }
  });
  return (
    <>
      <Navigation />
      <div id='form1'>
        <img src={logo} alt='logo' />

        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />

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
          <button id='signup-btn'>Sign up</button>
        </form>
      </div>
    </>
  );
};

export default withRouter(Signup);
