import { Launch } from '../Launch';
import { createLaunch } from '../__fixtures__/launch';

describe('Launch', () => {
  let props;

  beforeEach(() => {
    props = {
      classes: {
        status: 'status',
        statusIcon: 'statusIcon',
        upcoming: 'upcoming',
        success: 'success',
        fail: 'fail',
        launch: 'launch',
        launchInfo: 'launchInfo',
        connector: 'connector',
      },
      launch: createLaunch(),
    };
  });

  describe('when a launch is successful', () => {
    it('renders it successful', () => {
      expect(shallow(Launch, props)).toMatchSnapshot();
    });
  });

  describe('when a launch is failed', () => {
    it('renders it failed', () => {
      props.launch.isFailed = true;
      props.launch.isSuccessful = false;
      expect(shallow(Launch, props)).toMatchSnapshot();
    });
  });

  describe('when a launch is upcoming', () => {
    it('renders it upcoming', () => {
      props.launch.isUpcoming = true;
      props.launch.isSuccessful = false;
      expect(shallow(Launch, props)).toMatchSnapshot();
    });
  });

  describe('when launch does not have details', () => {
    it('does not render the details section', () => {
      props.launch = createLaunch({ details: null });
      expect(shallow(Launch, props)).toMatchSnapshot();
    });
  });

  describe('when launch does not have mission ids', () => {
    it('does not render the mission ids info', () => {
      props.launch = createLaunch({ missionIds: [] });
      expect(shallow(Launch, props)).toMatchSnapshot();
    });
  });
});
