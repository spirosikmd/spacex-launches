import React from 'react';
import { render } from '../setupTests';
import Footer from '../Footer';

describe('Footer', () => {
  it('render a footer', () => {
    const { asFragment } = render(<Footer />);
    expect(asFragment()).toMatchSnapshot();
  });
});
