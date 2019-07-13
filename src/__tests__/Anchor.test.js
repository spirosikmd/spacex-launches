import React from 'react';
import { render } from '../setupTests';
import Anchor from '../Anchor';

describe('Anchor', () => {
  let props;

  beforeEach(() => {
    props = {
      href: 'href',
      target: 'target',
    };
  });

  it('renders an anchor tag', () => {
    const { asFragment } = render(<Anchor {...props}>text</Anchor>);
    expect(asFragment()).toMatchSnapshot();
  });
});
