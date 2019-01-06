import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import GroupWorkRoundedIcon from '@material-ui/icons/GroupWorkRounded';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

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
    flexGrow: 1,
  },
  connector: {
    minWidth: theme.spacing.unit * 2,
    border: `0.5px dashed ${theme.palette.secondary.dark}`,
    marginTop: '1px',
  },
});

function padDate(date) {
  return ('0' + date).slice(-2);
}

function getDateTime(utcDate, isLaunchTentative) {
  if (isLaunchTentative) {
    const day = padDate(utcDate.getDate() + 1);
    const month = padDate(utcDate.getMonth() + 1);
    const year = utcDate.getFullYear();
    return `${day}/${month}/${year}`;
  }

  return utcDate.toLocaleString();
}

export const Launch = ({ classes, launch }) => {
  const statusClassName = classnames(classes.status, {
    [classes.success]: launch.isSuccessful,
    [classes.fail]: launch.isFailed,
    [classes.upcoming]: launch.isUpcoming,
  });

  const hadMissionIds = launch.missionIds.length > 0;
  const hasContent = launch.details || hadMissionIds;

  return (
    <div className={classes.launch}>
      <Paper className={statusClassName} elevation={1}>
        <GroupWorkRoundedIcon className={classes.statusIcon} />
      </Paper>
      <div className={classes.connector} />
      <Card className={classes.launchInfo}>
        <CardHeader
          title={launch.missionName}
          subheader={getDateTime(launch.utcDate, launch.isTentative)}
        />
        {hasContent && (
          <CardContent>
            {launch.details &&
              (hadMissionIds > 0 ? (
                <Typography component="p" gutterBottom>
                  {launch.details}
                </Typography>
              ) : (
                <Typography component="p">{launch.details}</Typography>
              ))}
            {hadMissionIds > 0 && (
              <Typography color="textSecondary" component="p">
                ID: {launch.missionIds.join(', ')}
              </Typography>
            )}
          </CardContent>
        )}
      </Card>
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
  missionIds: PropTypes.array.isRequired,
};

Launch.propTypes = {
  classes: PropTypes.object.isRequired,
  launch: PropTypes.shape(LaunchPropType).isRequired,
};

export default withStyles(styles)(React.memo(Launch));
