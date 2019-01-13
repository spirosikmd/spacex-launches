import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const LaunchMissionIds = ({ missionIds }) => {
  return (
    <Typography color="textSecondary" component="p">
      ID{missionIds.length > 1 ? 's' : null}: {missionIds.join(', ')}
    </Typography>
  );
};

LaunchMissionIds.propTypes = {
  missionIds: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default React.memo(LaunchMissionIds);
