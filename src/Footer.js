import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Anchor from './Anchor';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: theme.spacing.unit * 2,
  },
});

const Footer = ({ classes }) => {
  return (
    <div className={classes.root}>
      <Typography>
        SpaceX Launches |{' '}
        <Anchor target="_blank" href="https://spyros.io">
          spyros.io
        </Anchor>
      </Typography>
      <Typography>
        Made possible by the{' '}
        <Anchor target="_blank" href="https://github.com/r-spacex/SpaceX-API">
          SpaceX API
        </Anchor>
      </Typography>
    </div>
  );
};

export default withStyles(styles)(React.memo(Footer));
