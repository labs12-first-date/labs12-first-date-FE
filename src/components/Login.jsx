import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import useForm from '../hooks/useForm';
import { auth } from '../firebase';
import { UserContext } from '../contexts/UserContext';

const Login = () => {
  const [loginError, setLoginError] = useState(null);
  const loggedInUser = useContext(UserContext);

  const { values: login, handleChange, handleSubmit } = useForm(async () => {
    setLoginError(null);
    try {
      await auth.loginWithEmail(login.email, login.password);
    } catch (error) {
      setLoginError(error.message);
      console.log(error);
    }
  });

  // change later
  if (loggedInUser) return <Redirect to="/" />;

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="white">
        <h5 className="grey-text text-darken-3">SignIn</h5>
        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            value={login.email || ''}
          />
        </div>
        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
            value={login.password || ''}
          />
        </div>
        <button className="btn pink lighten-1 Z-depth-0">Login</button>

        {loginError && <p>{loginError}</p>}
      </form>
    </div>
  );
};

export default Login;
