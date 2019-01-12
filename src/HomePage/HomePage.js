import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import GeneralInfo from '../GeneralInfo';
import LaunchList from '../LaunchList';
import SortingOptions from '../SortingOptions';
import StatusFilter from '../StatusFilter';
import Loader from '../Loader';
import { getLaunches } from '../api';
import { processLaunches } from '../utils';
import { DESC, UTC_DATE_FIELD, FIELDS } from '../constants';

function getBooleanParam(param) {
  return param === null ? true : param === 'true';
}

function getParams(location) {
  const searchParams = new URLSearchParams(location.search);
  return {
    showUpcoming: getBooleanParam(searchParams.get('upcoming')),
    showSuccessful: getBooleanParam(searchParams.get('successful')),
    showFailed: getBooleanParam(searchParams.get('failed')),
  };
}

function setParams({
  showUpcoming = true,
  showSuccessful = true,
  showFailed = true,
}) {
  const searchParams = new URLSearchParams();
  searchParams.set('upcoming', showUpcoming);
  searchParams.set('successful', showSuccessful);
  searchParams.set('failed', showFailed);
  return searchParams.toString();
}

const styles = theme => ({
  loader: {
    paddingTop: theme.spacing.unit * 8,
    paddingBottom: theme.spacing.unit * 8,
  },
});

export class HomePage extends PureComponent {
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
      sortOrder,
      sortField,
    } = this.state;

    const { showUpcoming, showSuccessful, showFailed } = getParams(
      this.props.location
    );

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
