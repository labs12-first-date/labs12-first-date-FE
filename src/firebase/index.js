// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from 'firebase/app';

// Add the Firebase products that you want to use
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCh8HsamWff6ZKG1i-1FLvpdkOCHL3EdWA',
  authDomain: 'awk-dating.firebaseapp.com',
  databaseURL: 'https://awk-dating.firebaseio.com',
  projectId: 'awk-dating',
  storageBucket: 'awk-dating.appspot.com',
  messagingSenderId: '188664002086'
};
const firebase = firebase.initializeApp(firebaseConfig);

export default {
  auth: firebase.auth(),
  db: firebase.firestore(),
  storage: firebase.storage()
};
