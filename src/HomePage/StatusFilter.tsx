import React, { SyntheticEvent } from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Switch from '@material-ui/core/Switch';

interface StatusFilterProps {
  showFailed: boolean;
  showSuccessful: boolean;
  showUpcoming: boolean;
  onChange: (value: string, checked: boolean) => void;
}

const StatusFilter = ({
  showFailed,
  showSuccessful,
  showUpcoming,
  onChange,
}: StatusFilterProps) => {
  const handleChange = (event: SyntheticEvent) => {
    const target = event.currentTarget as HTMLInputElement;
    onChange(target.value, target.checked);
  };

  return (
    <FormControl component={'fieldset' as 'div'}>
      <FormLabel component={'legend' as 'label'}>Show launches</FormLabel>
      <FormGroup row>
        <FormControlLabel
          control={
            <Switch
              checked={showFailed}
              onChange={handleChange}
              value="showFailed"
            />
          }
          label="Failed"
        />
        <FormControlLabel
          control={
            <Switch
              checked={showSuccessful}
              onChange={handleChange}
              value="showSuccessful"
            />
          }
          label="Successful"
        />
        <FormControlLabel
          control={
            <Switch
              checked={showUpcoming}
              onChange={handleChange}
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
