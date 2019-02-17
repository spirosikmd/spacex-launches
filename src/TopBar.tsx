import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import GroupWorkRoundedIcon from '@material-ui/icons/GroupWorkRounded';
import {
  withStyles,
  Theme,
  createStyles,
  WithStyles,
} from '@material-ui/core/styles';

const styles = (theme: Theme) =>
  createStyles({
    logo: {
      marginLeft: -theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },
  });

const TopBar = ({ classes }: WithStyles<typeof styles>) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <GroupWorkRoundedIcon className={classes.logo} />
        <Typography variant="h6" color="inherit">
          SpaceX Launches
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(React.memo(TopBar));
