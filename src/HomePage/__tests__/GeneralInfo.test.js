import React from 'react';
import { render } from '../../setupTests';
import GeneralInfo from '../GeneralInfo';
import { createLaunch } from '../../__fixtures__/launch';

describe('GeneralInfo', () => {
  let props;

  beforeEach(() => {
    props = {
      launches: [
        createLaunch(),
        createLaunch({ isSuccessful: false, isFailed: true }),
        createLaunch({ isSuccessful: false, isUpcoming: true }),
      ],
    };
  });

  it('renders general info about launches', () => {
    const { asFragment } = render(<GeneralInfo {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
