import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import useForm from '../hooks/useForm';

const Signup = () => {
  const { values, handleChange, handleSubmit } = useForm(() => {
    // on submit
  });
  return (
    <>
      <h1>Sign up now to find the love of your life!</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={values.email || ''}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          value={values.password || ''}
          onChange={handleChange}
        />
        <button>Sign up</button>
      </form>
    </>
  );
};

export default Signup;
