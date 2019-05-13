import React, { useState, useEffect } from 'react';
import { useSprings } from 'react-spring';
import { useGesture } from 'react-with-gesture';
import { auth, firebase } from '../../firebase';
import Loading from '../Loading';
import './ThunderDome.css';
import MatchCard from './MatchCard';
import convertDescriptorToString from 'jest-util/build/convertDescriptorToString';
import LocationDistance from '../Location/Location';
import recordSwipe from '../../helpers/swipeActions';

const to = i => ({
  x: 10,
  y: i * -10,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100
});
const from = i => ({ x: 0, rot: 0, scale: 2, y: -1000 });

const trans = (r, s) =>
  `perspective(1500px) rotateX(20deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`;

const ThunderDeck = ({ history }) => {
  const [user] = useState(auth.getCurrentUser());
  const [profileState, setprofileState] = useState(null);
  const [profileData, setProfileData] = useState([]);
  const [settingsState, setsettingsState] = useState(null);

  const swipe = (swipedUserId, isLike) => {
    recordSwipe(user.uid, swipedUserId, isLike);
  };

  useEffect(() => {
    if (user) {
      const docRef = firebase
        .firestore()
        .collection('settings')
        .doc(user.uid);
      docRef
        .get()
        .then(function(doc) {
          setsettingsState(doc.data());
        })
        .catch(function(error) {
          console.log('Error getting document:', error);
        });
    }
  }, [user]);

  console.log('UID', user.uid);

  const wantedTraits = profileState => {
    let wantedConds = [];
    const conditon = profileState.match_conditions.map(matchC => {
      return matchC;
    });
    const moreCondition = conditon.map(c => {
      return c.value;
    });
    wantedConds.push(moreCondition);
    return wantedConds;
  };

  const wantedGenders = profileState => {
    let wantedGens = [];
    console.log('Match Gender in wANTED gENDER', profileState.match_gender);
    const gender = profileState.match_gender.map(matchC => {
      return matchC;
    });
    const moreGender = gender.map(c => {
      return c.value;
    });
    wantedGens.push(moreGender);
    return wantedGens;
  };

  const matchAlgo = potMatch => {
    const zipCodes = profileState.nearby_zip;
    const tempConditions = wantedTraits(profileState)[0];
    const compGender = wantedGenders(profileState)[0];
    const matches = potMatch.filter(match => zipCodes.includes(match.zip_code)); //filter by zipcode;
    let foundMatches = [];
    for (let match of matches) {
      for (let condition of match.conditions) {
        for (let matched_cond of tempConditions) {
          if (matched_cond === condition.value) {
            foundMatches.push(match);
          }
        }
      }
    }

    let foundGender = [];
    for (let match of foundMatches) {
      for (let gender of match.gender) {
        for (let matched_gen of compGender) {
          if (matched_gen === gender.value) {
            console.log(match.profile_uid);
            foundGender.push(match);
          }
        }
      }
    }

    setProfileData(foundGender);

    // const michael = matches.filter(a => {
    //   console.log('MICHAEL RUNNING');
    //   return (
    //     a.conditions.find(c => {
    //       return (
    //         c.value ===
    //         TempConditions.find(x => {
    //           return x === c.value;
    //         })
    //       );
    //     }) !== undefined
    //   );
    // });
    // console.log('MICHAEL', michael);

    // const mm = matches.map(p => {
    //   console.log('CONDITIONS', p.conditions);
    //   const x = p.conditions;
    //   x.map(y => {
    //     console.log(y.value);
    //     if (TempConditions.includes(y.value)) {
    //       return p;
    //     }
    //   });
  };

  useEffect(() => {
    if (settingsState) {
      const max_age = settingsState.match_age_max;
      const min_age = settingsState.match_age_min;

      if (max_age && min_age) {
        const profiles = firebase
          .firestore()
          .collection('profiles')
          .where('age', '>=', min_age)
          .where('age', '<=', max_age)
          .limit(500)
          .get()
          .then(function(querySnapShot) {
            const potMatches = querySnapShot.docs.map(function(doc) {
              return { ...doc.data(), id: doc.id };
            });
            matchAlgo(potMatches);
          });
      }
    }
  }, [settingsState]);

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

  // useEffect(() => {
  //   if (profileState && profileState.match_conditions) {
  //     wantedTraits(profileState);
  //   }
  // }, [profileState]);

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
    ({ args: [index, uid], down, delta: [xDelta], distance, direction: [xDir], velocity }) => {
      const trigger = velocity > 0.2;

      const dir = xDir < 0 ? -1 : 1;

      if (!down && trigger) gone.add(index); // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out

      set(i => {
        if (index !== i) return;
        const isGone = gone.has(index);

        const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0;

        const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0);

        const scale = down ? 1.1 : 1;
        // if (dir === 1) {
        //   console.log('WHAT?', profileData);
        //   // console.log('Direction: right index:', index);
        // } else {
        //   // console.log('Direction: left index:', index);
        // }

        if (isGone) {
          const like = dir === 1;
          swipe(uid, like);
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
        console.log('Cards are done. Let the DB know this person is ready to date!');
    }
  );

  if (profileData) {
    return props.map(({ x, y, rot, scale }, i) => (
      <>
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
        <LocationDistance />
      </>
    ));
  } else {
    return <Loading />;
  }
};
export default ThunderDeck;
