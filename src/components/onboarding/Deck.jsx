import React, { useState } from 'react';
import { useSprings } from 'react-spring';
import { useGesture } from 'react-with-gesture';
import Card from './Card';
import './OnBoarding.css';
import { toast } from 'react-toastify';


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

const Deck = ({ cardsData }) => {
  const [gone] = useState(() => new Set());

  const [props, set] = useSprings(cardsData.length, i => ({
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
      const trigger = velocity > 0.6;

      const dir = xDir < 0 ? -1 : 1;

      if (!down && trigger) gone.add(index); // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
      set(i => {
        if (index !== i) return;
        const isGone = gone.has(index);

        const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0;

        const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0);

        const scale = down ? 1.1 : 1;
        if (dir === 1) {
          // swipe direction is right
        } else {
          // left
        }
        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 }
        };
      });

      if (!down && gone.size === cardsData.length) {
        setTimeout(() => gone.clear() || set(i => to(i)), 600);
        toast.info('Please read the directions!');
        // all cards have been swiped
      }
    }
  );

  return props.map(({ x, y, rot, scale }, i) => (
    <Card
      className='ob-card'
      i={i}
      x={x}
      y={y}
      rot={rot}
      scale={scale}
      trans={trans}
      data={cardsData[i]}
      totalSteps={cardsData.length}
      bind={bind}
      key={i}
    />
  ));
};

export default Deck;
