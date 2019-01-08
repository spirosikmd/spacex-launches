import React from 'react';
import { Link } from '@reach/router';
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
  link: {
    textDecoration: 'none',
    color: theme.palette.common.white,
  },
});

export const TopBar = ({ classes }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <GroupWorkRoundedIcon className={classes.logo} />
        <Link to="/" className={classes.link}>
          <Typography variant="h6" color="inherit">
            SpaceX Launches
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles)(React.memo(TopBar));
