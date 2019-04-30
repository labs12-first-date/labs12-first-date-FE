import { FirestoreDocument } from 'react-firestore';
import { auth } from '../firebase';
import firebase from 'firebase';
import { useState } from 'react';
import useForm from '../hooks/useForm';

import Loading from './Loading';

import React from 'react';

const Profile = () => {
  const [user] = useState(auth.getCurrentUser());
  console.log(`this one => ${user.uid}`);

  const [formState, setformState] = useState([]);

  const { values, handleChange, handleSubmit } = useForm(() => {
    firebase
      .firestore()
      .collection('profiles')
      .doc(user.uid)
      .update(values)
      .then(function() {
        console.log('Document successfully written!');
      });
  });

  console.log('This is the state', formState);
  console.log('This value ======>', values);

  return (
    <div>
      <FirestoreDocument
        path={`profiles/${user.uid}`}
        render={({ isLoading, data }) => {
          console.log(data);

          return isLoading ? (
            <Loading />
          ) : (
            <div className="container">
              <div className="card grey lighten-1  ">
                <div class="card-content black-text">
                  <span class="card-title">Profile</span>
                  <ul className="row">
                    <li className="col s12">
                      <span className="red-text text-darken-2">First Name</span>{' '}
                      {data.first_name}
                    </li>
                    <li className="col s12">
                      <span className="red-text text-darken-2">Last Name</span>{' '}
                      {data.last_name}{' '}
                    </li>

                    <li className="col s12">DOB {data.DOB}</li>
                    <li className="col s12">Bio {data.bio}</li>
                    <li className="col s12">
                      Condition details {data.condition_details}
                    </li>

                    <li className="col s12">Likes {data.likes}</li>
                    <li className="col s12">Looking for {data.looking_for}</li>
                    <li className="col s12">
                      Your contidion {data.what_ails_you}
                    </li>
                    <li className="col s12">Zip Code {data.zip_code}</li>
                  </ul>
                </div>
              </div>
              <form id="profileForm" onSubmit={handleSubmit}>
                <input
                  name="first_name"
                  placeholder="First Name"
                  value={values.first_name || ''}
                  onChange={handleChange}
                />
                <input
                  name="last_name"
                  placeholder="Last Name"
                  value={values.last_name || ''}
                  onChange={handleChange}
                />
                <input
                  name="DOB"
                  placeholder="DOB"
                  value={values.DOB || ''}
                  onChange={handleChange}
                />
                <input
                  name="bio"
                  placeholder="Bio"
                  value={values.bio || ''}
                  onChange={handleChange}
                />
                <input
                  name="condition_details"
                  placeholder="Condition Details"
                  value={values.condition_details || ''}
                  onChange={handleChange}
                />
                <input
                  name="likes"
                  placeholder="Likes"
                  value={values.likes || ''}
                  onChange={handleChange}
                />
                <input
                  name="looking_for"
                  placeholder="Looking For"
                  value={values.looking_for || ''}
                  onChange={handleChange}
                />
                <input
                  name="what_ails_you"
                  placeholder="Your Condition"
                  value={values.what_ails_you || ''}
                  onChange={handleChange}
                />
                <input
                  name="zipcode"
                  placeholder="Zip Code"
                  value={values.zipcode || ''}
                  onChange={handleChange}
                />
                <button type="submit">PressMe</button>
              </form>
            </div>
          );
        }}
      />
    </div>
  );
};

export default Profile;
