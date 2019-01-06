import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  imageWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '400px',
    [theme.breakpoints.down('xs')]: {
      width: '300px',
    },
  },
});

export const Image = ({ classes, alt, src }) => {
  return (
    <div className={classes.imageWrapper}>
      <img src={src} alt={alt} className={classes.image} />
    </div>
  );
};

Image.propTypes = {
  classes: PropTypes.object.isRequired,
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
};

export default withStyles(styles)(React.memo(Image));
