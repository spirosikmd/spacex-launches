import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
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
    marginRight: `${-theme.spacing.unit - 4}px`,
    zIndex: '1',
  },
  statusIcon: {
    fontSize: 16,
  },
  statusReverse: {
    marginRight: '0',
    marginLeft: `${-theme.spacing.unit - 4}px`,
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
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  rootReverse: {
    flexDirection: 'row-reverse',
  },
  launch: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing.unit * 2,
    flexGrow: 4,
    '&:hover': {
      cursor: 'pointer',
      boxShadow: theme.shadows[4],
    },
    [theme.breakpoints.up('xs')]: {
      maxWidth: '200px',
    },
    [theme.breakpoints.up('sm')]: {
      maxWidth: '280px',
    },
    [theme.breakpoints.up('md')]: {
      maxWidth: '100%',
    },
  },
  missionName: {
    marginRight: theme.spacing.unit * 2,
  },
  divider: {
    flexGrow: 1,
    border: `0.5px dashed ${theme.palette.secondary.main}`,
    marginTop: '1px',
  },
});

export const Launch = ({ classes, launch, reverse }) => {
  const rootClassName = classnames(classes.root, {
    [classes.rootReverse]: reverse,
  });
  const statusClassName = classnames(classes.status, {
    [classes.success]: launch.isSuccessful,
    [classes.fail]: launch.isFailed,
    [classes.upcoming]: launch.isUpcoming,
    [classes.statusReverse]: reverse,
  });

  return (
    <div className={rootClassName}>
      <Paper className={classes.launch}>
        <Typography className={classes.missionName} noWrap>
          {launch.missionName}
        </Typography>
        <Typography color="textSecondary" noWrap>
          {launch.utcDate.toLocaleString()}
        </Typography>
      </Paper>
      <div className={classes.divider} />
      <Paper className={statusClassName} elevation={1}>
        <GroupWorkRoundedIcon className={classes.statusIcon} />
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
  reverse: PropTypes.bool.isRequired,
};

export default withStyles(styles)(React.memo(Launch));
