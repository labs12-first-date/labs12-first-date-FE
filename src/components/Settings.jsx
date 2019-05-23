import { FirestoreDocument } from 'react-firestore';
import { auth, firebase } from '../firebase';
import React, { useState, useEffect } from 'react';
import useForm from '../hooks/useForm';
import Loading from './Loading';
import Navigation from './Navigation';
import ReactDOM from 'react-dom';
import setUserNearbyZips from '../helpers/setUserNearbyZips';
import StripeApp from './stripe/StripeApp.jsx';
import './Settings.css';

const db = firebase.firestore();

const ToggleUpgrade = ({ toggle, upgrade }) => {
  const [isUpgradeShown, setIsUpgradeShown] = useState(false);
  const hideUpgrade = () => setIsUpgradeShown(false);
  const showUpgrade = () => setIsUpgradeShown(true);

  return (
    <>
      {toggle(showUpgrade)}
      {isUpgradeShown && upgrade(hideUpgrade)}
    </>
  );
};

const UpgradeModal = ({ children }) =>
  ReactDOM.createPortal(
    <div className='modal'>{children}</div>,
    document.getElementById('modal-root')
  );

const ToggleContent = ({ toggle, content }) => {
  const [isShown, setIsShown] = useState(false);
  const hide = () => setIsShown(false);
  const show = () => setIsShown(true);

  return (
    <>
      {toggle(show)}
      {isShown && content(hide)}
    </>
  );
};

const Modal = ({ children }) =>
  ReactDOM.createPortal(
    <div className='modal'>{children}</div>,
    document.getElementById('modal-root')
  );

const Settings = ({ history }) => {
  const [user] = useState(auth.getCurrentUser());
  const [formValues, setformValues] = useState({});
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

  useEffect(() => {
    // TODO don't make network call for every keystroke
    const persistFormValues = async () => {
      db.collection('settings')
        .doc(user.uid)
        .update(formValues);
    };

    if (user) persistFormValues();
  }, [formValues, user]);

  const handleChanges = ({ field, value }) => {
    setformValues(previousValues => {
      return { ...previousValues, [field]: value };
    });
  };

  const { values, handleSubmit } = useForm(() => {
    const getNearbyZips = async () => {
      const profileSnapshot = await db
        .collection('profiles')
        .doc(user.uid)
        .get();
      const zip = profileSnapshot.data().zip_code || null;
      if (zip) setUserNearbyZips(user.uid, zip);
    };

    firebase
      .firestore()
      .collection('settings')
      .doc(user.uid)
      .update(values)
      .then(function() {
        console.log('Document successfully written!');
      });
    getNearbyZips();
  });

  if (!user) return <div>No user logged in</div>;

  return (
    <div>
      <Navigation />

      <FirestoreDocument
        path={`settings/${user.uid}`}
        render={({ isLoading, data }) => {
          return isLoading ? (
            <Loading />
          ) : (
            <div className='set-container'>
              <div className='card grey lighten-1  '>
                <div className='set-card-content '>
                  <span id='set-settings'>Settings</span>
                  <ul id='setting-ul' className='row'>
                    <li className='col s12'>
                      Minimum Match Age:
                      {data.match_age_min}
                    </li>
                    <li className='col s12'>
                      <span className='red-text text-darken-2'>
                        Maximum Match Age:
                      </span>{' '}
                      {data.match_age_max}
                    </li>

                    <li className='col s12'>
                      Match Distance Range:{data.match_distance}
                    </li>
                  </ul>
                </div>
                <div className='buttons'>
                  <ToggleContent
                    className='modal'
                    toggle={show => (
                      <button
                        className='btn-update-settings'
                        onClick={() => {
                          show();
                          settoggleState(true);
                        }}
                      >
                        Update Settings
                      </button>
                    )}
                    content={hide => (
                      <Modal className='modal'>
                        <>
                          <p>
                            What is the Minimum Age you would like to match
                            with?
                            <input
                              type='number'
                              name='match_age_min'
                              placeholder='Minimum Age'
                              value={data.match_age_min}
                              onChange={e =>
                                handleChanges({
                                  field: 'match_age_min',
                                  value: Number(e.target.value)
                                })
                              }
                            />
                          </p>
                          <p>
                            What is the Maximum Age you would like to match
                            with?
                            <input
                              type='number'
                              name='match_age_max'
                              placeholder='Maximum Age'
                              value={data.match_age_max}
                              onChange={e =>
                                handleChanges({
                                  field: 'match_age_max',
                                  value: Number(e.target.value)
                                })
                              }
                            />
                          </p>
                          <p>
                            How far would you travel for love?
                            <input
                              type='number'
                              name='match_distance'
                              placeholder='Distance'
                              value={data.match_distance}
                              onChange={e =>
                                handleChanges({
                                  field: 'match_distance',
                                  value: Number(e.target.value)
                                })
                              }
                            />
                          </p>
                        </>
                        <button
                          id='update'
                          onClick={e => {
                            handleSubmit(e);
                            hide(e);
                            settoggleState(false);
                          }}
                        >
                          Update
                        </button>{' '}
                      </Modal>
                    )}
                  />

                  <ToggleUpgrade
                    className='modal'
                    toggle={showUpgrade => (
                      <button
                        className='btn-update-settings'
                        onClick={() => {
                          settoggleState(true);
                          showUpgrade();
                        }}
                      >
                        Get More Matches!
                      </button>
                    )}
                    upgrade={hideUpgrade => (
                      <UpgradeModal className='modal'>
                        <>
                          <StripeApp />
                        </>
                        <button
                          id='close'
                          onClick={() => {
                            settoggleState(false);
                            hideUpgrade();
                          }}
                        >
                          Close
                        </button>
                      </UpgradeModal>
                    )}
                  />

                  <button className='btn-red-settings'>Reset Password</button>
                  {/*sends an email to user to reset password */}
                  <button
                    onClick={() => {
                      history.replace('/');
                      auth.deleteProfile();
                    }}
                    className='btn-red-settings'
                  >
                    Delete Your Account
                  </button>
                  {/*deletes the user profile */}

                  <div id={toggleState ? 'grayout' : null} />
                </div>
              </div>
              <div className='dropForm'>
                <div id='modal-root' />
              </div>
            </div>
          );
        }}
      />
    </div>
  );
};

export default Settings;
