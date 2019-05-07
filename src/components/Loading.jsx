import React, { useState } from 'react';
import { PacmanLoader } from 'react-spinners';
// Another way to import
import PacmanLoader from 'react-spinners/PacmanLoader';

const Loading = () => {
  const [loader] = useState(true);
  return (
    <div>
      {' '}
      <PacmanLoader
        css={override}
        sizeUnit={'px'}
        size={150}
        color={'#123abc'}
        loading={loader}
      />
    </div>
  );
};

export default Loading;
