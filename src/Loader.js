import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const Loader = ({ classes }) => {
  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  );
};

Loader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(React.memo(Loader));
