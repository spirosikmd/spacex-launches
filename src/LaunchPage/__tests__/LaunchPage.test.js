import { LaunchPage } from '../LaunchPage';
import { getLaunch } from '../../api';
import { createLaunch } from '../../__fixtures__/launch';

jest.mock('../../api', () => ({
  getLaunch: jest.fn(),
}));

describe('LaunchPage', () => {
  let props;

  beforeEach(() => {
    props = {
      flightNumber: '1',
    };
    const launch = createLaunch();
    getLaunch.mockReturnValue(Promise.resolve(launch));
  });

  it('renders', async () => {
    expect(await shallow(LaunchPage, props)).toMatchSnapshot();
  });

  describe('when is loading launch', () => {
    it('renders a loader', () => {
      expect(shallow(LaunchPage, props)).toMatchSnapshot();
    });
  });
});
