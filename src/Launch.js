import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import BallotIcon from '@material-ui/icons/Ballot';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  status: {
    height: '8px',
    width: '8px',
    borderRadius: '50%',
    marginRight: theme.spacing.unit,
  },
  upcoming: {
    backgroundColor: theme.palette.grey['500'],
  },
  success: {
    backgroundColor: theme.palette.success.main,
  },
  fail: {
    backgroundColor: theme.palette.error.main,
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  missionName: {
    marginRight: theme.spacing.unit * 2,
  },
  tentative: {
    marginRight: theme.spacing.unit,
  },
});

export const Launch = ({ classes, launch }) => {
  const statusClassName = classnames(classes.status, {
    [classes.success]: launch.isSuccessful,
    [classes.fail]: launch.isFailed,
    [classes.upcoming]: launch.isUpcoming,
  });

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <div className={classes.wrapper}>
          <span className={statusClassName} />
          <Typography className={classes.missionName}>
            {launch.missionName}
          </Typography>
          <Typography color="textSecondary">
            {launch.utcDate.toLocaleString()}
          </Typography>
        </div>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Grid container spacing={8}>
          {launch.isTentative && (
            <Grid item xs={12}>
              <div className={classes.wrapper}>
                <BallotIcon color="disabled" className={classes.tentative} />
                <Typography>Tentative</Typography>
              </div>
            </Grid>
          )}
          <Grid item xs={12}>
            {launch.details ? (
              <Typography>{launch.details}</Typography>
            ) : (
              <Typography color="textSecondary">
                No details have been published yet.
              </Typography>
            )}
          </Grid>
        </Grid>
      </ExpansionPanelDetails>
    </ExpansionPanel>
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
