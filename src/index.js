import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { FirestoreProvider } from 'react-firestore';
import { firebase } from './firebase';

ReactDOM.render(
  <AuthProvider>
    <FirestoreProvider firebase={firebase}>
      <App />
    </FirestoreProvider>
  </AuthProvider>,
  document.getElementById('root')
);
