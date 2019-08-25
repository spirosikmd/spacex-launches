import React from 'react';
import { render } from '../../setupTests';
import NotFoundPage from '../NotFoundPage';

describe('NotFoundPage', () => {
  it('renders', () => {
    const { asFragment } = render(<NotFoundPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
