import React from 'react';
import PropTypes from 'prop-types';
import { animated, interpolate } from 'react-spring';

import './ThunderDome.css';

const MatchCard = props => {
  const { i, x, y, rot, scale, trans, bind, data, matchNotify, matchesCount } = props;
  const { first_name, age, bio, gender, profile_picture, id: uid } = data;

  return (
    <animated.div
      className="td-ani1"
      key={i}
      style={{
        transform: interpolate([x, y], (x, y) => `translate3d(${x}px,${y}px,0)`)
      }}
    >
      <animated.div
        className="td-ani1"
        key={i}
        style={{
          transform: interpolate([rot, scale], trans)
        }}
      >
        <animated.div
          className="td-ani2"
          {...bind(i, uid, matchNotify, matchesCount)}
          style={{
            transform: interpolate([rot, scale], trans)
          }}
        >
          <div className="td-card">
            <img src={profile_picture} alt="profilePicture" />
            <h2>{first_name},</h2>
            <h2>{age}</h2>
            <h5>
              <span className="bio">Bio:</span> {bio}
            </h5>
            <h5>
              {gender.map(g => {
                return g.value + ' ';
              })}
            </h5>
          </div>
        </animated.div>
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
