import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { ASC, DESC } from './constants';

export const SortingOptions = ({ dateSortOrder, onSortChange }) => {
  return (
    <FormControl component="fieldset">
      <FormGroup>
        <InputLabel htmlFor="date-sort-order">Sort date</InputLabel>
        <Select
          native
          value={dateSortOrder}
          onChange={onSortChange}
          inputProps={{
            name: 'dateSortOrder',
            id: 'date-sort-order',
          }}
        >
          <option value={ASC}>old to new (upcoming)</option>
          <option value={DESC}>new (upcoming) to old</option>
        </Select>
      </FormGroup>
    </FormControl>
  );
};

SortingOptions.propTypes = {
  dateSortOrder: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired,
};

export default React.memo(SortingOptions);
