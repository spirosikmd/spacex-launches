import React from 'react';
import { render } from '../../setupTests';
import LaunchList from '../LaunchList';
import { createLaunch } from '../../__fixtures__/launch';

describe('LaunchList', () => {
  let props;

  beforeEach(() => {
    props = {
      launches: [],
      classes: {
        launchList: 'launchList',
        timeline: 'timeline',
        launchItem: 'launchItem',
      },
    };
  });

  describe('when there are no launches', () => {
    it('renders a message', () => {
      const { asFragment } = render(<LaunchList {...props} />);
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('when there are launches', () => {
    beforeEach(() => {
      props.launches = [createLaunch(), createLaunch({ flightNumber: 2 })];
    });

    it('renders a list of launches', () => {
      const { asFragment } = render(<LaunchList {...props} />);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
