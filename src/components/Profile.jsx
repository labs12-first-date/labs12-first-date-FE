import { FirestoreDocument } from 'react-firestore';
import { auth } from '../firebase';
import { useState } from 'react';

import Loading from './Loading';

import React from 'react';

const Profile = () => {
  const [user, setUser] = useState(auth.getCurrentUser());
  console.log(`this one => ${user.uid}`);

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
            </div>
          );
        }}
      />
    </div>
  );
};

export default Profile;
