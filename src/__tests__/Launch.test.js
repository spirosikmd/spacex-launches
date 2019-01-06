import { Launch } from '../Launch';
import { createLaunch } from '../__fixtures__/launch';

describe('Launch', () => {
  let props;

  beforeEach(() => {
    props = {
      classes: {
        status: 'status',
        statusIcon: 'statusIcon',
        statusReverse: 'statusReverse',
        success: 'success',
        fail: 'fail',
        upcoming: 'upcoming',
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
});
