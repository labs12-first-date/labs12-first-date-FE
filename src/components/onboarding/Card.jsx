import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { animated, interpolate } from 'react-spring';
import { DateInput } from '@blueprintjs/datetime';
// import Carousel from 'nuka-carousel';
import Select from 'react-select';

const jsDateFormatter = {
  formatDate: date => date.toLocaleDateString(),
  parseDate: str => new Date(str),
  placeholder: 'M/D/YYYY'
};

const renderInput = (p, handleChange, formVals) => {
  switch (p.inputType) {
    case 'text':
      return (
        <input
          type='text'
          placeholder={p.inputPlaceholder}
          name={p.fieldName}
        />
      );
    case 'number':
      return (
        <input
          type='number'
          placeholder={p.inputPlaceholder}
          name={p.fieldName}
        />
      );
    case 'multiSelect':
      return (
        <Select
          value={formVals.value}
          name={p.fieldName}
          onChange={handleChange}
          options={p.choices}
          isMulti
        />
      );
    case 'dateInput':
      return (
        <DateInput
          formatDate={date => date.toLocaleString()}
          //  onChange={this.handleDateChange}
          parseDate={str => new Date(str)}
          placeholder={'M/D/YYYY'}
          {...jsDateFormatter}
          //  value={this.state.date}
        />
      );
    default:
      return <div>No renderer for "{p.fieldName}"</div>;
  }
};

const Card = props => {
  const [formVals, setFormVals] = useState({});

  const handleChange = selectedOption => {
    setFormVals(previousVals => {
      return { ...previousVals, selectedOption };
    });
  };

  const { i, x, y, rot, scale, trans, bind, data } = props;
  const { cardTitle, onboardingStep, prompts } = data[i];

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
              <>
                <h3>{p.prompt}</h3>

                {renderInput(p, handleChange, formVals)}
              </>
            ))}

            <p>
              {onboardingStep} out of {data.length}
            </p>
          </form>
        </div>
      </animated.div>
    </animated.div>
  );
};

Card.propTypes = {
  name: PropTypes.string,
  age: PropTypes.number,
  distance: PropTypes.string,
  text: PropTypes.string,
  pics: PropTypes.array
};

export default Card;
