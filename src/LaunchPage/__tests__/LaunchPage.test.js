import LaunchPage from '../LaunchPage';
import { getLaunch } from '../../api';
import { createLaunch } from '../../__fixtures__/launch';

jest.mock('../../api', () => ({
  getLaunch: jest.fn(),
}));

describe('LaunchPage', () => {
  let props;

  beforeEach(() => {
    props = {
      classes: {
        headline: 'headline',
        missionPatch: 'missionPatch',
        missionName: 'missionName',
        details: 'details',
        date: 'date',
        status: 'status',
      },
      flightNumber: '1',
    };
    const launch = createLaunch();
    getLaunch.mockReturnValue(Promise.resolve(launch));
  });

  it('renders', async () => {
    const launchPage = shallow(LaunchPage, props);
    await Promise.resolve();
    launchPage.update();
    expect(launchPage).toMatchSnapshot();
  });

  it('does not render mission patch when there is no mission patch', async () => {
    getLaunch.mockReturnValue(
      Promise.resolve(createLaunch({ missionPatch: '' }))
    );
    const launchPage = shallow(LaunchPage, props);
    await Promise.resolve();
    launchPage.update();
    expect(launchPage).toMatchSnapshot();
  });

  it('renders a loader when is loading a launch', () => {
    expect(shallow(LaunchPage, props)).toMatchSnapshot();
  });

  it('renders error message when there is an error', async () => {
    getLaunch.mockReturnValue(Promise.reject({ message: 'Not Found' }));
    const launchPage = shallow(LaunchPage, props);
    await Promise.resolve();
    launchPage.update();
    expect(launchPage).toMatchSnapshot();
  });
});
