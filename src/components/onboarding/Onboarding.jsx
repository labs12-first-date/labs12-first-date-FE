import React, { useState, useEffect } from 'react';
import { firebase } from '../../firebase';
import Deck from './Deck';

const getDocsArray = async collection => {
  const snapshot = await firebase
    .firestore()
    .collection(collection)
    .get();
  return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
};

const Onboarding = () => {
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

  // CDM
  useEffect(() => {
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

      const cardsData = onboardingSteps
        .map(step => {
          const cardPrompts = prompts
            .filter(p => p.onboarding_step === step)
            .map(p => {
              const includesConditions = p.field_name && p.field_name.includes('conditions');
              return includesConditions ? { ...p, choices: STDs } : p;
            })
            .map(p => {
              const includesGender = p.field_name && p.field_name.includes('gender');
              return includesGender ? { ...p, choices: genders } : p;
            });
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

  return cardsData ? <Deck cardsData={cardsData} /> : <div>Loading...</div>;
};

export default Onboarding;
