import { firebase } from '../../firebase';

const db = firebase.firestore();

const updateAllProfiles = async () => {
  const querySnapshot = await db.collection('profiles').get();
  querySnapshot.forEach(doc => {
    const docRef = db.collection('profiles').doc(doc.id);
    docRef.update({
      last_swipe_timestamp: firebase.firestore.FieldValue.serverTimestamp()
      // swipes_remaining: appConfig.profileDefaults.swipes_remaining
    });
    console.log('set!');
  });
};
