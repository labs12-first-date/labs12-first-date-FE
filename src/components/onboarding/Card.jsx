import React from 'react';
import PropTypes from 'prop-types';
import { animated, interpolate } from 'react-spring';
// import Carousel from 'nuka-carousel';

class Card extends React.Component {
  render() {
    const { i, x, y, rot, scale, trans, bind, data } = this.props;
    const { questionOne, questionTwo, questionThree } = data[i];
    return (
      <animated.div
        key={i}
        style={{
          transform: interpolate(
            [x, y],
            (x, y) => `translate3d(${x}px,${y}px,0)`
          )
        }}
      >
        <animated.div
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
              <h2>{questionOne}</h2>
              <input placeholder='first Name' />
              <h2>{questionTwo}</h2>
              <input placeholder='last Name' />
              <h2>{questionThree}</h2>
              <input placeholder='Age' />
            </form>
            {/* <h5>{distance}</h5>
            <h5>{text}</h5> */}
          </div>
        </animated.div>
      </animated.div>
    );
  }
}

Card.propTypes = {
  name: PropTypes.string,
  age: PropTypes.number,
  distance: PropTypes.string,
  text: PropTypes.string,
  pics: PropTypes.array
};

export default Card;
