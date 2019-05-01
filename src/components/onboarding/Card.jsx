import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { animated, interpolate } from 'react-spring';
// import useForm from '../../hooks/useForm';
// import { MenuItem } from '@blueprintjs/core';
import { DateInput } from '@blueprintjs/datetime';
// import Carousel from 'nuka-carousel';
import Select from 'react-select';

const jsDateFormatter = {
  formatDate: date => date.toLocaleDateString(),
  parseDate: str => new Date(str),
  placeholder: 'M/D/YYYY'
};

const Card = props => {
  const [formValues, setFormValues] = useState({});

  // just for logging / sanity
  useEffect(() => {
    console.log('FORM STATE CHANGE:', formValues);
  }, [formValues]);

  const handleChange = ({ field, value }) => {
    setFormValues(previousValues => {
      return { ...previousValues, [field]: value };
    });
  };

  // const handleChangeForMultiSelect = ({ field, value }) => {
  //   setFormValues(previousValues => {
  //     // const current = previousValues.field || [];
  //     return { ...previousValues, [field]: value };
  //   });
  // };

  const { i, x, y, rot, scale, trans, bind, data } = props;
  const { cardTitle, onboardingStep, prompts } = data[i];

  const renderInput = p => {
    switch (p.inputType) {
      case 'text':
        return (
          <input
            type="text"
            placeholder={p.inputPlaceholder}
            name={p.fieldName}
            value={formValues[p.fieldName] || ''}
            onChange={e => handleChange({ field: p.fieldName, value: e.target.value })}
          />
        );
      case 'number':
        return (
          <input
            type="number"
            placeholder={p.inputPlaceholder}
            name={p.fieldName}
            value={formValues[p.fieldName] || ''}
            onChange={e => handleChange({ field: p.fieldName, value: e.target.value })}
          />
        );
      case 'multiSelect':
        return (
          <Select
            value={formValues[p.fieldName] || []}
            name={p.fieldName}
            onChange={value => handleChange({ field: p.fieldName, value: value })}
            options={p.choices}
            isMulti
          />
        );
      case 'dateInput':
        return (
          <DateInput
            formatDate={date => date.toLocaleString()}
            onChange={value => handleChange({ field: p.fieldName, value })}
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
          {/* <Carousel>
              {pics.map((pic, index) => (
                <img src={pic} key={index} alt='profilePicture' />
              ))}
            </Carousel> */}

          <form>
            <h2>{cardTitle}</h2>
            {prompts.map(p => (
              <div key={p.fieldName}>
                <h3>{p.prompt}</h3>
                {renderInput(p)}
              </div>
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
