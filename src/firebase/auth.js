import firebase from './config';
import { toast } from 'react-toastify';

const loginWithEmail = async (email, password) => {
  await firebase.auth().signInWithEmailAndPassword(email, password);
};

const logout = () => {
  try {
    firebase.auth().signOut();
  } catch (error) {
    console.log(error);
  }
};

const createUserWithEmail = async (email, password) => {
  await firebase.auth().createUserWithEmailAndPassword(email, password);
};

const getCurrentUser = () => firebase.auth().currentUser;

const onUserChange = callback => {
  firebase.auth().onAuthStateChanged(callback);
};

//RESET PROFILE PASSWORD
const resetPassword = () => {
  const user = firebase.auth().currentUser;
  if (user) {
    const auth = firebase.auth();
    const emailAddress = user.email;
    auth
      .sendPasswordResetEmail(emailAddress)
      .then(() => {
        // Email sent.
      })
      .catch(error => {
        // An error happened.
      });
    console.log(emailAddress);
  } else {
    console.log({ error: 'No user id is available' });
  }
};

// RESET PROFILE PASSWORD NOT LOGGED IN
const resetPasswordNoLogin = email => {
  if (email) {
    const auth = firebase.auth();
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        // Email sent.
      })
      .catch(error => {
        // An error happened.
      });
    console.log(email);
  } else {
    console.log({ error: 'No user id is available' });
  }
};

//DELETE PROFILE
const deleteProfile = () => {
  const user = firebase.auth().currentUser;
  console.log('delete button clicked');
  user
    .delete()
    .then(() => {
      console.log('profile deleted');

      // User deleted.
    })
    .catch(error => {
      // An error happened.
    });
};

export default {
  loginWithEmail,
  logout,
  getCurrentUser,
  onUserChange,
  createUserWithEmail,
  deleteProfile,
  resetPassword,
  resetPasswordNoLogin
};
