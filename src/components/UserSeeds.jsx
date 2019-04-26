import fb from '../firebase/config';

import React from 'react';

export default function SeedUser() {
  const seed = () => {
    const aids = [
      { condition: 'Aids', enabled: true },
      { condition: 'Clap', enabled: true },
      { condition: 'Gonorrhea', enabled: false },
      { condition: 'Hiv', enabled: true },
      { condition: 'HepC', enabled: false },
      { condition: 'Herpes', enabled: true },
      { condition: 'HepD', enabled: false },
      { condition: 'HepB', enabled: true },
      { condition: 'Syphyllis', enabled: false },
      { condition: 'Crabs', enabled: true },
      { condition: 'Warts', enabled: true }
    ];

    aids.forEach(element => {
      fb.firestore().collection('stds').add(element);
    });
  };
  

  return (
    <div>
      <button onClick={seed}>hay</button>
    </div>
  );
}