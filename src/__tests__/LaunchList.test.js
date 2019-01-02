import { LaunchList } from '../LaunchList';
import { createLaunch } from '../__fixtures__/launch';

describe('LaunchList', () => {
  let props;

  beforeEach(() => {
    props = {
      launches: [],
    };
  });

  describe('when there are no launches', () => {
    it('renders a message', () => {
      expect(shallow(LaunchList, props)).toMatchSnapshot();
    });
  });

  describe('when there are launches', () => {
    beforeEach(() => {
      props.launches = [createLaunch(), createLaunch({ flightNumber: 2 })];
    });

    it('renders a list of launches', () => {
      expect(shallow(LaunchList, props)).toMatchSnapshot();
    });
  });
});
