import React, { SyntheticEvent } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { ASC, DESC, FLIGHT_NUMBER_FIELD, UTC_DATE_FIELD } from '../constants';

function getSortOrderOptions(sortField: string) {
  switch (sortField) {
    case FLIGHT_NUMBER_FIELD:
      return (
        <>
          <option value={ASC}>smaller to bigger</option>
          <option value={DESC}>bigger to smaller</option>
        </>
      );
    case UTC_DATE_FIELD:
      return (
        <>
          <option value={ASC}>old to new</option>
          <option value={DESC}>new to old</option>
        </>
      );
    default:
      return (
        <>
          <option value={ASC}>ascending</option>
          <option value={DESC}>descending</option>
        </>
      );
  }
}

interface SortingOptionsProps {
  sortField: string;
  sortOrder: string;
  onSortChange: (name: string, value: string) => void;
}

const SortingOptions = ({
  sortField,
  sortOrder,
  onSortChange,
}: SortingOptionsProps) => {
  const handleSortChange = (event: SyntheticEvent) => {
    const target = event.currentTarget as HTMLSelectElement;
    onSortChange(target.name, target.value);
  };

  return (
    <Grid container spacing={8}>
      <Grid item>
        <TextField
          id="sort-field"
          select
          label="Sort field"
          value={sortField}
          onChange={handleSortChange}
          SelectProps={{
            native: true,
            name: 'sortField',
          }}
          margin="normal"
          variant="outlined"
        >
          <option value={FLIGHT_NUMBER_FIELD}>flight number</option>
          <option value={UTC_DATE_FIELD}>utc date</option>
        </TextField>
      </Grid>
      <Grid item>
        <TextField
          id="sort-order"
          select
          label="Sort order"
          value={sortOrder}
          onChange={handleSortChange}
          SelectProps={{
            native: true,
            name: 'sortOrder',
          }}
          margin="normal"
          variant="outlined"
        >
          {getSortOrderOptions(sortField)}
        </TextField>
      </Grid>
    </Grid>
  );
};

SortingOptions.propTypes = {
  sortField: PropTypes.string.isRequired,
  sortOrder: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired,
};

export default React.memo(SortingOptions);
