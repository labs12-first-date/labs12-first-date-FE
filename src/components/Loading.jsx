import React, { useState } from 'react';
import { PacmanLoader } from 'react-spinners';
import './Loading.css';
// Another way to import

const Loading = () => {
  const [loader] = useState(true);
  return (
    <div>
      {' '}
      <PacmanLoader
        css={css}
        sizeUnit={'px'}
        size={100}
        color={'#25d381'}
        loading={loader}
      />
    </div>
  );
};
const css = {
  margin: '10% auto',
  display: 'block'
};

export default Loading;
