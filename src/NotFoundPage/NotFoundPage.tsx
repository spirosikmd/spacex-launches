import React from 'react';
import Image from '../Image';
import notFoundImage from './notFound.png';
import { RouteComponentProps } from '@reach/router';

const NotFoundPage: (props: RouteComponentProps) => JSX.Element = () => {
  return <Image alt="Not found" src={notFoundImage} />;
};

export default React.memo(NotFoundPage);
