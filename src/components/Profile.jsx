import { useState, useEffect, useRef } from 'react';
import { firebase, auth } from '../firebase';
import { FirestoreDocument } from 'react-firestore';
import Select from 'react-select';
import FileUploader from 'react-firebase-file-uploader';
import ReactDOM from 'react-dom';
import useForm from '../hooks/useForm';
import Loading from './Loading';
import React from 'react';
import Navigation from './Navigation';
import './Profile.css';
import { toast } from 'react-toastify';

const db = firebase.firestore();
const storage = firebase.storage();
// TODO: get cancel button to work. right now we are editing everything live so if you hit close the changes are saved. no way to cancel

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


const Profile = ({ history }) => {
  const [user] = useState(auth.getCurrentUser());
  const [formValues, setFormValues] = useState({});
  const [formState, setformState] = useState({});
  const [stdState, setstdState] = useState({});
  const [genderState, setgenderState] = useState({});
  const [toggleState, settoggleState] = useState(false);
  const uploadingToastId = useRef(null);

  useEffect(() => {
    const docRef = db.collection('profiles').doc(user.uid);
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
    db.collection('stds')
      .get()
      .then(function(querySnapShot) {
        const stds = querySnapShot.docs.map(function(doc) {
          return { ...doc.data() };
        });
        setstdState(stds);
      });
  }, []);

  useEffect(() => {
    db.collection('gender')
      .get()
      .then(function(querySnapShot) {
        const genders = querySnapShot.docs.map(function(doc) {
          return { ...doc.data() };
        });
        setgenderState(genders);
      });
  }, []);

  useEffect(() => {
    // TODO don't make network call for every keystroke
    if (user) {
      db.collection('profiles')
        .doc(user.uid)
        .update(formValues)
        .then(function() {
          console.log('Document successfully written!');
        });
    }
  }, [formValues, user]);

  const { values, handleSubmit } = useForm(() => {
    db.collection('profiles')
      .doc(user.uid)
      .update(values)
      .then(function() {
        console.log('Document successfully written!');
      });
  });

  const handleChanges = ({ field, value }) => {
    setFormValues(previousValues => {
      return { ...previousValues, [field]: value };
    });
  };

  const handleUploadSuccess = async filename => {
    toast.dismiss(uploadingToastId.current);
    const photoUrl = await storage
      .ref('images')
      .child(filename)
      .getDownloadURL();
    handleChanges({ field: 'profile_picture', value: photoUrl });
  };

  const handleProgress = filename => {
    uploadingToastId.current = toast.info('Uploading your sexy mug...');
  };

  return (
    <div>
      <Navigation />

      <FirestoreDocument
        path={`profiles/${user.uid}`}
        render={({ isLoading, data }) => {
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
                    <h2 className="card-title">My Profile</h2>
                    <p>
                      Name: {data.first_name} {data.last_name}
                    </p>
                    <p>Bio : {data.bio}</p>
                    <p>Age: {data.age}</p>
                    <p>
                      Looking for:{' '}
                      {data.match_gender.map(e => {
                        return e.value + ', ';
                      })}
                    </p>
                    <p>
                      Their condition(s):{' '}
                      {data.match_conditions.map(e => {
                        return e.value + ', ';
                      })}
                    </p>
                    <p>
                      My condition(s):{' '}
                      {data.conditions.map(e => {
                        return e.value + ', ';
                      })}
                    </p>
                    <p>Condition details: {data.condition_description}</p>
                    <p>Zip Code: {data.zip_code}</p>
                    <p>Remaining Swipes: {data.swipes_remaining}</p>

                    <div id="modal-root" />

                    <ToggleContent
                      toggle={show => (
                        <button
                          className="btn-update"
                          onClick={() => {
                            show();
                            settoggleState(true);
                          }}
                        >
                          Update Profile
                        </button>
                      )}
                      content={hide => (
                        <div class="profile-modal">
                          <>
                            <img
                              class="profile-img"
                              src={formState.profile_picture}
                              alt="profile"
                            />
                            <button
                              id="close"
                              onClick={() => {
                                hide();
                                settoggleState(false);
                              }}
                            >
                              Close
                            </button>

                            <FileUploader
                              class="uploader"
                              accept="image/*"
                              name="profile_picture"
                              randomizeFilename
                              storageRef={firebase.storage().ref('images')}
                              // onUploadStart={handleUploadStart}
                              // onUploadError={handleUploadError}
                              onUploadSuccess={handleUploadSuccess}
                              onProgress={handleProgress}
                            />

                            <form id="profileForm">
                              What is your first name?
                              <input
                                type="text"
                                name="first_name"
                                placeholder="First Name"
                                value={data.first_name}
                                onChange={e =>
                                  handleChanges({
                                    field: 'first_name',
                                    value: e.target.value
                                  })
                                }
                              />
                              What is your last name?
                              <input
                                type="text"
                                name="last_name"
                                placeholder="Last Name"
                                value={data.last_name}
                                onChange={e =>
                                  handleChanges({
                                    field: 'last_name',
                                    value: e.target.value
                                  })
                                }
                              />
                              How old are you?
                              <input
                                type="number"
                                name="age"
                                placeholder="age"
                                value={data.age}
                                onChange={e =>
                                  handleChanges({
                                    field: 'age',
                                    value: Number(e.target.value)
                                  })
                                }
                              />
                              What do you want your ideal match to know about
                              you?
                              <input
                                type="textarea"
                                name="bio"
                                placeholder="Bio"
                                value={data.bio}
                                onChange={e =>
                                  handleChanges({
                                    field: 'bio',
                                    value: e.target.value
                                  })
                                }
                              />
                              How does your ideal match define their gender?
                              <Select
                                value={data.match_gender.map(e => {
                                  return e;
                                })}
                                name={
                                  genderState.map(e => {
                                    return e;
                                  }) || ''
                                }
                                onChange={value =>
                                  handleChanges({
                                    field: 'match_gender',
                                    value: value
                                  })
                                }
                                options={genderState}
                                isMulti
                              />
                              What condition(s) are you OK with?
                              <Select
                                value={data.match_conditions.map(e => {
                                  return e;
                                })}
                                name={
                                  stdState.map(e => {
                                    return e;
                                  }) || ''
                                }
                                onChange={value =>
                                  handleChanges({
                                    field: 'match_conditions',
                                    value: value
                                  })
                                }
                                options={stdState}
                                isMulti
                              />
                              What condition(s) do you have?
                              <Select
                                value={data.conditions.map(e => {
                                  return e;
                                })}
                                name={
                                  stdState.map(e => {
                                    return e;
                                  }) || ''
                                }
                                onChange={value =>
                                  handleChanges({
                                    field: 'conditions',
                                    value: value
                                  })
                                }
                                options={stdState}
                                isMulti
                              />
                              Care to share some details on your condition?
                              <input
                                type="textarea"
                                name="condition_description"
                                placeholder="condition_description"
                                value={data.condition_description}
                                onChange={e =>
                                  handleChanges({
                                    field: 'condition_description',
                                    value: e.target.value
                                  })
                                }
                              />
                              What is your zip code?
                              <input
                                type="text"
                                name="zip_code"
                                placeholder="Zip Code"
                                value={data.zip_code}
                                onChange={e =>
                                  handleChanges({
                                    field: 'zip_code',
                                    value: e.target.value
                                  })
                                }
                              />
                            </form>
                          </>
                        </div>
                      )}
                    />
                    <div id={toggleState ? 'grayout' : null} />
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
