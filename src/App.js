import React, { PureComponent, Suspense } from 'react';
import { Router } from '@reach/router';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
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

class App extends PureComponent {
  render() {
    const { classes } = this.props;

    return (
      <>
        <TopBar />
        <main className={classes.main}>
          <CssBaseline />
          <Suspense fallback={<Loader />}>
            <Router>
              <NotFound default />
              <Home path="/" />
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
