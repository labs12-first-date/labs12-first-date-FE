import { auth } from './index';

function signInWithEmailAndPassword(email, password) {
  try {
    auth.signInWithEmailAndPassword(email, password);
  } catch (error) {
    console.log(error);
  }
}

auth.onAuthStateChanged(user => {
  if (user) {
    // User is signed in.
    console.log(user);
  } else {
    // User is signed out.
  }
});
