import { firebase, auth } from '../../firebase';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../Loading';

const LocationDistance = () => {
  const [user] = useState(auth.getCurrentUser());
  const [profileState, setProfileState] = useState(null); //profile
  const [location, setLocation] = useState(null); //location
  const [formState, setFormState] = useState(null); //settings

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
  }, []);

  //Get user settings
  useEffect(() => {
    if (user) {
      const docRef = firebase
        .firestore()
        .collection('settings')
        .doc(user.uid);

      docRef
        .get()
        .then(function(doc) {
          setFormState(doc.data());
        })
        .catch(function(error) {
          console.log('Error getting document:', error);
        });
    }
  }, [user]);

  //Get location radius array
  useEffect(() => {
    if (profileState && formState) {
      const zip = profileState.zip_code;
      const dist = formState.match_distance;
      const getData = async () => {
        const result = await axios(
          `https://api.zip-codes.com/ZipCodesAPI.svc/1.0/FindZipCodesInRadius?zipcode=${zip}&minimumradius=0&maximumradius=${dist}&key=DEMOAPIKEY`
        );

        setLocation(result.data);
      };
      getData();
    }
  }, [profileState, formState]);

  return !location ? (
    <Loading />
  ) : (
    <div>{/* <p>Location does exist!!!</p> */}</div>
  );
};

export default LocationDistance;
