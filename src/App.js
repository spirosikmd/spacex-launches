import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { getLaunches } from './api';
import GeneralInfo from './GeneralInfo';
import LaunchList from './LaunchList';
import SortingOptions from './SortingOptions';
import StatusFilter from './StatusFilter';
import { processLaunches } from './launches';
import { DESC } from './constants';

const styles = theme => ({
  main: {
    height: '100%',
    padding: theme.spacing.unit * 2,
  },
  loader: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class App extends Component {
  state = {
    launches: [],
    isLoadingLaunches: false,
    error: null,
    showUpcoming: true,
    showSuccessful: true,
    showFailed: true,
    dateSortOrder: DESC,
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

  handleChange = event => {
    this.setState({ [event.currentTarget.value]: event.currentTarget.checked });
  };

  handleSortChange = event => {
    this.setState({ [event.currentTarget.name]: event.currentTarget.value });
  };

  render() {
    const { classes } = this.props;
    const {
      launches,
      isLoadingLaunches,
      showUpcoming,
      showSuccessful,
      showFailed,
      dateSortOrder,
    } = this.state;

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

    const processedLaunches = processLaunches(
      launches,
      {
        showUpcoming,
        showSuccessful,
        showFailed,
      },
      {
        dateSortOrder,
      }
    );

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <GeneralInfo launches={launches} />
          </Grid>
          <Grid item xs={12}>
            <StatusFilter
              showFailed={showFailed}
              showSuccessful={showSuccessful}
              showUpcoming={showUpcoming}
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <SortingOptions
              dateSortOrder={dateSortOrder}
              onSortChange={this.handleSortChange}
            />
          </Grid>
          <Grid item xs={12}>
            <LaunchList launches={processedLaunches} />
          </Grid>
        </Grid>
      </main>
    );
  }
}

export default withStyles(styles)(App);
