import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import GroupWorkRoundedIcon from '@material-ui/icons/GroupWorkRounded';

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
  launch: {
    display: 'flex',
    alignItems: 'center',
  },
  launchInfo: {
    padding: theme.spacing.unit * 2,
    flexGrow: 1,
  },
  connector: {
    minWidth: theme.spacing.unit * 2,
    border: `0.5px dashed ${theme.palette.secondary.dark}`,
    marginTop: '1px',
  },
});

export const Launch = ({ classes, launch }) => {
  const statusClassName = classnames(classes.status, {
    [classes.success]: launch.isSuccessful,
    [classes.fail]: launch.isFailed,
    [classes.upcoming]: launch.isUpcoming,
  });

  return (
    <div className={classes.launch}>
      <Paper className={statusClassName} elevation={1}>
        <GroupWorkRoundedIcon className={classes.statusIcon} />
      </Paper>
      <div className={classes.connector} />
      <Paper className={classes.launchInfo}>
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <Typography>{launch.missionName}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography color="textSecondary">
              {launch.utcDate.toLocaleString()}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>{launch.details}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export const LaunchPropType = {
  isSuccessful: PropTypes.bool.isRequired,
  isFailed: PropTypes.bool.isRequired,
  isUpcoming: PropTypes.bool.isRequired,
  isTentative: PropTypes.bool.isRequired,
  missionName: PropTypes.string.isRequired,
  utcDate: PropTypes.object.isRequired,
  details: PropTypes.string,
};

Launch.propTypes = {
  classes: PropTypes.object.isRequired,
  launch: PropTypes.shape(LaunchPropType).isRequired,
};

export default withStyles(styles)(React.memo(Launch));
