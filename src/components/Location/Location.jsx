import { firebase, auth } from '../../firebase';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../Loading';

const LocationDistance = () => {
  const [user] = useState(auth.getCurrentUser());
  const [profileState, setProfileState] = useState(null);//profile
  const [location, setLocation] = useState(null); //location


  //Gets user profile
  useEffect(() => {
    const docRef = firebase
      .firestore()
      .collection('profiles')
      .doc(user.uid);
    docRef
      .get()
      .then(function(doc) {
        setProfileState(doc.data());
        //console.log('DOC', doc.data());
      })
      .catch(function(error) {
        console.log('Error getting document:', error);
        // history.replace('/welcome');
      });
      console.log('PROFILE useEffect')


  }, []);


  //Get location radius array
  useEffect(() => {
    if(profileState) {
      const zip = profileState.zip_code;
      const getData = async () => {
        const result = await axios(
          `https://api.zip-codes.com/ZipCodesAPI.svc/1.0/FindZipCodesInRadius?zipcode=${zip}&minimumradius=0&maximumradius=10&key=DEMOAPIKEY`
        );
        console.log('LOCATION useEffect');
        setLocation(result.data);
  
      };
      getData();
    }
  }, [profileState]);



  console.log('PROFILE STATE is', profileState);
  console.log('LOCATION is', location);


  return (!location) ? (
    <Loading />
  ) : (
    <div>
      {/* <p>Location does exist!!!</p> */}
      {console.log(
        'API data is mapped',
        location.DataList.map(data => {
          return data.Code;
        })
      )}
    </div>
  );


};

export default LocationDistance;