import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import GroupWorkRoundedIcon from '@material-ui/icons/GroupWorkRounded';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  logo: {
    marginLeft: -theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

const TopBar = ({ classes }) => {
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

export default withStyles(styles)(React.memo(TopBar));
