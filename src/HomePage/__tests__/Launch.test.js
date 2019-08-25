import React from 'react';
import { render } from '../../setupTests';
import Launch from '../Launch';
import { createLaunch } from '../../__fixtures__/launch';

describe('Launch', () => {
  let props;

  beforeEach(() => {
    props = {
      classes: {
        launch: 'launch',
        launchInfo: 'launchInfo',
        connector: 'connector',
      },
      launch: createLaunch(),
    };
  });

  describe('when a launch is successful', () => {
    it('renders successful', () => {
      const { asFragment } = render(<Launch {...props} />);
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('when a launch is failed', () => {
    it('renders failed', () => {
      props.launch.isFailed = true;
      props.launch.isSuccessful = false;
      const { asFragment } = render(<Launch {...props} />);
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('when a launch is upcoming', () => {
    it('renders upcoming', () => {
      props.launch.isUpcoming = true;
      props.launch.isSuccessful = false;
      const { asFragment } = render(<Launch {...props} />);
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('when launch is in progress', () => {
    it('renders in progress', () => {
      props.launch.isInProgress = true;
      props.launch.isSuccessful = false;
      const { asFragment } = render(<Launch {...props} />);
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('when launch does not have details', () => {
    it('does not render the details section', () => {
      props.launch = createLaunch({ details: null });
      const { asFragment } = render(<Launch {...props} />);
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('when launch does not have mission ids', () => {
    it('does not render the mission ids info', () => {
      props.launch = createLaunch({ missionIds: [] });
      const { asFragment } = render(<Launch {...props} />);
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('when launch is tentative', () => {
    it('renders without actions', () => {
      props.launch = createLaunch({ isTentative: true });
      const { asFragment } = render(<Launch {...props} />);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
