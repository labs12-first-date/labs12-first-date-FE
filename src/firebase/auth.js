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

const createUserWithEmail = async (email, password) => {
  try {
    await fb.auth().createUserWithEmailAndPassword(email, password);
  } catch (error) {
    console.log(error);
  }
};

const getCurrentUser = () => fb.auth().currentUser;

const onUserChange = callback => {
  fb.auth().onAuthStateChanged(callback);
};


  //RESET PROFILE PASSWORD
  const resetPassword = () => {

    const user = fb.auth().currentUser;
    
    if (user) {
      const auth = fb.auth();
      const emailAddress = user.email;

      auth.sendPasswordResetEmail(emailAddress).then(() => {
        // Email sent.
      }).catch((error) => {
        // An error happened.
      });

      console.log(emailAddress);
    } else {
     console.log({ error: 'No user id is available' })
    }

    console.log('hello')
    
  }


  //DELETE PROFILE
  const deleteProfile = () => {
    const user = fb.auth().currentUser;
    console.log('delete button clicked')
    user.delete().then(() => {
      console.log('profile deleted')

      // User deleted.
    }).catch((error) => {
      // An error happened.
    });
  }
 


export default {
  loginWithEmail,
  logout,
  getCurrentUser,
  onUserChange,
  createUserWithEmail,
  deleteProfile,
  resetPassword,
  
};
