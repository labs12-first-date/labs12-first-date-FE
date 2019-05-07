import React, { useState, useEffect } from 'react';
import { useSprings } from 'react-spring';
import { useGesture } from 'react-with-gesture';
import { auth, firebase } from '../../firebase';

import MatchCard from './MatchCard';
import './Deck.css';

//dummyData will be moved into firestore db
const data = [
  {
    name: 'Chloe',
    age: '23',
    distance: '5 Miles',
    bio: 'I like turtles',
    pics: [
      'https://firebasestorage.googleapis.com/v0/b/awk-dating.appspot.com/o/images%2F28a05b4e-fc32-438e-bb47-76f5ce469369.png?alt=media&token=48b1232c-ed3c-48ed-bca4-2aa6cc3abd62',
      'https://firebasestorage.googleapis.com/v0/b/awk-dating.appspot.com/o/images%2F1543892b-8a97-4b68-9c95-874104cc51c0.jpeg?alt=media&token=975b0562-da02-4395-b50c-d1791a3755fd'
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

const ThunderDeck = ({ history }) => {
  const [user] = useState(auth.getCurrentUser());
  const [profileState, setprofileState] = useState(null);

  useEffect(() => {
    const docRef = firebase
      .firestore()
      .collection('profiles')
      .doc(user.uid);
    docRef
      .get()
      .then(function(doc) {
        setprofileState(doc.data());
        console.log('DOC', doc.data());
      })
      .catch(function(error) {
        console.log('Error getting document:', error);
        history.replace('/welcome');
      });
  }, []);

  console.log('BETWEEN', profileState);

  useEffect(() => {
    if (profileState && !profileState.profile_completed) {
      console.log(profileState);
      console.log('thunder!!!', profileState.profile_completed);
      history.replace('/welcome');
    }
  }, [profileState]);

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
          // console.log('Direction: right index:', index);
        } else {
          // console.log('Direction: left index:', index);
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
    <MatchCard
      className='card'
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
};

export default ThunderDeck;
