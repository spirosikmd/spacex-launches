import React from 'react';
import { render } from '../setupTests';
import TopBar from '../TopBar';

describe('TopBar', () => {
  it('renders', () => {
    const { asFragment } = render(<TopBar />);
    expect(asFragment()).toMatchSnapshot();
  });
});
