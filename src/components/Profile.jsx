import { FirestoreDocument } from 'react-firestore';
import { firebase, auth } from '../firebase';
import { useState, useEffect } from 'react';
import useForm from '../hooks/useForm';
import Loading from './Loading';
import React from 'react';
import { Button, Card, Elevation, Overlay } from '@blueprintjs/core';

const Profile = () => {
  const [user] = useState(auth.getCurrentUser());
  console.log(`this one => ${user.uid}`);

  const [formState, setformState] = useState({});
  const [toggleState, settoggleState] = useState(false);
  useEffect(() => {
    const docRef = firebase
      .firestore()
      .collection('profiles')
      .doc(user.uid);

    docRef
      .get()
      .then(function(doc) {
        setformState(doc.data());
      })
      .catch(function(error) {
        console.log('Error getting document:', error);
      });
  }, [user.uid]);

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
  const showForm = () => {
    toggleState ? settoggleState(false) : settoggleState(true);
  };
  console.log('This is the state', formState.DOB);
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
            <Card elevation={Elevation.TWO}>
              <div className="container">
                <div className="card grey lighten-1  ">
                  <div class="card-content black-text">
                    <span class="card-title">Profile</span>
                    <ul className="row">
                      <li className="col s12">
                        <span className="red-text text-darken-2">First Name</span> {data.first_name}
                      </li>
                      <li className="col s12">
                        <span className="red-text text-darken-2">Last Name</span> {data.last_name}{' '}
                      </li>

                      <li className="col s12">DOB {data.DOB}</li>
                      <li className="col s12">Bio {data.bio}</li>
                      <li className="col s12">Condition details {data.condition_details}</li>

                      <li className="col s12">Likes {data.likes}</li>
                      <li className="col s12">Looking for {data.looking_for}</li>
                      <li className="col s12">Your contidion {data.what_ails_you}</li>
                      <li className="col s12">Zip Code {data.zip_code}</li>
                    </ul>
                    <Button onClick={showForm}>Update</Button>
                  </div>
                </div>

                <Overlay usePortal={true} isOpen={toggleState}>
                  <Card elevation={Elevation.TWO}>
                    <form id="profileForm" onSubmit={handleSubmit}>
                      <input
                        name="first_name"
                        placeholder="First Name"
                        value={values.first_name || ` ${formState.first_name}`}
                        onChange={handleChange}
                      />
                      <input
                        name="last_name"
                        placeholder="Last Name"
                        value={values.last_name || ` ${formState.last_name}`}
                        onChange={handleChange}
                      />
                      <input
                        name="DOB"
                        placeholder="DOB"
                        value={values.DOB || ` ${formState.DOB}`}
                        onChange={handleChange}
                      />
                      <input
                        name="bio"
                        placeholder="Bio"
                        value={values.bio || ` ${formState.bio}`}
                        onChange={handleChange}
                      />
                      <input
                        name="condition_details"
                        placeholder="Condition Details"
                        value={values.condition_details || ` ${formState.condition_details}`}
                        onChange={handleChange}
                      />
                      <input
                        name="likes"
                        placeholder="Likes"
                        value={values.likes || ` ${formState.likes}`}
                        onChange={handleChange}
                      />
                      <input
                        name="looking_for"
                        placeholder="Looking For"
                        value={values.looking_for || ` ${formState.looking_for}`}
                        onChange={handleChange}
                      />
                      <input
                        name="what_ails_you"
                        placeholder="Your Condition"
                        value={values.what_ails_you || ` ${formState.what_ails_you}`}
                        onChange={handleChange}
                      />
                      <input
                        name="zip_code"
                        placeholder="Zip Code"
                        value={values.zip_code || ` ${formState.zip_code}`}
                        onChange={handleChange}
                      />
                      <Button onClick={showForm} type="submit">
                        PressMe
                      </Button>
                    </form>
                  </Card>
                </Overlay>
              </div>
            </Card>
          );
        }}
      />
    </div>
  );
};

export default Profile;
