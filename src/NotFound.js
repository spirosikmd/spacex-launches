import React from 'react';
import Image from './Image';
import notFoundImage from './notFound.png';

const NotFound = () => {
  return <Image alt="Not found" src={notFoundImage} />;
};

export default React.memo(NotFound);
