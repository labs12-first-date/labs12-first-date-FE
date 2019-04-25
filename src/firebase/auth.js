import fb from './config';

const loginWithEmail = async (email, password) => {
  await fb.auth().signInWithEmailAndPassword(email, password);
};

const logout = () => {
  try {
    fb.auth().signOut();
  } catch (error) {
    console.log(error);
  }
};

const getCurrentUser = () => fb.auth().currentUser;

const onUserChange = callback => {
  fb.auth().onAuthStateChanged(callback);
};

export default {
  loginWithEmail,
  logout,
  getCurrentUser,
  onUserChange
};
