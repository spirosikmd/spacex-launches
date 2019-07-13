import React from 'react';
import LaunchStatus from '../LaunchStatus';
import { render } from '../setupTests';

describe('LaunchStatus', () => {
  let props;

  beforeEach(() => {
    props = {
      isSuccessful: true,
      isFailed: false,
      isUpcoming: false,
      isInProgress: false,
    };
  });

  it('renders successful', () => {
    const { asFragment } = render(<LaunchStatus {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders failed', () => {
    props.isFailed = true;
    props.isSuccessful = false;
    const { asFragment } = render(<LaunchStatus {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders upcoming', () => {
    props.isUpcoming = true;
    props.isSuccessful = false;
    const { asFragment } = render(<LaunchStatus {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders in progress', () => {
    props.isInProgress = true;
    props.isSuccessful = false;
    const { asFragment } = render(<LaunchStatus {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
