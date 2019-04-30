import React from 'react';
import PropTypes from 'prop-types';
import { animated, interpolate } from 'react-spring';
// import Carousel from 'nuka-carousel';


class Card extends React.Component {
  render() {
    const { i, x, y, rot, scale, trans, bind, data } = this.props;
    const { cardTitle, onboardingStep, prompts, inputPlaceholder } = data[i];
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
              <h2>{cardTitle}</h2>
              {prompts.map(p => (
                <>
                <h3>{p.prompt}</h3>
                <input placeholder={p.inputPlaceholder} name={p.fieldName}/>
                

                <p>{onboardingStep} out of {data.length}</p>
                </>
              ))}
              {/* <h3>{}</h3>
              <input placeholder='first Name' />
              <h3>{}</h3>
              <input placeholder='last Name' />
              <h3>{}</h3>
              <input placeholder='Age' /> */}
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
