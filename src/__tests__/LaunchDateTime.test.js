import React from 'react';
import { render } from '../setupTests';
import LaunchDateTime from '../LaunchDateTime';

describe('LaunchDateTime', () => {
  let props;

  beforeEach(() => {
    props = {
      utcDate: new Date('2019-01-01'),
      isTentative: false,
    };
  });

  it('renders both date and time when launch is not tentative', () => {
    const { asFragment } = render(<LaunchDateTime {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders only date when launch is tentative', () => {
    props.isTentative = true;
    const { asFragment } = render(<LaunchDateTime {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
