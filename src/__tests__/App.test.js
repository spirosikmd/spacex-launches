import React from 'react';
import { render } from '../setupTests';
import App from '../App';

describe('App', () => {
  it('renders', () => {
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });
});
