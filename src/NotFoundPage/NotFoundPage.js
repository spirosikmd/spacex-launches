import React from 'react';
import Image from '../Image';
import notFoundImage from './notFound.png';

const NotFoundPage = () => {
  return <Image alt="Not found" src={notFoundImage} />;
};

export default React.memo(NotFoundPage);
