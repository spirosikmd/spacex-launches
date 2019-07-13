import React from 'react';
import { render } from '../setupTests';
import Image from '../Image';

describe('Image', () => {
  let props;

  beforeEach(() => {
    props = {
      src: 'src',
      alt: 'alt',
    };
  });

  it('renders an image', () => {
    const { asFragment } = render(<Image {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
