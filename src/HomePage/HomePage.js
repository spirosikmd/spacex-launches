import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import GeneralInfo from '../GeneralInfo';
import LaunchList from '../LaunchList';
import SortingOptions from '../SortingOptions';
import StatusFilter from '../StatusFilter';
import Loader from '../Loader';

const styles = theme => ({
  loader: {
    paddingTop: theme.spacing.unit * 8,
    paddingBottom: theme.spacing.unit * 8,
  },
});

export const HomePage = ({
  classes,
  launches,
  processedLaunches,
  showFailed,
  showSuccessful,
  showUpcoming,
  sortField,
  sortOrder,
  isUpdatingLaunches,
  isLoadingLaunches,
  onChange,
  onSortChange,
}) => {
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
          onChange={onChange}
        />
      </Grid>
      {processedLaunches.length > 0 && (
        <Grid item xs={12}>
          <SortingOptions
            sortField={sortField}
            sortOrder={sortOrder}
            onSortChange={onSortChange}
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
};

export default withStyles(styles)(React.memo(HomePage));
