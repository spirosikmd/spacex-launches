import React from 'react';
import Typography from '@material-ui/core/Typography';
import {
  getNumberOfSuccessful,
  getNumberOfFailed,
  getNumberOfUpcoming
} from './launches';

const GeneralInfo = React.memo(({ launches }) => {
  return (
    <>
      <Typography>Total: {launches.length}</Typography>
      <Typography>Successful: {getNumberOfSuccessful(launches)}</Typography>
      <Typography>Failed: {getNumberOfFailed(launches)}</Typography>
      <Typography>Upcoming: {getNumberOfUpcoming(launches)}</Typography>
    </>
  );
});

export default GeneralInfo;
