import React, { useState, useEffect } from 'react';
import { useSprings } from 'react-spring';
import { useGesture } from 'react-with-gesture';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { auth, firebase } from '../../firebase';
import Loading from '../Loading';
import MatchCard from './MatchCard';
import runMatchAlgo from '../../helpers/matching';
import { recordSwipe, resetSwipeLimitAfter } from '../../helpers/swipeActions';
import Navigation from '../Navigation';
import appConfig from '../../appConfig';
import '../thunderDome/ThunderDome.css';
import { toast } from 'react-toastify';
import matchNotify from './matchNotify';

const db = firebase.firestore();

const MessageDisplay = styled.div`
  color: #eee;
  font-size: 2em;
  text-align: center;
  margin-top: 4rem;
`;

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
  const user = auth.getCurrentUser();
  const [userProfile, setUserProfile] = useState(null);
  const [userSettings, setUserSettings] = useState(null);
  const [potentialMatches, setPotentialMatches] = useState([]);
  const [noMatches, setNoMatches] = useState(false);
  const [swipeLimitReached, setSwipeLimitReached] = useState(false);

  // 1. on mount, get user profile, check if complete
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const snapshot = await db
          .collection('profiles')
          .doc(user.uid)
          .get();
        const profile = snapshot.data();
        // is user's profile complete?

        if (userProfile && !userProfile.profile_completed) {
          history.replace('/welcome');
        } else {
          if (profile.age < 18) {
            toast(`That's all we have for you right now. Check back later!`);
            history.replace('/welcome');
            console.log('Grow some hair call me on your 18Th Bday.');
          }
          console.log('PROFILE', profile);
          setUserProfile(profile);
          if (!profile.bio) {
            toast(`That's all we have for you right now. Check back later!`);
            history.replace('/welcome');
            console.log('Please fill out your bio');
          }
          if (!profile.condition_description) {
            toast(`That's all we have for you right now. Check back later!`);
            history.replace('/welcome');
            console.log('Fill out your description');
          }
          if (!profile.conditions) {
            toast(`That's all we have for you right now. Check back later!`);
            history.replace('/welcome');
            console.log('What you got sucker! You dirty.');
          }
          if (!profile.first_name) {
            toast(`That's all we have for you right now. Check back later!`);
            history.replace('/welcome');
            console.log('You need name!!');
          }
          if (!profile.gender) {
            toast(`That's all we have for you right now. Check back later!`);
            history.replace('/welcome');
            console.log('I am confused sound like you are too Choose a gender');
          }
          if (!profile.last_name) {
            toast(`That's all we have for you right now. Check back later!`);
            history.replace('/welcome');
            console.log('What is your handle');
          }
          if (!profile.match_conditions) {
            toast(`That's all we have for you right now. Check back later!`);
            history.replace('/welcome');
            console.log('Nobodys perfect what is your condition');
          }
          if (!profile.match_gender) {
            toast(`That's all we have for you right now. Check back later!`);
            history.replace('/welcome');
            console.log('You playin pick up sticks or clam jam?');
          }
          if (!profile.profile_picture) {
            toast(`That's all we have for you right now. Check back later!`);
            history.replace('/welcome');
            console.log('Send nudes!');
          }
          if (!profile.zip_code) {
            toast(`That's all we have for you right now. Check back later!`);
            history.replace('/welcome');
            console.log('I got hoes.. I need your area code!');
          } else if (profile.zip_code.length < 5) {
            toast(`That's all we have for you right now. Check back later!`);
            history.replace('/welcome');
            console.log('I got hoes.. I need your area code!');
          }
          if (!profile.profile_completed) {
            toast(`That's all we have for you right now. Check back later!`);
            history.replace('/welcome');
          }
        }

        // if (userProfile && !userProfile.profile_completed) {
        //   history.replace('/welcome');
        // } else {
        //   if (userProfile.age < 18) {
        //     console.log('too young!!!!');
        //   }
        //   console.log('PROFILE', profile);
        //   setUserProfile(profile);
        // }

        // if (userProfile) {
        //   if (profile.age <= 18) {
        //     console.log('Grow some hair call me on your 18Th Bday.');
        //   }
        // if (profile.bio === '') {
        //   console.log('Please fill out your bio');
        // }
        // if (profile.condition_description === '') {
        //   console.log('Fill out your description');
        // }
        // if (profile.conditions.length === 0) {
        //   console.log('What you got sucker! You dirty.');
        // }
        // if (profile.first_name === '') {
        //   console.log('You need name!!');
        // }
        // if (profile.gender.length === 0) {
        //   console.log('I am confused sound like you are too Choose a gender');
        // }
        // if (profile.first_last === '') {
        //   console.log('What is your handle');
        // }
        // if (profile.match_conditions.length === 0) {
        //   console.log('Nobodys perfect what is your condition');
        // }
        // if (profile.match_gender.length === 0) {
        //   console.log('You playin pick up sticks or clam jam?');
        // }
        // if (profile.profile_picture === '') {
        //   console.log('Send nudes!');
        // }
        // if (profile.zip_codes.length !== 5) {
        //   console.log('I got hoes.. I need your area code!');
        // }
        // if (!userProfile.profile_completed) {
        //   history.replace('/welcome');
        // }
        // }
      } catch (error) {
        console.error('Error getting user profile: ', error);
      }
    };
    fetchUserProfile();
  }, []);

  // 2. after we have a user, get user settings
  useEffect(() => {
    const fetchUserSettings = async () => {
      try {
        const settingsSnapshot = await db
          .collection('settings')
          .doc(user.uid)
          .get();
        const settings = settingsSnapshot.data();
        setUserSettings(settings);
      } catch (error) {
        console.error('Error getting user settings: ', error);
      }
    };

    if (user) fetchUserSettings();
  }, [user]);

  // 3. after we have user settings, fetch potential matches
  useEffect(() => {
    const fetchProfilesForMatching = async () => {
      // if all profiles and settings are init'd properly, we don't have to supply defaults with these || statements
      resetSwipeLimitAfter(user.uid, 24);
      const swipesRemaining = parseInt(userProfile.swipes_remaining);
      if (swipesRemaining) {
        setSwipeLimitReached(false);
        setNoMatches(false);
        const min_age =
          userSettings.match_age_min ||
          appConfig.settingsDefaults.match_age_min;
        const max_age =
          userSettings.match_age_max ||
          appConfig.settingsDefaults.match_age_max;
        const profilesSnapshot = await db
          .collection('profiles')
          .where('age', '>=', min_age)
          .where('age', '<=', max_age)
          .where('profile_completed', '==', true)
          .limit(20)
          .get();
        const profiles = profilesSnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }));
        const potentialMatches = runMatchAlgo(userProfile, profiles, user);
        if (!potentialMatches.length) {
          setNoMatches(true);
        } else {
          setPotentialMatches(potentialMatches);
        }
      } else {
        setSwipeLimitReached(true);
      }
    };

    if (userSettings) fetchProfilesForMatching();
  }, [userSettings, userProfile]);

  const swipe = (swipedUserId, isLike, matchCallback) => {
    recordSwipe(user.uid, swipedUserId, isLike, matchCallback);
  };

  const [gone] = useState(() => new Set());

  const [props, set] = useSprings(potentialMatches.length, i => ({
    ...to(i),
    from: from(i)
  }));

  const bind = useGesture(
    ({
      args: [index, uid, matchCallback],
      down,
      delta: [xDelta],
      distance,
      direction: [xDir],
      velocity
    }) => {
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
        //   console.log('WHAT?', potentialMatches);
        //   // console.log('Direction: right index:', index);
        // } else {
        //   // console.log('Direction: left index:', index);
        // }

        if (isGone) {
          const like = dir === 1;
          swipe(uid, like, matchCallback);
        }

        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 }
        };
      });

      if (!down && gone.size === potentialMatches.length) {
        // all cards have been swiped
        toast(`That's all we have for you right now. Check back later!`);
      }
    }
  );

  if (swipeLimitReached)
    return (
      <>
        <Navigation />
        <div>
          <MessageDisplay>
            You've reached your swipe limit for today! Come back in 24 hours!
            <br />
            <Link to="/upgrade">Upgrade your account</Link>
          </MessageDisplay>
        </div>
      </>
    );

  if (noMatches)
    return (
      <div>
        <Navigation />
        <MessageDisplay>
          Sorry, no matches :/ <br />{' '}
          <Link to="/settings">Update match settings</Link>
        </MessageDisplay>
      </div>
    );

  if (potentialMatches.length) {
    return (
      <>
        <div id="nav">
          <Navigation />
        </div>
        <div>
          {props.map(({ x, y, rot, scale }, i) => {
            const match = potentialMatches[i];
            return (
              <MatchCard
                key={match.id}
                className="td-card"
                i={i}
                x={x}
                y={y}
                rot={rot}
                scale={scale}
                trans={trans}
                data={match}
                bind={bind}
                matchNotify={matchNotify}
              />
            );
          })}
        </div>
      </>
    );
  } else {
    return <Loading />;
  }
};
export default ThunderDeck;
