import { firebase, auth } from '../firebase';
import { FirestoreDocument } from 'react-firestore';
import { useState, useEffect } from 'react';
import FileUploader from 'react-firebase-file-uploader';
import useForm from '../hooks/useForm';
import Loading from './Loading';
import React from 'react';
import './Profile.css';
import { Button, Card, Elevation, Overlay } from '@blueprintjs/core';

const Profile = ({ history }) => {
  const [user] = useState(auth.getCurrentUser());
  const [photoValues, setphotoValues] = useState({});
  const [formValues, setFormValues] = useState({});

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

  useEffect(() => {
    // TODO don't make network call for every keystroke
    if (user) {
      firebase
        .firestore()
        .collection('profiles')
        .doc(user.uid)
        .update(formValues)
        .then(function() {
          console.log('Document successfully written!');
        });
    }
  }, [formValues, user]);

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

  const handleChanges = ({ field, value }) => {
    setFormValues(previousValues => {
      return { ...previousValues, [field]: value };
    });
  };

  const handleUploadSuccess = filename => {
    setphotoValues({ profile_picture: filename });
    firebase
      .storage()
      .ref('images')
      .child(filename)
      .getDownloadURL()
      .then(url => {
        handleChanges({ field: 'profile_picture', value: url });
        showForm();
      });
  };
  return (
    <div>
      <FirestoreDocument
        path={`profiles/${user.uid}`}
        render={({ isLoading, data }) => {
          console.log('DATA', data);

          if (isLoading) {
            return <Loading />;
          } else if (!data.profile_completed) {
            history.push('/welcome');
            window.location.reload();
          } else {
            return (
              <div className="box">
                <div className="container">
                  <div className="content-left">
                    <img src={data.profile_picture} alt="profile" />
                  </div>
                  <div className="right-content">
                    <h2 className="card-title">About</h2>

                    <p>
                      <span className="red-text text-darken-2">Name:</span>{' '}
                      {data.first_name} {data.last_name}
                      <hr />
                      Bio : {data.bio}
                    </p>

                    <p>{`Age: ${data.age}`}</p>

                    <p>Condition details: {data.condition_description}</p>
                    <p>Likes: {data.likes || 0}</p>
                    <p>
                      Looking for:{' '}
                      {data.match_gender.map(e => {
                        return e.value;
                      })}
                    </p>
                    <p>
                      Your contidion:{' '}
                      {data.conditions.map(e => {
                        return e.value;
                      })}
                    </p>
                    <p>Zip Code: {data.zip_code}</p>

                    <button className="btn-update" onClick={showForm}>
                      Update
                    </button>
                  </div>
                  <div id="profile-card-modal">
                  <Overlay usePortal={true} isOpen={toggleState}>
                    <Card elevation={Elevation.TWO}>
                      <div className="udate-dropDown">
                        <img src={formState.profile_picture} alt="profile" />
                        <FileUploader
                          accept="image/*"
                          name="profile_picture"
                          randomizeFilename
                          storageRef={firebase.storage().ref('images')}
                          // onUploadStart={handleUploadStart}
                          // onUploadError={handleUploadError}
                          onUploadSuccess={handleUploadSuccess}
                          // onProgress={handleProgress}
                        />
                      </div>

                      <form id="profileForm" onSubmit={handleSubmit}>
                        <input
                          name="first_name"
                          placeholder="First Name"
                          value={
                            values.first_name || ` ${formState.first_name}`
                          }
                          onChange={handleChange}
                        />
                        <input
                          name="last_name"
                          placeholder="Last Name"
                          value={values.last_name || ` ${formState.last_name}`}
                          onChange={handleChange}
                        />
                        {/* <input

                          name='DOB'
                          placeholder='DOB'
                          value={values.DOB || ` ${formState.DOB}`}
                          onChange={handleChange}
                        /> */}

                        <input
                          name="bio"
                          placeholder="Bio"
                          value={values.bio || ` ${formState.bio}`}
                          onChange={handleChange}
                        />
                        <input
                          name="condition_details"
                          placeholder="Condition Details"
                          value={
                            values.condition_description ||
                            ` ${formState.condition_description}`
                          }
                          onChange={handleChange}
                        />
                        <input
                          name="looking_for"
                          placeholder="Looking For"
                          value={data.match_gender.map(e => {
                            return e.value;
                          })}
                          onChange={handleChange}
                        />
                        <input
                          name="what_ails_you"
                          placeholder="Your Condition"
                          value={data.conditions.map(e => {
                            return e.value;
                          })}
                          onChange={handleChange}
                        />
                        <input
                          type="number"
                          name="zip_code"
                          placeholder="Zip Code"
                          value={values.zip_code || `${formState.zip_code}`}
                          onChange={handleChange}
                        />
                        <div>
                          <Button
                            rightIcon="arrow-right"
                            intent="success"
                            onClick={showForm}
                            type="submit"
                          >
                            Update
                          </Button>
                        </div>
                      </form>
                    </Card>
                  </Overlay>
                  </div>
                </div>
              </div>
            );
          }
        }}
      />
    </div>
  );
};

export default Profile;
