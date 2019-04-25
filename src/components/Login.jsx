import React, { useContext } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import useForm from '../hooks/useForm';
import { AuthContext } from '../contexts/AuthContext';

const Login = ({ history }) => {
  const { user, loginWithEmail, error } = useContext(AuthContext);

  const { values: login, handleChange, handleSubmit } = useForm(async () => {
    loginWithEmail(login.email, login.password);
    // where to next?
    history.replace('/now-logged-in');
  });

  // are we already logged in?
  if (user) return <Redirect to="/now-logged-in" />;

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
            autoFocus
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

        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default withRouter(Login);
