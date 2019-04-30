import React from 'react';
import PropTypes from 'prop-types';
import { animated, interpolate } from 'react-spring';
// import { MenuItem } from '@blueprintjs/core';
import { DateInput } from '@blueprintjs/datetime';
// import { IListItemsProps, MultiSelect } from '@blueprintjs/select';
// import Carousel from 'nuka-carousel';

const jsDateFormatter = {
  formatDate: date => date.toLocaleDateString(),
  parseDate: str => new Date(str),
  placeholder: 'M/D/YYYY'
};

const renderInput = p => {
  switch (p.inputType) {
    case 'text':
      return <input type="text" placeholder={p.inputPlaceholder} name={p.fieldName} />;
    case 'number':
      return <input type="number" placeholder={p.inputPlaceholder} name={p.fieldName} />;
    case 'multiSelect':
      return (
        <div>MultiSelect here for "{p.fieldName}"</div>
        /* <MultiSelect
          items={p.choices}
          itemRenderer={(item, { handleClick, modifiers, query }) => (
            <div
              active={modifiers.active}
              disabled={modifiers.disabled}
              label={item}
              key={item}
              // replace later
              onClick={e => console.log(`Clicked ${e.target}`)}
              text={item}
            >
              {item}
            </div>
          )}
          onItemSelect={e => console.log(`Selected ${e.target}`)}
          tagRenderer={item => <span>{item}</span>}
        /> */
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
class Card extends React.Component {
  render() {
    const { i, x, y, rot, scale, trans, bind, data } = this.props;
    const { cardTitle, onboardingStep, prompts } = data[i];

    return (
      <animated.div
        key={i}
        style={{
          transform: interpolate([x, y], (x, y) => `translate3d(${x}px,${y}px,0)`)
        }}
      >
        <animated.div
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
                <>
                  <h3>{p.prompt}</h3>
                  {renderInput(p)}
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
