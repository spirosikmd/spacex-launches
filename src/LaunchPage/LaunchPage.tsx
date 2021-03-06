import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  Theme,
  createStyles,
  WithStyles,
} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Redirect, RouteComponentProps } from '@reach/router';
import { getLaunch, LaunchData } from '../api';
import Loader from '../Loader';
import LaunchDateTime from '../LaunchDateTime';
import LaunchStatus from '../LaunchStatus';
import LaunchMissionIds from '../LaunchMissionIds';

const styles = (theme: Theme) =>
  createStyles({
    headline: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: theme.spacing(3),
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
      },
    },
    missionPatch: {
      width: '120px',
      height: '120px',
      marginRight: theme.spacing(3),
      [theme.breakpoints.down('xs')]: {
        marginRight: 0,
        marginBottom: theme.spacing(3),
      },
    },
    missionName: {
      [theme.breakpoints.down('xs')]: {
        textAlign: 'center',
      },
    },
    details: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    date: {
      marginBottom: theme.spacing(1),
    },
    statusMissionIds: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: theme.spacing(2),
    },
    missionIds: {
      marginLeft: theme.spacing(1),
    },
  });

interface LaunchPageProps
  extends RouteComponentProps<{ flightNumber: string }>,
    WithStyles<typeof styles> {}

const LaunchPage = ({ classes, flightNumber }: LaunchPageProps) => {
  const [error, setError] = useState<Error | null>(null);
  const [launch, setLaunch] = useState<LaunchData | null>(null);
  const [isLoadingLaunch, setIsLoadingLaunch] = useState(true);

  useEffect(() => {
    if (!flightNumber) return;

    const fetchLaunch = async () => {
      try {
        const launch = await getLaunch({ flightNumber });
        setLaunch(launch);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoadingLaunch(false);
      }
    };

    fetchLaunch();
  }, [flightNumber]);

  if (isLoadingLaunch) {
    return <Loader />;
  }

  if (error) {
    return <Typography>{error.message}</Typography>;
  }

  if (!launch || launch.isTentative) {
    return <Redirect to="/" noThrow />;
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
        <LaunchDateTime
          utcDate={launch.utcDate}
          isTentative={launch.isTentative}
        />
      </Typography>
      <div className={classes.statusMissionIds}>
        <LaunchStatus
          isSuccessful={launch.isSuccessful}
          isFailed={launch.isFailed}
          isUpcoming={launch.isUpcoming}
          isInProgress={launch.isInProgress}
        />
        {launch.missionIds.length > 0 && (
          <div className={classes.missionIds}>
            <LaunchMissionIds missionIds={launch.missionIds} />
          </div>
        )}
      </div>
      <Typography>{launch.details}</Typography>
    </div>
  );
};

LaunchPage.propTypes = {
  flightNumber: PropTypes.string,
  classes: PropTypes.shape({
    headline: PropTypes.string.isRequired,
    missionPatch: PropTypes.string.isRequired,
    missionName: PropTypes.string.isRequired,
    details: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    statusMissionIds: PropTypes.string.isRequired,
    missionIds: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styles)(React.memo(LaunchPage));
