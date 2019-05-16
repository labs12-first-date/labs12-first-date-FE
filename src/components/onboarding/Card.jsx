import React, { useState, useEffect, useContext, useRef } from 'react';
import { firebase } from '../../firebase';
import { animated, interpolate } from 'react-spring';
import { Progress } from 'react-sweet-progress';
import 'react-sweet-progress/lib/style.css';
import { AuthContext } from '../../contexts/AuthContext';
import FileUploader from 'react-firebase-file-uploader';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import './OnBoarding.css';
import setUserNearbyZips from '../../helpers/setUserNearbyZips';
import { toast } from 'react-toastify';

const db = firebase.firestore();
const storage = firebase.storage();

const Card = props => {
  const { user } = useContext(AuthContext);
  const { i, x, y, rot, scale, trans, bind, data, totalSteps } = props;
  const [formValues, setFormValues] = useState({});
  const { cardTitle, onboardingStep, prompts } = data;
  const uploadingToastId = useRef(null);
  // const [photoValues, setphotoValues] = useState({});

  // console.log(user);

  // save form input values
  useEffect(() => {
    db.collection('profiles')
      .doc(user.uid)
      .update(formValues);
  }, [formValues, user]);

  // populate form values with any existing profile data
  useEffect(() => {
    if (user && user.uid) {
      const docRef = db.collection('profiles').doc(user.uid);

      docRef
        .get()
        .then(function(doc) {
          setFormValues(doc.data());
        })
        .catch(function(error) {
          console.log('Error getting document:', error);
        });
    }
  }, []);

  const handleChange = ({ field, value }) => {
    setFormValues(previousValues => {
      return { ...previousValues, [field]: value };
    });
  };

  const completeProfile = async () => {
    const profileRef = db.collection('profiles').doc(user.uid);
    const profileSnapshot = await profileRef.get();
    const profile = profileSnapshot.data();
    const zipCode = profile.zip_code || null;
    if (!zipCode) {
      console.error('Zip code not set on user profile, cannot get matches');
    } else {
      setUserNearbyZips(user.uid, zipCode);
    }
    await db
      .collection('profiles')
      .doc(user.uid)
      .update({
        profile_completed: true
      });
    props.history.replace('/thunderdome');
  };

  const handleUploadSuccess = async filename => {
    const photoUrl = await storage
      .ref('images')
      .child(filename)
      .getDownloadURL();

    handleChange({ field: 'profile_picture', value: photoUrl });
    // uploading a photo is the final step in on-boarding
    toast.dismiss(uploadingToastId.current);
    completeProfile();
  };

  const handleProgress = () => {
    uploadingToastId.current = toast.info('Uploading your sexy mug...');
  };

  const renderInput = p => {
    switch (p.input_type) {
      case 'text':
        return (
          <input
            type="text"
            placeholder={p.input_placeholder}
            name={p.field_name}
            value={formValues[p.field_name] || ''}
            onChange={e => handleChange({ field: p.field_name, value: e.target.value })}
          />
        );
      case 'number':
        return (
          <input
            type="number"
            placeholder={p.input_placeholder}
            name={p.field_name}
            value={formValues[p.field_name] || ''}
            onChange={e =>
              handleChange({
                field: p.field_name,
                value: Number(e.target.value)
              })
            }
          />
        );
      case 'text_area':
        return (
          <input
            type='textarea'
            placeholder={p.input_placeholder}
            name={p.field_name}
            value={formValues[p.field_name] || ''}
            onChange={e =>
              handleChange({ field: p.field_name, value: e.target.value })
            }
          />
        );
      case 'multi_select':
        return (
          <Select
            value={formValues[p.field_name] || []}
            name={p.field_name}
            onChange={value =>
              handleChange({ field: p.field_name, value: value })
            }
            options={p.choices}
            isMulti
          />
        );
      case 'image':
        return (
          <FileUploader
            accept='image/*'
            name='profile_picture'
            randomizeFilename
            storageRef={storage.ref('images')}
            onUploadStart={handleProgress}
            // onUploadError={handleUploadError}
            onUploadSuccess={handleUploadSuccess}
            // onProgress={handleProgress}
          />
        );
      default:
        return <div>No renderer for "{p.fieldName}"</div>;
    }
  };

  return (
    <animated.div
      className='ob-ani1'
      key={i}
      style={{
        transform: interpolate([x, y], (x, y) => `translate3d(${x}px,${y}px,0)`)
      }}
    >
      <animated.div
        className='ob-ani2'
        {...bind(i)}
        style={{
          transform: interpolate([rot, scale], trans)
        }}
      >
        <div className='ob-card'>
          <form>
            <h2 className='ob-title'>{cardTitle}</h2>
            {prompts.map(p => (
              <div key={p.id}>
                <h3 className='ob-prompt'>{p.prompt}</h3>
                {p.field_name && renderInput(p)}
              </div>
            ))}
            <br />
            <Progress
              className='ob-progress'
              percent={Math.round((onboardingStep / totalSteps) * 100)}
            />
          </form>
        </div>
      </animated.div>
    </animated.div>
  );
};

export default withRouter(Card);
