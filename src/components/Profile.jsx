import { firebase, auth } from '../firebase';
import { FirestoreDocument } from 'react-firestore';
import { useState, useEffect } from 'react';
import useForm from '../hooks/useForm';
import Loading from './Loading';
import React from 'react';
import './Profile.css';
import { Button, Card, Elevation, Overlay } from '@blueprintjs/core';

const Profile = ({ history }) => {
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
              <div className='box'>
                <Card elevation={Elevation.TWO}>
                  <div className='container'>
                    <div className='card grey lighten-1'>
                      <div className='card-content black-text'>
                        <span className='card-title'>Profile</span>
                        <ul className='row'>
                          <li className='col s12'>
                            <span className='red-text text-darken-2'>
                              First Name:
                            </span>{' '}
                            {data.first_name}
                          </li>
                          <li className='col s12'>
                            <span className='red-text text-darken-2'>
                              Last Name:
                            </span>{' '}
                            {data.last_name}{' '}
                          </li>
                          <li className='col s12'>{`Age: ${data.age}`}</li>
                          <li className='col s12'>Bio: {data.bio}</li>
                          <li className='col s12'>
                            Condition details: {data.condition_description}
                          </li>
                          <li className='col s12'>Likes: {data.likes || 0}</li>
                          <li className='col s12'>
                            Looking for:{' '}
                            {data.match_gender.map(e => {
                              return e.value;
                            })}
                          </li>
                          <li className='col s12'>
                            Your contidion:{' '}
                            {data.conditions.map(e => {
                              return e.value;
                            })}
                          </li>
                          <li className='col s12'>Zip Code: {data.zip_code}</li>
                        </ul>
                        <Button
                          icon='refresh'
                          intent='danger'
                          onClick={showForm}
                        >
                          Update
                        </Button>
                      </div>
                    </div>

                    <Overlay usePortal={true} isOpen={toggleState}>
                      <Card elevation={Elevation.TWO}>
                        <form id='profileForm' onSubmit={handleSubmit}>
                          <input
                            name='first_name'
                            placeholder='First Name'
                            value={
                              values.first_name || `${formState.first_name}`
                            }
                            onChange={handleChange}
                          />
                          <input
                            name='last_name'
                            placeholder='Last Name'
                            value={values.last_name || `${formState.last_name}`}
                            onChange={handleChange}
                          />
                          {/* <input

                          name='DOB'
                          placeholder='DOB'
                          value={values.DOB || ` ${formState.DOB}`}
                          onChange={handleChange}
                        /> */}

                          <input
                            name='bio'
                            placeholder='Bio'
                            value={values.bio || `${formState.bio}`}
                            onChange={handleChange}
                          />
                          <input
                            name='condition_details'
                            placeholder='Condition Details'
                            value={
                              values.condition_description ||
                              `${formState.condition_description}`
                            }
                            onChange={handleChange}
                          />
                          <input
                            name='looking_for'
                            placeholder='Looking For'
                            value={data.match_gender.map(e => {
                              return e.value;
                            })}
                            onChange={handleChange}
                          />
                          <input
                            name='what_ails_you'
                            placeholder='Your Condition'
                            value={data.conditions.map(e => {
                              return e.value;
                            })}
                            onChange={handleChange}
                          />
                          <input
                            type='number'
                            name='zip_code'
                            placeholder='Zip Code'
                            value={values.zip_code || `${formState.zip_code}`}
                            onChange={handleChange}
                          />
                          <div>
                            <Button
                              rightIcon='arrow-right'
                              intent='success'
                              onClick={showForm}
                              type='submit'
                            >
                              Update
                            </Button>
                          </div>
                        </form>
                      </Card>
                    </Overlay>
                  </div>
                </Card>
              </div>
            );
          }
        }}
      />
    </div>
  );
};

export default Profile;
