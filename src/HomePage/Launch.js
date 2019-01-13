import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import LaunchDateTime from '../LaunchDateTime';
import LaunchStatus from '../LaunchStatus';

const styles = theme => ({
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

const Launch = ({ classes, launch }) => {
  const hadMissionIds = launch.missionIds.length > 0;
  const hasContent = launch.details || hadMissionIds;

  return (
    <div className={classes.launch}>
      <LaunchStatus
        isSuccessful={launch.isSuccessful}
        isFailed={launch.isFailed}
        isUpcoming={launch.isUpcoming}
        isInProgress={launch.isInProgress}
      />
      <div className={classes.connector} />
      <Card className={classes.launchInfo}>
        <CardHeader
          title={launch.missionName}
          subheader={
            <LaunchDateTime
              utcDate={launch.utcDate}
              isTentative={launch.isTentative}
            />
          }
        />
        {hasContent && (
          <CardContent>
            {launch.details &&
              (hadMissionIds ? (
                <Typography component="p" gutterBottom>
                  {launch.details}
                </Typography>
              ) : (
                <Typography component="p">{launch.details}</Typography>
              ))}
            {hadMissionIds && (
              <Typography color="textSecondary" component="p">
                ID: {launch.missionIds.join(', ')}
              </Typography>
            )}
          </CardContent>
        )}
        {!launch.isTentative && (
          <CardActions>
            <Button
              size="small"
              color="primary"
              component={Link}
              to={`/launches/${launch.flightNumber}`}
            >
              explore
            </Button>
          </CardActions>
        )}
      </Card>
    </div>
  );
};

export const LaunchPropType = {
  isSuccessful: PropTypes.bool.isRequired,
  isFailed: PropTypes.bool.isRequired,
  isUpcoming: PropTypes.bool.isRequired,
  isInProgress: PropTypes.bool.isRequired,
  isTentative: PropTypes.bool.isRequired,
  missionName: PropTypes.string.isRequired,
  utcDate: PropTypes.object.isRequired,
  details: PropTypes.string,
  missionIds: PropTypes.array.isRequired,
  flightNumber: PropTypes.number.isRequired,
};

Launch.propTypes = {
  classes: PropTypes.object.isRequired,
  launch: PropTypes.shape(LaunchPropType).isRequired,
};

export default withStyles(styles)(React.memo(Launch));
