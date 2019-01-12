import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  anchor: {
    color: theme.palette.primary.light,
    '&:hover': {
      color: theme.palette.primary.main,
    },
    '&:visited': {
      color: theme.palette.primary.dark,
    },
  },
});

export const Anchor = ({ classes, children, ...props }) => {
  return (
    <a className={classes.anchor} {...props}>
      {children}
    </a>
  );
};

export default withStyles(styles)(React.memo(Anchor));
