import React, { useState } from 'react';
import { useSprings } from 'react-spring';
import { useGesture } from 'react-with-gesture';

import Card from './Card';
import './Deck.css';


//Questions
//1. Intro(first and last name,)
//2. Intro2( gender, birthday, interests/bio)
//3. General(zip code, age)
//4. Looking for(match gender, ideal match, match distance)
//5. Conditions(what you are open to)
//6. Conditions2(what you have, description)
//7. Add a picture

const data = [
  // card objects
  {
    cardTitle: 'Basic Info',
    onboardingStep: 1,
    // questions, array of whatever length
    prompts: [
      {
        prompt: "What's your first name?",
        inputPlaceholder: 'First Name',
        fieldName: 'firstName'
      },
      {
        prompt: "What's your last name?",
        inputPlaceholder: 'Last Name',
        fieldName: 'lastName'
      }
    ]
  },
  {
    cardTitle: 'Basic Info continued',
    onboardingStep: 2,
    // questions, array of whatever length
    prompts: [
      {
        prompt: "What is your gender?",
        inputPlaceholder: 'Gender',
        fieldName: 'gender'
      },
      {
        prompt: "When's your birthday?",
        inputPlaceholder: 'MM/DD/YYYY',
        fieldName: 'dateOfBirth'
      }
    ]
  }
];

const to = i => ({
  x: 10,
  y: i * -10,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100
});
const from = i => ({ x: 0, rot: 0, scale: 2, y: -1000 });

const trans = (r, s) =>
  `perspective(1500px) rotateX(20deg) rotateY(${r /
    10}deg) rotateZ(${r}deg) scale(${s})`;

function Deck() {
  const [gone] = useState(() => new Set());

  const [props, set] = useSprings(data.length, i => ({
    ...to(i),
    from: from(i)
  }));

  const bind = useGesture(
    ({
      args: [index],
      down,
      delta: [xDelta],
      distance,
      direction: [xDir],
      velocity
    }) => {
      const trigger = velocity > 0.2;

      const dir = xDir < 0 ? -1 : 1;

      if (!down && trigger) gone.add(index); // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
      console.log(index);
      set(i => {
        if (index !== i) return;
        const isGone = gone.has(index);

        const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0;

        const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0);

        const scale = down ? 1.1 : 1;
        if (dir === 1) {
          console.log('Direction: right index:', index);
        } else {
          console.log('Direction: left index:', index);
        }
        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 }
        };
      });

      if (!down && gone.size === data.length)
        console.log(
          'Cards are done. Let the DB know this person is ready to date!'
        );
    }
  );

  return props.map(({ x, y, rot, scale }, i) => (
    <Card
      i={i}
      x={x}
      y={y}
      rot={rot}
      scale={scale}
      trans={trans}
      data={data}
      bind={bind}
    />
  ));
}

export default Deck;
