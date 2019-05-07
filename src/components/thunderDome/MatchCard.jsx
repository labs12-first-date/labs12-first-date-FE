import React, { useState, useEffect } from 'react';
// import './CardTh.css';
import PropTypes from 'prop-types';
import { animated, interpolate } from 'react-spring';
import { auth } from '../../firebase';
import firebase from 'firebase';
// import useForm from '../../hooks/useForm';
// import { MenuItem } from '@blueprintjs/core';

import Carousel from 'nuka-carousel';

// const Card = () => {
//   return (
//     <div className='thunder-heading'>
//       <h1>Welcome to the Thunderdome!</h1>
//       <h2>Coming May 2019</h2>
//     </div>
//   );
// };

const MatchCard = props => {
  const [formValues, setFormValues] = useState({});
  const [user] = useState(auth.getCurrentUser());
  console.log();

  // just for logging / sanity
  // useEffect(() => {
  //   console.log('FORM STATE CHANGE:', formValues);
  //   firebase
  //     .firestore()
  //     .collection('profiles')
  //     .doc(user.uid)
  //     .update(formValues)
  //     .then(function() {
  //       console.log('Document successfully written!');
  //     });
  // }, [formValues]);

  const handleChange = ({ field, value }) => {
    setFormValues(previousValues => {
      return { ...previousValues, [field]: value };
    });
  };

  const { i, x, y, rot, scale, trans, bind, data } = props;
  const { name, age, distance, bio, pics } = data[i];

  // const renderInput = p => {
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
          <Carousel>
            {pics.map((pic, index) => (
              <img src={pic} key={index} alt='profilePicture' />
            ))}
          </Carousel>
          <h2>{name},</h2>
          <h2>{age}</h2>
          <h5>{distance}</h5>
          <h5>{bio}</h5>
        </div>
      </animated.div>
    </animated.div>
  );
};
// };

MatchCard.propTypes = {
  name: PropTypes.string,
  age: PropTypes.number,
  distance: PropTypes.string,
  text: PropTypes.string,
  pics: PropTypes.array
};

export default MatchCard;
