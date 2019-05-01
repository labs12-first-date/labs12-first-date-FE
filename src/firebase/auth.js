import firebase from './config';

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
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
  } catch (error) {
    console.log(error);
  }
};

const getCurrentUser = () => firebase.auth().currentUser;

const onUserChange = callback => {
  firebase.auth().onAuthStateChanged(callback);
};

export default {
  loginWithEmail,
  logout,
  getCurrentUser,
  onUserChange,
  createUserWithEmail
};
