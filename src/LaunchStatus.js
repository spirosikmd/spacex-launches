import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import GroupWorkRoundedIcon from '@material-ui/icons/GroupWorkRounded';
import MoreHorizRoundedIcon from '@material-ui/icons/MoreHorizRounded';

const styles = theme => ({
  status: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    padding: theme.spacing.unit / 2,
    zIndex: '1',
  },
  statusIcon: {
    fontSize: 16,
  },
  upcoming: {
    color: theme.palette.grey['500'],
  },
  success: {
    color: theme.palette.success.main,
  },
  fail: {
    color: theme.palette.error.main,
  },
  inProgress: {
    color: theme.palette.grey['500'],
  },
});

const LaunchStatus = ({
  classes,
  isSuccessful,
  isFailed,
  isUpcoming,
  isInProgress,
}) => {
  const statusClassName = classnames(classes.status, {
    [classes.success]: isSuccessful,
    [classes.fail]: isFailed,
    [classes.upcoming]: isUpcoming,
    [classes.inProgress]: isInProgress,
  });

  return (
    <Paper className={statusClassName} elevation={1}>
      {isInProgress ? (
        <MoreHorizRoundedIcon className={classes.statusIcon} />
      ) : (
        <GroupWorkRoundedIcon className={classes.statusIcon} />
      )}
    </Paper>
  );
};

LaunchStatus.propTypes = {
  classes: PropTypes.object.isRequired,
  isSuccessful: PropTypes.bool.isRequired,
  isFailed: PropTypes.bool.isRequired,
  isUpcoming: PropTypes.bool.isRequired,
  isInProgress: PropTypes.bool.isRequired,
};

export default withStyles(styles)(React.memo(LaunchStatus));
