import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { animated, interpolate } from 'react-spring';
import { auth } from '../../firebase';
import firebase from 'firebase';
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

const Card = props => {
  const { i, x, y, rot, scale, trans, bind, data, totalSteps } = props;
  const [formValues, setFormValues] = useState({});
  const [user] = useState(auth.getCurrentUser());
  const { cardTitle, onboardingStep, prompts } = data;

  const persistToFirestore = () => {
    // TODO debounce this so we aren't making a network call on every keystroke
    firebase
      .firestore()
      .collection('profiles')
      .doc(user.uid)
      .update(formValues)
      .then(function() {
        console.log('Document successfully written!');
      });
  };

  useEffect(() => {
    // console.log('FORM STATE CHANGE:', formValues);
    persistToFirestore();
  }, [formValues]);

  const handleChange = ({ field, value }) => {
    setFormValues(previousValues => {
      return { ...previousValues, [field]: value };
    });
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
            type="text"
            placeholder={p.input_placeholder}
            name={p.field_name}
            value={formValues[p.field_name] || ''}
            onChange={e => handleChange({ field: p.field_name, value: e.target.value })}
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
      case 'date_input':
        return (
          <DateInput
            formatDate={date => date.toLocaleString()}
            onChange={value => handleChange({ field: p.field_name, value })}
            parseDate={str => new Date(str)}
            placeholder={'M/D/YYYY'}
            {...jsDateFormatter}
            value={formValues[p.field_name] || ''}
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
