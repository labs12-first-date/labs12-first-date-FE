import { FirestoreDocument } from 'react-firestore';
import { auth } from '../firebase';
import firebase from 'firebase';
import { useState, useEffect } from 'react';
import useForm from '../hooks/useForm';
import Loading from './Loading';
import React from 'react';
import { Button, Card, Overlay, Elevation } from '@blueprintjs/core';
import './Settings.css';
// import { Redirect } from 'react-router-dom';

const Settings = ({ history }) => {
  const [user] = useState(auth.getCurrentUser());
  const [formState, setformState] = useState({});
  const [toggleState, settoggleState] = useState(false);

  useEffect(() => {
    if (user) {
      const docRef = firebase
        .firestore()
        .collection('settings')
        .doc(user.uid);

      docRef
        .get()
        .then(function(doc) {
          setformState(doc.data());
        })
        .catch(function(error) {
          console.log('Error getting document:', error);
        });
    }
  }, [user]);

  const { values, handleChange, handleSubmit } = useForm(() => {
    firebase
      .firestore()
      .collection('settings')
      .doc(user.uid)
      .update(values)
      .then(function() {
        console.log('Document successfully written!');
      });
  });

  const showForm = () => {
    toggleState ? settoggleState(false) : settoggleState(true);
  };

  console.log('This value ======>', values);

  if (!user) return <div>No user logged in</div>;

  return (
    <div>
      <FirestoreDocument
        path={`settings/${user.uid}`}
        render={({ isLoading, data }) => {
          console.log(data);

          return isLoading ? (
            <Loading />
          ) : (
            <Card className="how" elevation={Elevation.TWO}>
              <div className="container">
                <div className="card grey lighten-1  ">
                  <div class="card-content black-text">
                    <span class="card-title">Profile</span>
                    <ul className="row">
                      <li className="col s12">
                        <span className="red-text text-darken-2">
                          Maximum Match Age:
                        </span>{' '}
                        {data.match_age_max}
                      </li>
                      <li className="col s12">
                        <span className="red-text text-darken-2">
                          Minimum Match Age:
                        </span>{' '}
                        {data.match_age_min}{' '}
                      </li>

                      <li className="col s12">
                        Match Distance Range: {data.match_distance}
                      </li>
                    </ul>
                  </div>
                  <div className="buttons">
                    <Button intent="success" icon="arrow" onClick={showForm}>
                      Update Match Settings
                    </Button>
                    <Button
                      intent="danger"
                      icon="refresh"
                      onClick={auth.resetPassword}
                    >
                      Reset Password
                    </Button>{' '}
                    {/*sends an email to user to reset password */}
                    <Button
                      onClick={() => {
                        history.replace('/');
                        auth.deleteProfile();
                      }}
                      icon="disable"
                      intent="danger"
                    >
                      Delete Your Profile
                    </Button>{' '}
                    {/*deletes the user profile */}
                  </div>
                </div>
                <div className="dropForm">
                  <Overlay usePortal={true} isOpen={toggleState}>
                    <Card elevation={Elevation.TWO}>
                      <form id="profileForm" onSubmit={handleSubmit}>
                        <input
                          name="match_age_max"
                          placeholder="Max Age"
                          value={
                            values.match_age_max ||
                            ` ${formState.match_age_max}`
                          }
                          onChange={handleChange}
                        />
                        <input
                          name="match_age_min"
                          placeholder="Min Age"
                          value={
                            values.match_age_min ||
                            ` ${formState.match_age_min}`
                          }
                          onChange={handleChange}
                        />
                        <input
                          name="match_distance"
                          placeholder="Distance"
                          value={
                            values.match_distance ||
                            ` ${formState.match_distance}`
                          }
                          onChange={handleChange}
                        />
                      </form>
                      <div id="drop-form-btn">
                        <Button
                          rightIcon="arrow-right"
                          intent="success"
                          onClick={showForm}
                          type="submit"
                        >
                          Submit Settings Changes
                        </Button>
                      </div>
                    </Card>
                  </Overlay>
                </div>
              </div>
            </Card>
          );
        }}
      />
    </div>
  );
};

export default Settings;
