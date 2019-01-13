import Launch from '../Launch';
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
        inProgress: 'inProgress',
        launch: 'launch',
        launchInfo: 'launchInfo',
        connector: 'connector',
      },
      launch: createLaunch(),
    };
  });

  describe('when a launch is successful', () => {
    it('renders successful', () => {
      expect(shallow(Launch, props)).toMatchSnapshot();
    });
  });

  describe('when a launch is failed', () => {
    it('renders failed', () => {
      props.launch.isFailed = true;
      props.launch.isSuccessful = false;
      expect(shallow(Launch, props)).toMatchSnapshot();
    });
  });

  describe('when a launch is upcoming', () => {
    it('renders upcoming', () => {
      props.launch.isUpcoming = true;
      props.launch.isSuccessful = false;
      expect(shallow(Launch, props)).toMatchSnapshot();
    });
  });

  describe('when launch is in progress', () => {
    it('renders in progress', () => {
      props.launch.isInProgress = true;
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

  describe('when launch is tentative', () => {
    it('renders without actions', () => {
      props.launch = createLaunch({ isTentative: true });
      expect(shallow(Launch, props)).toMatchSnapshot();
    });
  });
});
