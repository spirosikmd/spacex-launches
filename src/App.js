import React, { PureComponent, Suspense } from 'react';
import { Router } from '@reach/router';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import { getLaunches } from './api';
import { processLaunches } from './utils';
import { DESC, UTC_DATE_FIELD, FIELDS } from './constants';
import Loader from './Loader';
import TopBar from './TopBar';
import Footer from './Footer';

const Home = React.lazy(() => import('./HomePage'));
const NotFound = React.lazy(() => import('./NotFound'));
const LaunchPage = React.lazy(() => import('./LaunchPage'));

const styles = theme => ({
  main: {
    padding: theme.spacing.unit * 2,
  },
});

export class App extends PureComponent {
  state = {
    launches: [],
    isLoadingLaunches: true,
    isUpdatingLaunches: false,
    error: null,
    showUpcoming: false,
    showSuccessful: true,
    showFailed: true,
    sortOrder: DESC,
    sortField: UTC_DATE_FIELD,
  };

  async componentDidMount() {
    try {
      const { sortField, sortOrder } = this.state;
      const launches = await getLaunches({
        sortField,
        sortOrder,
        filter: FIELDS,
      });
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
        const launches = await getLaunches({
          sortField,
          sortOrder,
          filter: FIELDS,
        });
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
          <Suspense fallback={<Loader />}>
            <Router>
              <NotFound default />
              <Home
                path="/"
                launches={launches}
                processedLaunches={processedLaunches}
                showFailed={showFailed}
                showSuccessful={showSuccessful}
                showUpcoming={showUpcoming}
                sortField={sortField}
                sortOrder={sortOrder}
                isUpdatingLaunches={isUpdatingLaunches}
                isLoadingLaunches={isLoadingLaunches}
                onChange={this.handleChange}
                onSortChange={this.handleSortChange}
              />
              <LaunchPage path="/launches/:flightNumber" />
            </Router>
          </Suspense>
        </main>
        <Footer />
      </>
    );
  }
}

export default withStyles(styles)(App);
