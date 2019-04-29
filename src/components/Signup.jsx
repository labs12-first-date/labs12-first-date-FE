import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import useForm from '../hooks/useForm';

const Signup = () => {
  return (
    <>
      <h1>Sign up now to find the love of your life!</h1>
      <form>
        <input type='email' placeholder='Email' />
        <input type='password' placeholder='Password' />
      </form>
    </>
  );
};

export default Signup;
