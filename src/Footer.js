import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.unit * 2,
  },
});

export const Footer = ({ classes }) => {
  return (
    <div className={classes.root}>
      <Typography>
        SpaceX Launches | <a href="https://spyros.io">spyros.io</a>
      </Typography>
    </div>
  );
};

export default withStyles(styles)(React.memo(Footer));
