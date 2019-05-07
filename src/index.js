import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { FirestoreProvider } from 'react-firestore';
import { firebase } from './firebase';
import 'normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';

ReactDOM.render(
  <AuthProvider>
    <FirestoreProvider firebase={firebase}>
      <App />
    </FirestoreProvider>
  </AuthProvider>,
  document.getElementById('root')
);
