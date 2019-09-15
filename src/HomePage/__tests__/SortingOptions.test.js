import React from 'react';
import { render, fireEvent } from '../../setupTests';
import TextField from '@material-ui/core/TextField';
import SortingOptions from '../SortingOptions';
import { DESC, FLIGHT_NUMBER_FIELD, UTC_DATE_FIELD } from '../../constants';

describe('SortingOptions', () => {
  let props;

  beforeEach(() => {
    props = {
      sortOrder: DESC,
      sortField: FLIGHT_NUMBER_FIELD,
      onSortChange: jest.fn(),
    };
  });

  describe('when sorting field is flight number', () => {
    it('renders sorting options with flight number specific text', () => {
      const { asFragment } = render(<SortingOptions {...props} />);
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('when sorting field is utc date', () => {
    it('renders sorting options with date specific text', () => {
      props.sortField = UTC_DATE_FIELD;
      const { asFragment } = render(<SortingOptions {...props} />);
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('when sorting field is unknown', () => {
    it('renders default sorting options', () => {
      props.sortField = 'unknown';
      const { asFragment } = render(<SortingOptions {...props} />);
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('when sort field changes', () => {
    it('calls the onSortChange prop', () => {
      const { getByLabelText } = render(<SortingOptions {...props} />);
      fireEvent.change(getByLabelText('Sort field'));
      expect(props.onSortChange).toBeCalledWith('sortField', 'flightNumber');
    });
  });

  describe('when sort order changes', () => {
    it('calls the onSortChange prop', () => {
      const { getByLabelText } = render(<SortingOptions {...props} />);
      fireEvent.change(getByLabelText('Sort order'));
      expect(props.onSortChange).toBeCalledWith('sortOrder', 'desc');
    });
  });
});
