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
        root: 'root',
        rootReverse: 'rootReverse',
        launch: 'launch',
        missionName: 'missionName',
        divider: 'divider',
      },
      launch: createLaunch(),
      reverse: false,
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

  describe('when reverse', () => {
    it('renders it reverse', () => {
      props.reverse = true;
      expect(shallow(Launch, props)).toMatchSnapshot();
    });
  });
});
