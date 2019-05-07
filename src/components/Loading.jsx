import React from 'react';
import { PacmanLoader } from 'react-spinners';
import PacmanLoader from 'react-spinners/PacmanLoader';
const Loading = () => {
  return (
    <div>
      <PacmanLoader
        css={override}
        sizeUnit={'px'}
        size={150}
        color={'#123abc'}
        loading={true}
      />
    </div>
  );
};

export default Loading;
