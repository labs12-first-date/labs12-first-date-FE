import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { animated, interpolate } from 'react-spring';
// import useForm from '../../hooks/useForm';
import { ProgressBar } from '@blueprintjs/core';
import { DateInput } from '@blueprintjs/datetime';
// import Carousel from 'nuka-carousel';
import Select from 'react-select';

const jsDateFormatter = {
  formatDate: date => date.toLocaleDateString(),
  parseDate: str => new Date(str),
  placeholder: 'M/D/YYYY'
};

// const debouncer = (func, waitMS = 150) => {
// 	var timeout;
// 	return function() {
// 		var context = this, args = arguments;
// 		var later = function() {
// 			timeout = null;
// 			if (!immediate) func.apply(context, args);
// 		};
// 		// var callNow = immediate && !timeout;
// 		clearTimeout(timeout);
// 		timeout = setTimeout(later, waitMS);
// 		// if (callNow) func.apply(context, args);
// 	};
// };

function debounce(func, waitMS = 250) {
  let timeout;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      func();
    }, waitMS);
  };
}

const once = debounce(() => {
  console.log('running!');
}, 0);

once();
once();
once();

const Card = props => {
  const [formValues, setFormValues] = useState({});
  const { i, x, y, rot, scale, trans, bind, data, totalSteps } = props;
  const { cardTitle, onboardingStep, prompts } = data;

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
            type="text"
            placeholder={p.inputPlaceholder}
            name={p.fieldName}
            value={formValues[p.fieldName] || ''}
            onChange={e => handleChange({ field: p.fieldName, value: e.target.value })}
          />
        );
      case 'textarea':
        return (
          <input
            type="textarea"
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

Card.propTypes = {
  name: PropTypes.string,
  age: PropTypes.number,
  distance: PropTypes.string,
  text: PropTypes.string,
  pics: PropTypes.array
};

export default Card;
