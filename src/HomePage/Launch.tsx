import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import {
  withStyles,
  Theme,
  WithStyles,
  createStyles,
} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button, { ButtonProps } from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import LaunchDateTime from '../LaunchDateTime';
import LaunchStatus from '../LaunchStatus';
import LaunchMissionIds from '../LaunchMissionIds';
import { LaunchData } from '../api';

const styles = (theme: Theme) =>
  createStyles({
    launch: {
      display: 'flex',
      alignItems: 'center',
    },
    launchInfo: {
      flexGrow: 1,
    },
    connector: {
      minWidth: theme.spacing(2),
      border: `0.5px dashed ${theme.palette.secondary.dark}`,
      marginTop: '1px',
    },
  });

interface LinkButtonProps extends ButtonProps {
  to: string;
}

const LinkButton = (props: LinkButtonProps) => (
  <Button {...props} component={Link as any} />
);

interface LaunchProps extends WithStyles<typeof styles> {
  launch: LaunchData;
}

const Launch = ({ classes, launch }: LaunchProps) => {
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
              <LaunchMissionIds missionIds={launch.missionIds} />
            )}
          </CardContent>
        )}
        {!launch.isTentative && (
          <CardActions>
            <LinkButton
              size="small"
              color="primary"
              to={`/launches/${launch.flightNumber}`}
            >
              explore
            </LinkButton>
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
