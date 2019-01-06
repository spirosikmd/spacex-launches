import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: theme.spacing.unit * 2,
  },
});

export const Footer = ({ classes }) => {
  return (
    <div className={classes.root}>
      <Typography>
        SpaceX Launches | <a href="https://spyros.io">spyros.io</a>
      </Typography>
      <Typography>
        Made possible by the{' '}
        <a href="https://github.com/r-spacex/SpaceX-API">SpaceX API</a>
      </Typography>
    </div>
  );
};

export default withStyles(styles)(React.memo(Footer));
