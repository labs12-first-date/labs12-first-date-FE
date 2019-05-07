import React, { useState, useEffect } from 'react';
import axios from 'axios';


const LocationDistance = () => {
  const [location, setLocation] = useState(null);

  useEffect(async () => {
    const result = await axios(
      'https://api.zip-codes.com/ZipCodesAPI.svc/1.0/FindZipCodesInRadius?zipcode=32927&minimumradius=0&maximumradius=10&key=DEMOAPIKEY',
    );
    setLocation(result.data);
  }, []);

  
  {if (!location) {
    return (
    <div>
        {/* <p>There is no location!!!</p> */}
        {console.log('before useEffect', location)}
    </div>
    )
  } else {
    return (
        <div>
            {/* <p>Location does exist!!!</p> */}
            {console.log('after useEffect', location.DataList.map(data => {
                return data.Code;
            }))}
        </div>
        )
  }}
}

export default LocationDistance;  