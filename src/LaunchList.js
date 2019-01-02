import React from 'react';
import PropTypes from 'prop-types';
import Launch, { LaunchPropType } from './Launch';
import { Typography } from '@material-ui/core';

export const LaunchList = ({ launches }) => {
  if (launches.length === 0) {
    return <Typography>No launches...</Typography>;
  }

  return launches.map(launch => (
    <Launch key={launch.flightNumber} launch={launch} />
  ));
};

LaunchList.propTypes = {
  launches: PropTypes.arrayOf(PropTypes.shape(LaunchPropType)).isRequired,
};

export default React.memo(LaunchList);
