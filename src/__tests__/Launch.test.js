import { Launch } from '../Launch';
import { createLaunch } from '../__fixtures__/launch';

describe('Launch', () => {
  let props;

  beforeEach(() => {
    props = {
      classes: {
        status: 'status',
        wrapper: 'wrapper',
        success: 'success',
        fail: 'fail',
        upcoming: 'upcoming',
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

  describe('when a launch does not have details', () => {
    it('renders it without details', () => {
      props.launch.details = null;
      expect(shallow(Launch, props)).toMatchSnapshot();
    });
  });

  describe('when a launch is tentative', () => {
    it('renders the tentative info', () => {
      props.launch.isTentative = true;
      expect(shallow(Launch, props)).toMatchSnapshot();
    });
  });
});
