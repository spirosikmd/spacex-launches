import React, { PureComponent } from 'react';
import {
  withStyles,
  Theme,
  createStyles,
  WithStyles,
} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import GeneralInfo from './GeneralInfo';
import LaunchList from './LaunchList';
import SortingOptions from './SortingOptions';
import StatusFilter from './StatusFilter';
import Loader from '../Loader';
import { getLaunches, LaunchData } from '../api';
import { DESC, UTC_DATE_FIELD } from '../constants';
import { RouteComponentProps, WindowLocation } from '@reach/router';

function processLaunches(
  launches: LaunchData[],
  {
    showUpcoming,
    showSuccessful,
    showFailed,
  }: { showUpcoming: boolean; showSuccessful: boolean; showFailed: boolean }
) {
  let processedLaunches = [...launches];

  if (!showUpcoming) {
    processedLaunches = processedLaunches.filter(launch => !launch.isUpcoming);
  }

  if (!showSuccessful) {
    processedLaunches = processedLaunches.filter(
      launch => !launch.isSuccessful
    );
  }

  if (!showFailed) {
    processedLaunches = processedLaunches.filter(launch => !launch.isFailed);
  }

  return processedLaunches;
}

function getBooleanParam(param: string | null) {
  return param === null ? true : param === 'true';
}

function getParams(
  location: WindowLocation | undefined
): {
  showUpcoming: boolean;
  showSuccessful: boolean;
  showFailed: boolean;
  sortOrder: string;
  sortField: string;
} {
  if (!location) {
    return {
      showUpcoming: true,
      showSuccessful: true,
      showFailed: true,
      sortOrder: DESC,
      sortField: UTC_DATE_FIELD,
    };
  }

  const searchParams = new URLSearchParams(location.search);

  return {
    showUpcoming: getBooleanParam(searchParams.get('upcoming')),
    showSuccessful: getBooleanParam(searchParams.get('successful')),
    showFailed: getBooleanParam(searchParams.get('failed')),
    sortOrder: searchParams.get('order') || DESC,
    sortField: searchParams.get('sort') || UTC_DATE_FIELD,
  };
}

function setParams({
  showUpcoming = true,
  showSuccessful = true,
  showFailed = true,
  sortOrder = DESC,
  sortField = UTC_DATE_FIELD,
}) {
  const searchParams = new URLSearchParams();
  searchParams.set('upcoming', showUpcoming.toString());
  searchParams.set('successful', showSuccessful.toString());
  searchParams.set('failed', showFailed.toString());
  searchParams.set('order', sortOrder);
  searchParams.set('sort', sortField);
  return searchParams.toString();
}

const styles = (theme: Theme) =>
  createStyles({
    loader: {
      paddingTop: theme.spacing.unit * 8,
      paddingBottom: theme.spacing.unit * 8,
    },
  });

interface HomePageState {
  launches: LaunchData[];
  isLoadingLaunches: boolean;
  isUpdatingLaunches: boolean;
  error: Error | null;
}

interface HomePageProps
  extends RouteComponentProps,
    WithStyles<typeof styles> {}

class HomePage extends PureComponent<HomePageProps, HomePageState> {
  state: HomePageState = {
    launches: [],
    isLoadingLaunches: true,
    isUpdatingLaunches: false,
    error: null,
  };

  async componentDidMount() {
    try {
      const { location } = this.props;
      const { sortField, sortOrder } = getParams(location);
      const launches = await getLaunches({
        sortField,
        sortOrder,
      });
      this.setState({ launches, isLoadingLaunches: false });
    } catch (error) {
      this.setState({ error, isLoadingLaunches: false });
    }

    this.navigateWithParams();
  }

  navigateWithParams(newParams = {}) {
    const { location, navigate } = this.props;
    if (!navigate) return;
    const params = getParams(location);
    const url = setParams({ ...params, ...newParams });
    navigate(`?${url}`);
  }

  handleStatusFilterChange = (value: string, checked: boolean) => {
    this.navigateWithParams({ [value]: checked });
  };

  handleSortChange = async (name: string, value: string) => {
    const { location } = this.props;
    this.setState({ isUpdatingLaunches: true });
    this.navigateWithParams({ [name]: value });
    const { sortField, sortOrder } = getParams(location);
    const launches = await getLaunches({
      sortField,
      sortOrder,
      ...{ [name]: value },
    });
    this.setState({ launches, isUpdatingLaunches: false });
  };

  render() {
    const { classes, location } = this.props;
    const {
      launches,
      isLoadingLaunches,
      isUpdatingLaunches,
      error,
    } = this.state;

    const {
      showUpcoming,
      showSuccessful,
      showFailed,
      sortField,
      sortOrder,
    } = getParams(location);

    const processedLaunches = processLaunches(launches, {
      showUpcoming,
      showSuccessful,
      showFailed,
    });

    if (isLoadingLaunches) {
      return (
        <div className={classes.loader}>
          <Loader />
        </div>
      );
    }

    if (error) {
      return <Typography>{error.message}</Typography>;
    }

    return (
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <GeneralInfo launches={launches} />
        </Grid>
        <Grid item xs={12}>
          <StatusFilter
            showFailed={showFailed}
            showSuccessful={showSuccessful}
            showUpcoming={showUpcoming}
            onChange={this.handleStatusFilterChange}
          />
        </Grid>
        {processedLaunches.length > 0 && (
          <Grid item xs={12}>
            <SortingOptions
              sortField={sortField}
              sortOrder={sortOrder}
              onSortChange={this.handleSortChange}
            />
          </Grid>
        )}
        <Grid item xs={12}>
          {isUpdatingLaunches ? (
            <div className={classes.loader}>
              <Loader />
            </div>
          ) : (
            <LaunchList launches={processedLaunches} />
          )}
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(React.memo(HomePage));
