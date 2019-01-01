import React from 'react';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
  status: {
    height: '8px',
    width: '8px',
    borderRadius: '50%',
    marginRight: theme.spacing.unit,
  },
  upcoming: {
    backgroundColor: theme.palette.grey['300'],
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
});

const Launch = React.memo(({ classes, launch }) => {
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
        <Typography>{launch.details}</Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
});

export default withStyles(styles)(Launch);
