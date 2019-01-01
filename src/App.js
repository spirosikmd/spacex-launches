import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { getLaunches } from './api';
import GeneralInfo from './GeneralInfo';
import Launch from './Launch';

const styles = theme => ({
  main: {
    height: '100%',
    padding: theme.spacing.unit * 2
  },
  loader: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

class App extends Component {
  state = {
    launches: [],
    isLoadingLaunches: false,
    error: null
  };

  async componentDidMount() {
    this.setState({ isLoadingLaunches: true });
    try {
      const launches = await getLaunches();
      this.setState({ launches, isLoadingLaunches: false });
    } catch (error) {
      this.setState({ error, isLoadingLaunches: false });
    }
  }

  render() {
    const { classes } = this.props;
    const { launches, isLoadingLaunches } = this.state;

    if (isLoadingLaunches) {
      return (
        <main className={classes.main}>
          <CssBaseline />
          <div className={classes.loader}>
            <CircularProgress />
          </div>
        </main>
      );
    }

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <GeneralInfo launches={launches} />
          </Grid>
          <Grid item xs={12}>
            {launches.map(launch => (
              <Launch key={launch.flightNumber} launch={launch} />
            ))}
          </Grid>
        </Grid>
      </main>
    );
  }
}

export default withStyles(styles)(App);
