import db from '../firebase/index';

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
      db.db.collection('stds').add(element);
    });
  };
  let data = [];
  db.db
    .collection('stds')
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => data.push(doc.data()));
      // data = snapshot.getData();
    });
  console.log(data);

  return (
    <div>
      <button onClick={seed}>hay</button>
      {/* {data.map(seed => {
        return <p>{seed}</p>;
      })} */}

      {data.map(seed => (
        <p>{seed.condition}</p>
      ))}
    </div>
  );
}