import axios from 'axios';
import { firebase } from '../firebase';

const db = firebase.firestore();

async function getZipsInRadius(zipCode, distanceMiles) {
  try {
    const { data } = await axios(
      `https://api.zip-codes.com/ZipCodesAPI.svc/1.0/FindZipCodesInRadius?zipcode=${zipCode}&minimumradius=0&maximumradius=${distanceMiles}&key=79TDJIHGIB3LAHFEUCHK`
    );
    return data.DataList.map(z => z.Code);
  } catch (error) {
    console.error('Error fetching zip codes: ', error);
  }
}

export default async function setUserNearbyZips(uid, zipCode) {
  const settingsSnapshot = await db
    .collection('settings')
    .doc(uid)
    .get();
  const distance = settingsSnapshot.data().match_distance || 10;
  const nearbyZips = await getZipsInRadius(zipCode, distance);
  try {
    await db
      .collection('profiles')
      .doc(uid)
      .update({
        nearby_zip: nearbyZips
      });
    console.log('nearby zips set: ', nearbyZips);
  } catch (error) {
    console.error('Cannot save zip codes to user profile: ', error);
  }
}
