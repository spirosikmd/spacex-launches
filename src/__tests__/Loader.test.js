import React from 'react';
import { render } from '../setupTests';
import Loader from '../Loader';

describe('Loader', () => {
  it('renders a loader', () => {
    const { asFragment } = render(<Loader />);
    expect(asFragment()).toMatchSnapshot();
  });
});
