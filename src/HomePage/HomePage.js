import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import GeneralInfo from '../GeneralInfo';
import LaunchList from '../LaunchList';
import SortingOptions from '../SortingOptions';
import StatusFilter from '../StatusFilter';
import Loader from '../Loader';
import { getLaunches } from '../api';
import { DESC, UTC_DATE_FIELD } from '../constants';

function processLaunches(
  launches,
  { showUpcoming, showSuccessful, showFailed }
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

function getBooleanParam(param) {
  return param === null ? true : param === 'true';
}

function getParams(location) {
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
  searchParams.set('upcoming', showUpcoming);
  searchParams.set('successful', showSuccessful);
  searchParams.set('failed', showFailed);
  searchParams.set('order', sortOrder);
  searchParams.set('sort', sortField);
  return searchParams.toString();
}

const styles = theme => ({
  loader: {
    paddingTop: theme.spacing.unit * 8,
    paddingBottom: theme.spacing.unit * 8,
  },
});

class HomePage extends PureComponent {
  state = {
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
    const params = getParams(location);
    const url = setParams({ ...params, ...newParams });
    navigate(`?${url}`);
  }

  handleStatusFilterChange = (value, checked) => {
    this.navigateWithParams({ [value]: checked });
  };

  handleSortChange = async (name, value) => {
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
    const { launches, isLoadingLaunches, isUpdatingLaunches } = this.state;

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
