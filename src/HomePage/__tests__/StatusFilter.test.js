import React from 'react';
import { render, fireEvent } from '../../setupTests';
import StatusFilter from '../StatusFilter';

describe('StatusFilter', () => {
  let props;

  beforeEach(() => {
    props = {
      showFailed: true,
      showSuccessful: true,
      showUpcoming: true,
      onChange: jest.fn(),
    };
  });

  it('renders status filters', () => {
    const { asFragment } = render(<StatusFilter {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });

  describe('when failed status changes', () => {
    it('calls the onChange prop', () => {
      const { getByLabelText } = render(<StatusFilter {...props} />);
      fireEvent.click(getByLabelText('Failed'));
      expect(props.onChange).toBeCalledWith('showFailed', false);
    });
  });

  describe('when successful status changes', () => {
    it('calls the onChange prop', () => {
      const { getByLabelText } = render(<StatusFilter {...props} />);
      fireEvent.click(getByLabelText('Successful'));
      expect(props.onChange).toBeCalledWith('showSuccessful', false);
    });
  });

  describe('when upcoming status changes', () => {
    it('calls the onChange prop', () => {
      const { getByLabelText } = render(<StatusFilter {...props} />);
      fireEvent.click(getByLabelText('Upcoming'));
      expect(props.onChange).toBeCalledWith('showUpcoming', false);
    });
  });
});
