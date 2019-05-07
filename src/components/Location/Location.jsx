import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../Loading';

const LocationDistance = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const result = await axios(
        'https://api.zip-codes.com/ZipCodesAPI.svc/1.0/FindZipCodesInRadius?zipcode=32927&minimumradius=0&maximumradius=10&key=DEMOAPIKEY'
      );
      setLocation(result.data);
    };
    getData();
  }, []);

  return !location ? (
    <Loading />
  ) : (
    <div>
      {/* <p>Location does exist!!!</p> */}
      {console.log(
        'after useEffect',
        location.DataList.map(data => {
          return data.Code;
        })
      )}
    </div>
  );
};

export default LocationDistance;