import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { Router } from '@reach/router';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  withStyles,
  Theme,
  createStyles,
  WithStyles,
} from '@material-ui/core/styles';
import Loader from './Loader';
import TopBar from './TopBar';
import Footer from './Footer';

const HomePage = React.lazy(() => import('./HomePage'));
const NotFoundPage = React.lazy(() => import('./NotFoundPage'));
const LaunchPage = React.lazy(() => import('./LaunchPage'));

const styles = (theme: Theme) =>
  createStyles({
    main: {
      padding: theme.spacing(2),
    },
  });

const App = ({ classes }: WithStyles<typeof styles>) => {
  return (
    <>
      <TopBar />
      <main className={classes.main}>
        <CssBaseline />
        <Suspense fallback={<Loader />}>
          <Router>
            <NotFoundPage default />
            <HomePage path="/" />
            <LaunchPage path="/launches/:flightNumber" />
          </Router>
        </Suspense>
      </main>
      <Footer />
    </>
  );
};

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(React.memo(App));
