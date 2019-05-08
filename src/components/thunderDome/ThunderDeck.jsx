import React, { useState, useEffect } from 'react';
import { useSprings } from 'react-spring';
import { useGesture } from 'react-with-gesture';
import { auth, firebase } from '../../firebase';
import Loading from '../Loading';
import '../onboarding/Deck.css';
import MatchCard from './MatchCard';

//dummyData will be moved into firestore db

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
  const [profileData, setProfileData] = useState([]);

  // const allowedZip = '10025';
  // const allowedZip1 = '19422';
  // const preferedSTDs =
  // const docRef = firebase
  //   .firestore()
  //   .collection('profiles')
  //   .doc('0tjJCWTHjIgqUCRKGe9w');
  // docRef
  //   .get()
  //   .then(function(doc) {
  //     setProfileData(doc.data());
  //   })
  //   .catch(function(error) {
  //     console.log('Error getting document:', error);
  //   });

  // const zipQuery = doc => {
  //   const allowedZips = [10025, 19422, 10010];
  //   const allowedCond = ['Hep B', 'Crabs', 'Gonorrhea'];
  //   const mm = doc.map(p => {
  //     console.log('CONDITIONS', p.conditions);
  //     const x = p.conditions;
  //     x.map(y => {
  //       console.log(y.value);
  //       if (allowedCond.includes(y.value)) {
  //         return p;
  //       }
  //       // above lets us grab the condition from the crazy data structure
  //       // we need to do the same for gender
  //       // need to move below if statement into here and only return 1 p
  //     });
  //     // if (allowedZips.includes(p.zip_code)) {
  //     //   return p;
  //     // } else {
  //     //   // discard that profile and move to next
  //     //   console.log('no zip match');
  //     // }
  //   });
  //   setProfileData(mm);
  // };

  const matchAlgo = (potMatch) => {
    const zipCodes = [19422, 19148, 10025, 19422, 10010];
    const TempConditions = ['HIV']
    console.log('algo is run before if')
    console.log('MATCHES', potMatch);
    const matches = potMatch.filter(match => zipCodes.includes(match.zip_code))//filter by zipcode;
    //zipfiltered is array of filters matches
    //map through that array to get each match object
    // console.log('MATCHES', matches)
    // const zipFiltered = matches.map(eachMatchObject => {
    //   const arrayOfConditionsObjects = eachMatchObject.conditions;
    //   const matchConditions = arrayOfConditionsObjects.map( eachConditionObj => eachConditionObj.value)
    //   console.log('MATCH CONDITIONS', matchConditions)
    //   matchConditions.filter(x => TempConditions.includes(matchConditions));
    // })

    console.log('MATCHES', matches);
    setProfileData(matches);
 

  }


  useEffect(() => {
    const profiles = firebase
      .firestore()
      .collection('profiles')
      .limit(6)
      // .where('zip_code', '==', `allowedZip`)
      // .where('zip_code', '==', allowedZip)
      // .where('conditions', 'array-contains', 'Herpes')
      // .orderBy('first_name')
      // .limit(4)
      // .where('gender', '==', '{label: Male, value: Male}')
      // .where('first_name', '==', 'G')
      .get()
      .then(function(querySnapShot) {
        const potMatches = querySnapShot.docs.map(function(doc) {
          return doc.data();
        });
        // MATCHING LOGIC
        //.where('age', '>=', match_min_age)
        //.where('age', '<=', match_max_age)
        // check if user swipes >= limit
        // for premium we will set swipes at 8000 that shouldnt be reached
        // True => Display Card to upgrade
        // False continue below
        // SEND results to matching function
        // skip skipped and liked
        // Location
        // Gender
        // Condition
        // console.log('POT MATCHES',potMatches);
        matchAlgo(potMatches);
        //setProfileData(potMatches);

      });
  }, []);

  console.log('ProfileData here', profileData);

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

  useEffect(() => {
    if (profileState && !profileState.profile_completed) {
      console.log(profileState);
      console.log('thunder!!!', profileState.profile_completed);
      history.replace('/welcome');
    }
  }, [profileState]);

  const [gone] = useState(() => new Set());

  const [props, set] = useSprings(profileData.length, i => ({
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

      if (!down && gone.size === profileData.length)
        console.log(
          'Cards are done. Let the DB know this person is ready to date!'
        );
    }
  );
  console.log('PDATA', profileData);
  if (profileData) {
    return props.map(({ x, y, rot, scale }, i) => (
      <MatchCard
        className="card"
        i={i}
        x={x}
        y={y}
        rot={rot}
        scale={scale}
        trans={trans}
        data={profileData[i]}
        bind={bind}
      />
    ));
  } else {
    return <Loading />;
  }
};
export default ThunderDeck;
