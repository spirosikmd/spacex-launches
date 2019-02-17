import React, { ReactNode } from 'react';
import {
  withStyles,
  Theme,
  WithStyles,
  createStyles,
} from '@material-ui/core/styles';

const styles = (theme: Theme) =>
  createStyles({
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

export interface AnchorProps extends WithStyles<typeof styles> {
  children: ReactNode;
  target: string;
  href: string;
}

const Anchor = ({ classes, children, ...props }: AnchorProps) => {
  return (
    <a className={classes.anchor} {...props}>
      {children}
    </a>
  );
};

export default withStyles(styles)(React.memo(Anchor));
