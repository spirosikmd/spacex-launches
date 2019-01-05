import React, { PureComponent } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { getLaunches } from './api';
import GeneralInfo from './GeneralInfo';
import LaunchList from './LaunchList';
import SortingOptions from './SortingOptions';
import StatusFilter from './StatusFilter';
import Loader from './Loader';
import { processLaunches } from './launches';
import { DESC, UTC_DATE_FIELD } from './constants';
import TopBar from './TopBar';

const styles = theme => ({
  main: {
    height: '100%',
    padding: theme.spacing.unit * 2,
  },
  updatingLoader: {
    paddingTop: theme.spacing.unit * 8,
  },
});

export class App extends PureComponent {
  state = {
    launches: [],
    isLoadingLaunches: false,
    isUpdatingLaunches: false,
    error: null,
    showUpcoming: false,
    showSuccessful: true,
    showFailed: true,
    sortOrder: DESC,
    sortField: UTC_DATE_FIELD,
  };

  async componentDidMount() {
    this.setState({ isLoadingLaunches: true });
    try {
      const { sortField, sortOrder } = this.state;
      const launches = await getLaunches({ sortField, sortOrder });
      this.setState({ launches, isLoadingLaunches: false });
    } catch (error) {
      this.setState({ error, isLoadingLaunches: false });
    }
  }

  handleChange = (value, checked) => {
    this.setState({ [value]: checked });
  };

  handleSortChange = (name, value) => {
    this.setState(
      {
        [name]: value,
        isUpdatingLaunches: true,
      },
      async () => {
        const { sortField, sortOrder } = this.state;
        const launches = await getLaunches({ sortField, sortOrder });
        this.setState({ launches, isUpdatingLaunches: false });
      }
    );
  };

  render() {
    const { classes } = this.props;
    const {
      launches,
      isLoadingLaunches,
      isUpdatingLaunches,
      showUpcoming,
      showSuccessful,
      showFailed,
      sortOrder,
      sortField,
    } = this.state;

    if (isLoadingLaunches) {
      return (
        <main className={classes.main}>
          <CssBaseline />
          <Loader />
        </main>
      );
    }

    const processedLaunches = processLaunches(launches, {
      showUpcoming,
      showSuccessful,
      showFailed,
    });

    return (
      <>
        <TopBar />
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
                sortField={sortField}
                sortOrder={sortOrder}
                onSortChange={this.handleSortChange}
              />
            </Grid>
            <Grid item xs={12}>
              {isUpdatingLaunches ? (
                <div className={classes.updatingLoader}>
                  <Loader />
                </div>
              ) : (
                <LaunchList launches={processedLaunches} />
              )}
            </Grid>
          </Grid>
        </main>
      </>
    );
  }
}

export default withStyles(styles)(App);
