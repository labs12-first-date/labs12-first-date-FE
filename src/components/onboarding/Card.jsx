import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { animated, interpolate } from 'react-spring';
import { auth, firebase } from '../../firebase';
import { ProgressBar } from '@blueprintjs/core';
import FileUploader from 'react-firebase-file-uploader';
import { withRouter } from 'react-router-dom';
// import Carousel from 'nuka-carousel';
import Select from 'react-select';

const Card = props => {
  const { i, x, y, rot, scale, trans, bind, data, totalSteps } = props;
  const [formValues, setFormValues] = useState({});
  const [user] = useState(auth.getCurrentUser());
  const { cardTitle, onboardingStep, prompts } = data;
  const [photoValues, setphotoValues] = useState({});

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

  useEffect(() => {
    if (user && user.uid) {
      const docRef = firebase
        .firestore()
        .collection('profiles')
        .doc(user.uid);

      docRef
        .get()
        .then(function(doc) {
          setFormValues(doc.data());
        })
        .catch(function(error) {
          console.log('Error getting document:', error);
        });
    }
  }, [user]);

  useEffect(() => {
    console.log('PHOTO STATE CHANGE:', photoValues);
  }, [photoValues]);

  const handleChange = ({ field, value }) => {
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
        handleChange({ field: 'profile_picture', value: url });
        firebase
          .firestore()
          .collection('profiles')
          .doc(user.uid)
          .update({
            profile_completed: true
          })
          .then(() => {
            // changeProfileCompleted();
            props.history.replace('/thunderdome');
          });
      });
  };

  // const changeProfileCompleted = () => {
  //   firebase
  //     .firestore()
  //     .collection('profiles')
  //     .doc(user.uid)
  //     .update({ profile_completed: true })
  //     .then(function() {
  //       console.log('Document successfully written!');
  //     });
  // };

  const renderInput = p => {
    switch (p.input_type) {
      case 'text':
        return (
          <input
            type='text'
            placeholder={p.input_placeholder}
            name={p.field_name}
            value={formValues[p.field_name] || ''}
            onChange={e =>
              handleChange({ field: p.field_name, value: e.target.value })
            }
          />
        );
      case 'number':
        return (
          <input
            type='number'
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
            storageRef={firebase.storage().ref('images')}
            // onUploadStart={handleUploadStart}
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
      className='ani1'
      key={i}
      style={{
        transform: interpolate([x, y], (x, y) => `translate3d(${x}px,${y}px,0)`)
      }}
    >
      <animated.div
        className='ani2'
        {...bind(i)}
        style={{
          transform: interpolate([rot, scale], trans)
        }}
      >
        <div className='card'>
          {/* <Carousel>
              {pics.map((pic, index) => (
                <img src={pic} key={index} alt='profilePicture' />
              ))}
            </Carousel> */}

          <form>
            <h2>{cardTitle}</h2>
            {prompts.map(p => (
              <div key={p.id}>
                <h3>{p.prompt}</h3>
                {p.field_name && renderInput(p)}
              </div>
            ))}

            <br />
            <ProgressBar
              animate={false}
              stripes={false}
              value={onboardingStep / totalSteps}
            />
          </form>
        </div>
      </animated.div>
    </animated.div>
  );
};

// Card.propTypes = {
//   name: PropTypes.string,
//   age: PropTypes.number,
//   distance: PropTypes.string,
//   text: PropTypes.string,
//   pics: PropTypes.array
// };

export default withRouter(Card);
