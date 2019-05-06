import React, { useState, useEffect } from 'react';
import axios from 'axios';


const LocationDistance = () => {
  const [location, setLocation] = useState([

  ]);

  useEffect(async () => {
    const result = await axios(
      'https://api.zip-codes.com/ZipCodesAPI.svc/1.0/FindZipCodesInRadius?zipcode=32927&minimumradius=0&maximumradius=10&key=DEMOAPIKEY',
    );

    setLocation(result.data);
  }, []);
console.log(location);
  
    return (
      <div>
        
      </div>
    )
  }


export default LocationDistance;  