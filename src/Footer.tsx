import React from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  Theme,
  WithStyles,
  createStyles,
} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Anchor from './Anchor';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      padding: theme.spacing(2),
    },
  });

const Footer = ({ classes }: WithStyles<typeof styles>) => {
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

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(React.memo(Footer));
