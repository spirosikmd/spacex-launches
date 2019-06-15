import LaunchPage from '../LaunchPage';
import { getLaunch } from '../../api';
import { createLaunch } from '../../__fixtures__/launch';
import { act } from '@testing-library/react';

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
        statusMissionIds: 'statusMissionIds',
        missionIds: 'missionIds',
      },
      flightNumber: '1',
    };
    const launch = createLaunch();
    getLaunch.mockReturnValue(Promise.resolve(launch));
  });

  it('renders', async () => {
    let launchPage;
    await act(async () => {
      launchPage = await mountComponent(LaunchPage, props);
    });
    await act(async () => {
      await Promise.resolve();
      launchPage.update();
    });
    expect(launchPage).toMatchSnapshot();
  });

  it('does not render mission patch when there is no mission patch', async () => {
    getLaunch.mockReturnValue(
      Promise.resolve(createLaunch({ missionPatch: '' }))
    );
    let launchPage;
    await act(async () => {
      launchPage = await mountComponent(LaunchPage, props);
    });
    await act(async () => {
      await Promise.resolve();
      launchPage.update();
    });
    expect(launchPage).toMatchSnapshot();
  });

  it('renders a loader when is loading a launch', async () => {
    let launchPage;
    await act(async () => {
      launchPage = await mountComponent(LaunchPage, props);
    });
    expect(launchPage).toMatchSnapshot();
  });

  it('renders error message when there is an error', async () => {
    getLaunch.mockReturnValue(Promise.reject({ message: 'Not Found' }));
    let launchPage;
    await act(async () => {
      launchPage = await mountComponent(LaunchPage, props);
    });
    await act(async () => {
      await Promise.resolve();
      launchPage.update();
    });
    expect(launchPage).toMatchSnapshot();
  });

  it('renders redirect to home page when launch is tentative', async () => {
    getLaunch.mockReturnValue(
      Promise.resolve(createLaunch({ isSuccessful: false, isTentative: true }))
    );
    let launchPage;
    await act(async () => {
      launchPage = await mountComponent(LaunchPage, props);
    });
    await act(async () => {
      await Promise.resolve();
      launchPage.update();
    });
    expect(launchPage).toMatchSnapshot();
  });

  it('does not render mission ids when launch does not have mission ids', async () => {
    getLaunch.mockReturnValue(
      Promise.resolve(createLaunch({ missionIds: [] }))
    );
    let launchPage;
    await act(async () => {
      launchPage = await mountComponent(LaunchPage, props);
    });
    await act(async () => {
      await Promise.resolve();
      launchPage.update();
    });
    expect(launchPage).toMatchSnapshot();
  });
});
