import React, { useState, useEffect, useContext } from 'react';
import { firebase } from '../../firebase';
import { AuthContext } from '../../contexts/AuthContext';
import Deck from './Deck';
import Navigation from '../Navigation';

const getDocsArray = async collection => {
  const snapshot = await firebase
    .firestore()
    .collection(collection)
    .get();
  return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
};

// 1 funcion create setting doc for the user uid
// 2 function check profile is created if completed is false check profile step. send user to step +1
//if completed is true send to thunderdome.

const initSettings = user => {
  firebase
    .firestore()
    .collection('settings')
    .doc(user.uid)
    .get()
    .then(snapshot => {
      if (!snapshot.exists) {
        firebase
          .firestore()
          .collection('settings')
          .doc(user.uid)
          .set({
            match_age_min: 18,
            match_age_max: 99,
            match_distance: 10
          });
      }
    });
};

const initProfile = user => {
  firebase
    .firestore()
    .collection('profiles')
    .doc(user.uid)
    .get()
    .then(snapshot => {
      if (!snapshot.exists) {
        firebase
          .firestore()
          .collection('profiles')
          .doc(user.uid)
          .set({});
      }
    });
};

const Onboarding = ({ history }) => {
  const { user } = useContext(AuthContext);
  const [prompts, setPrompts] = useState(null);
  const [STDs, setSTDs] = useState(null);
  const [genders, setGenders] = useState(null);
  const [cardsData, setCardsData] = useState(null);

  const getPrompts = async () => {
    const promptsArr = await getDocsArray('onboarding');
    setPrompts(promptsArr);
  };

  const getSTDs = async () => {
    const STDsArr = await getDocsArray('stds');
    setSTDs(STDsArr.map(s => ({ label: s.label, value: s.value })));
  };

  const getGenders = async () => {
    const gendersArr = await getDocsArray('gender');
    setGenders(gendersArr.map(g => ({ label: g.label, value: g.value })));
  };

  useEffect(() => {
    if (user) {
      initProfile(user);
      initSettings(user);
    }
  }, [user]);

  // CDM
  useEffect(() => {
    // firebase
    //   .firestore()
    //   .collection('profiles')
    //   .doc(user.uid)
    //   .get()
    //   .then(function(doc) {
    //     if (doc.data().profile_completed) {
    //       console.log(doc.data().profile_completed);
    //       history.replace('/thunderdome');
    //     } else {
    //       const currentStep = doc.data().profile_step;
    //     }
    //   });
    getPrompts();
    getSTDs();
    getGenders();
  }, []);

  // build the card data after fetching deps from Firebase
  useEffect(() => {
    if (prompts && STDs && genders) {
      const onboardingSteps = prompts
        .reduce((steps, prompt) => {
          // remove dupes
          const step = prompt.onboarding_step;
          return steps.find(s => s === step) ? steps : [...steps, step];
        }, [])
        .sort();
      // .filter(continueStep); //TODO: Add filter step + 1

      const cardsData = onboardingSteps
        .map(step => {
          const cardPrompts = prompts
            .filter(p => p.onboarding_step === step)
            .map(p => {
              const includesConditions =
                p.field_name && p.field_name.includes('conditions');
              return includesConditions ? { ...p, choices: STDs } : p;
            })
            .map(p => {
              const includesGender =
                p.field_name && p.field_name.includes('gender');
              return includesGender ? { ...p, choices: genders } : p;
            })
            .sort((a, b) => a.prompt_order - b.prompt_order);
          return {
            cardTitle: cardPrompts[0].card_title, // TODO work this out, set dynamically
            onboardingStep: step,
            prompts: cardPrompts
          };
        })
        // put the first step on top of the card deck
        .reverse();
      setCardsData(cardsData);
    }
  }, [prompts, STDs, genders]);

  // logging, safe to remove
  // useEffect(() => {
  //   console.log(cardsData);
  // }, [cardsData]);

  return cardsData ? (
    <Deck className='deck' cardsData={cardsData} />
  ) : (
    <div>Loading...</div>
  );
};

export default Onboarding;
