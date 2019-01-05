import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {
  getNumberOfSuccessful,
  getNumberOfFailed,
  getNumberOfUpcoming,
} from './utils';
import { LaunchPropType } from './Launch';

export const GeneralInfo = ({ launches }) => {
  return (
    <>
      <Typography>Total: {launches.length}</Typography>
      <Typography>Successful: {getNumberOfSuccessful(launches)}</Typography>
      <Typography>Failed: {getNumberOfFailed(launches)}</Typography>
      <Typography>Upcoming: {getNumberOfUpcoming(launches)}</Typography>
    </>
  );
};

GeneralInfo.propTypes = {
  launches: PropTypes.arrayOf(PropTypes.shape(LaunchPropType)).isRequired,
};

export default React.memo(GeneralInfo);
