import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { LaunchPropType } from './Launch';
import { LaunchData } from '../api';

export function getNumberOfSuccessful(launches: LaunchData[]) {
  return launches.filter(launch => launch.isSuccessful).length;
}

export function getNumberOfUpcoming(launches: LaunchData[]) {
  return launches.filter(launch => launch.isUpcoming).length;
}

export function getNumberOfFailed(launches: LaunchData[]) {
  return launches.filter(launch => launch.isFailed).length;
}

interface GeneralInfoProps {
  launches: LaunchData[];
}

const GeneralInfo = ({ launches }: GeneralInfoProps) => {
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
