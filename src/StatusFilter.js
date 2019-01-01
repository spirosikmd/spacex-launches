import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Switch from '@material-ui/core/Switch';

export const StatusFilter = ({
  showFailed,
  showSuccessful,
  showUpcoming,
  onChange,
}) => {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Show launches</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={showFailed}
              onChange={onChange}
              value="showFailed"
            />
          }
          label="Failed"
        />
        <FormControlLabel
          control={
            <Switch
              checked={showSuccessful}
              onChange={onChange}
              value="showSuccessful"
            />
          }
          label="Successful"
        />
        <FormControlLabel
          control={
            <Switch
              checked={showUpcoming}
              onChange={onChange}
              value="showUpcoming"
            />
          }
          label="Upcoming"
        />
      </FormGroup>
    </FormControl>
  );
};

StatusFilter.propTypes = {
  showFailed: PropTypes.bool.isRequired,
  showSuccessful: PropTypes.bool.isRequired,
  showUpcoming: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default React.memo(StatusFilter);
