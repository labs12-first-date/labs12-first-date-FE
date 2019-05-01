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
  const [cardsData, setCardsData] = useState(null);

  const getPrompts = async () => {
    const promptsArr = await getDocsArray('onboarding');
    setPrompts(promptsArr);
  };

  const getSTDs = async () => {
    const STDsArr = await getDocsArray('stds');
    setSTDs(STDsArr.map(s => ({ label: s.label, value: s.value })));
  };

  // CDM
  useEffect(() => {
    getPrompts();
    getSTDs();
  }, []);

  // build the card data after fetching deps from Firebase
  useEffect(() => {
    if (prompts && STDs) {
      const onboardingSteps = prompts
        .reduce((steps, prompt) => {
          // remove dupes
          const step = prompt.onboarding_step;
          return steps.find(s => s === step) ? steps : [...steps, step];
        }, [])
        .sort();

      const cardsData = onboardingSteps.map(step => {
        const cardPrompts = prompts
          .filter(p => p.onboarding_step === step)
          .map(p => {
            const includeConditions = p.field_name && p.field_name.includes('conditions');
            return includeConditions ? { ...p, choices: STDs } : p;
          });
        return {
          cardTitle: 'Card title', // TODO work this out, set dynamically
          onboardingStep: step,
          prompts: cardPrompts
        };
      });
      setCardsData(cardsData);
    }
  }, [prompts, STDs]);

  // logging, safe to remove
  // useEffect(() => {
  //   console.log(cardsData);
  // }, [cardsData]);

  return cardsData ? <Deck cardsData={cardsData} /> : <div>Loading...</div>;
  // return <div>Loading...</div>;
};

export default Onboarding;
