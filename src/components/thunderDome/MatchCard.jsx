import React, { useState, useEffect } from 'react';
// import './CardTh.css';
import PropTypes from 'prop-types';
import { animated, interpolate } from 'react-spring';
import { auth } from '../../firebase';
import Loading from '../Loading';
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
  console.log('Props on matchcard', props);
  console.log('this is first name', props.data.first_name);

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
  console.log('More props', props);

  const {
    first_name,
    date_of_birth,
    zip_code,
    bio,
    gender,
    profile_photo
  } = data;
  console.log('This is pics', profile_photo);

  console.log(data);
  // const renderInput = p => {
  if (data === []) {
    return <Loading />;
  } else {
    return (
      <animated.div
        className="ani1"
        key={i}
        style={{
          transform: interpolate(
            [x, y],
            (x, y) => `translate3d(${x}px,${y}px,0)`
          )
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
            <Carousel>
              {<img src={profile_photo} alt="profilePicture" />}
            </Carousel>
            <h2>
              {first_name},
              <h2>
                {date_of_birth},
                <h5>
                  {zip_code}
                  <h5>{bio}</h5>,
                  <h5>
                    {gender.map(g => {
                      return g.label;
                    })}
                  </h5>
                </h5>
                ,
              </h2>
            </h2>
          </div>
        </animated.div>
      </animated.div>
    );
  }
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
