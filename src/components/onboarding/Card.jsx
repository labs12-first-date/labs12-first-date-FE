import React, { useState, useEffect, useContext } from 'react';
import { auth, firebase } from '../../firebase';
import { animated, interpolate } from 'react-spring';
import { ProgressBar } from '@blueprintjs/core';
import { AuthContext } from '../../contexts/AuthContext';
import FileUploader from 'react-firebase-file-uploader';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import './Deck.css';

const db = firebase.firestore();
const storage = firebase.storage();

const Card = props => {
  const { user } = useContext(AuthContext);
  const { i, x, y, rot, scale, trans, bind, data, totalSteps } = props;
  const [formValues, setFormValues] = useState({});
  const { cardTitle, onboardingStep, prompts } = data;
  const [photoValues, setphotoValues] = useState({});

  console.log(user);

  useEffect(() => {
    db.collection('profiles')
      .doc(user.uid)
      .update(formValues)
      .then(function() {
        console.log('Document successfully written!');
      });
  }, [formValues, user]);

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

  const handleUploadSuccess = filename => {
    setphotoValues({ profile_picture: filename });
    storage
      .ref('images')
      .child(filename)
      .getDownloadURL()
      .then(url => {
        handleChange({ field: 'profile_picture', value: url });
        db.collection('profiles')
          .doc(user.uid)
          .update({
            profile_completed: true
          })
          .then(() => {
            props.history.replace('/thunderdome');
          });
      });
  };

  const handleProgress = filename => {
    alert('Uploading now!');
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
            type="textarea"
            placeholder={p.input_placeholder}
            name={p.field_name}
            value={formValues[p.field_name] || ''}
            onChange={e => handleChange({ field: p.field_name, value: e.target.value })}
          />
        );
      case 'multi_select':
        return (
          <Select
            value={formValues[p.field_name] || []}
            name={p.field_name}
            onChange={value => handleChange({ field: p.field_name, value: value })}
            options={p.choices}
            isMulti
          />
        );
      case 'image':
        return (
          <FileUploader
            accept="image/*"
            name="profile_picture"
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
      className="ani1"
      key={i}
      style={{
        transform: interpolate([x, y], (x, y) => `translate3d(${x}px,${y}px,0)`)
      }}
    >
      <animated.div
        className="ani2"
        {...bind(i)}
        style={{
          transform: interpolate([rot, scale], trans)
        }}
      >
        <div className="card">
          <form>
            <h2>{cardTitle}</h2>
            {prompts.map(p => (
              <div key={p.id}>
                <h3>{p.prompt}</h3>
                {p.field_name && renderInput(p)}
              </div>
            ))}

            <br />
            <ProgressBar animate={false} stripes={false} value={onboardingStep / totalSteps} />
          </form>
        </div>
      </animated.div>
    </animated.div>
  );
};

export default withRouter(Card);
