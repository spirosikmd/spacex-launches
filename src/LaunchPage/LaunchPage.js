import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { getLaunch } from '../api';
import Loader from '../Loader';
import LaunchDateTime from '../LaunchDateTime';
import LaunchStatus from '../LaunchStatus';

const styles = theme => ({
  headline: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing.unit * 3,
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  missionPatch: {
    width: '120px',
    height: '120px',
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.down('xs')]: {
      marginRight: 0,
      marginBottom: theme.spacing.unit * 3,
    },
  },
  missionName: {
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
    },
  },
  details: {
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
  },
  date: {
    marginBottom: theme.spacing.unit,
  },
  status: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing.unit * 2,
  },
});

class LaunchPage extends PureComponent {
  state = {
    error: null,
    launch: null,
    isLoadingLaunch: true,
  };

  async componentDidMount() {
    try {
      const { flightNumber } = this.props;
      const launch = await getLaunch({ flightNumber });
      this.setState({ isLoadingLaunch: false, launch });
    } catch (error) {
      this.setState({ error, isLoadingLaunch: false });
    }
  }

  render() {
    const { classes } = this.props;
    const { launch, isLoadingLaunch, error } = this.state;

    if (isLoadingLaunch) {
      return <Loader />;
    }

    if (error) {
      return <Typography>{error.message}</Typography>;
    }

    return (
      <div>
        <div className={classes.headline}>
          {launch.missionPatch && (
            <img
              className={classes.missionPatch}
              src={launch.missionPatch}
              alt={launch.missionName}
            />
          )}
          <Typography variant="h4" className={classes.missionName}>
            {launch.missionName}
          </Typography>
        </div>
        <Typography variant="subtitle1" className={classes.date}>
          {
            <LaunchDateTime
              utcDate={launch.utcDate}
              isTentative={launch.isTentative}
            />
          }
        </Typography>
        <div className={classes.status}>
          <LaunchStatus
            isSuccessful={launch.isSuccessful}
            isFailed={launch.isFailed}
            isUpcoming={launch.isUpcoming}
            isInProgress={launch.isInProgress}
          />
        </div>
        <Typography>{launch.details}</Typography>
      </div>
    );
  }
}

LaunchPage.propTypes = {
  flightNumber: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LaunchPage);
