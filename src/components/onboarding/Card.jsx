import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { animated, interpolate } from 'react-spring';
import useForm from '../../hooks/useForm';
// import { MenuItem } from '@blueprintjs/core';
import { DateInput } from '@blueprintjs/datetime';
// import { IListItemsProps, MultiSelect } from '@blueprintjs/select';
// import Carousel from 'nuka-carousel';
import Select from 'react-select';
import { MultiSlider } from '@blueprintjs/core';

const jsDateFormatter = {
  formatDate: date => date.toLocaleDateString(),
  parseDate: str => new Date(str),
  placeholder: 'M/D/YYYY'
};

const renderInput = (p, handleChange, formValues) => {
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
      console.log('VALUES', formValues);
      return (
        // <div>MultiSelect here for "{p.fieldName}"</div>

        <Select
          value={p.fieldName || []}
          name={p.fieldName}
          onChange={handleChange}
          options={p.choices}
          isMulti
        />
        // <MultiSelect
        //   items={p.choices}
        //   itemRenderer={(item, { handleClick, modifiers, query }) => (
        //     <div
        //       active={modifiers.active}
        //       disabled={modifiers.disabled}
        //       label={item}
        //       key={item}
        //       // replace later
        //       onClick={e => console.log(`Clicked ${e.target}`)}
        //       text={item}
        //     >
        //       {item}
        //     </div>
        //   )}
        //   onItemSelect={e => console.log(`Selected ${e.target}`)}
        //   tagRenderer={item => <span>{item}</span>}
        // />
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
  // const { values, handleChange } = useForm(() => {
  //   console.log('VALUES', values);
  // });

  const [formValues, setFormValues] = useState({});

  const handleChange = selectedOption => {
    setFormValues(previousValues => {
      console.log('LABEL', selectedOption[0]);
      selectedOption.map(e => {
        console.log('EEEE', e.value);
        let gen = e.value;
        return { ...previousValues, gen };
      });
      // return { ...previousValues, selectedOption };
      // console.dir(e);
    });
    // console.log(`Option selected:`, selectedOption);
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

                {renderInput(p, handleChange, formValues)}
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
