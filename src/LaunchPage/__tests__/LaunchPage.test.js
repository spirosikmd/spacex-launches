import React from 'react';
import LaunchPage from '../LaunchPage';
import { render, wait } from '../../setupTests';
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
        statusMissionIds: 'statusMissionIds',
        missionIds: 'missionIds',
      },
      flightNumber: '1',
    };
    const launch = createLaunch();
    getLaunch.mockReturnValue(Promise.resolve(launch));
  });

  it('renders', async () => {
    const { asFragment } = render(<LaunchPage {...props} />);
    await wait(() => expect(asFragment()).toMatchSnapshot());
  });

  it('does not render mission patch when there is no mission patch', async () => {
    getLaunch.mockReturnValue(
      Promise.resolve(createLaunch({ missionPatch: '' }))
    );
    const { asFragment } = render(<LaunchPage {...props} />);
    await wait(() => expect(asFragment()).toMatchSnapshot());
  });

  it('renders a loader when is loading a launch', async () => {
    props.flightNumber = null;
    const { asFragment } = render(<LaunchPage {...props} />);
    await wait(() => expect(asFragment()).toMatchSnapshot());
  });

  it('renders error message when there is an error', async () => {
    getLaunch.mockReturnValue(Promise.reject({ message: 'Not Found' }));
    const { asFragment } = render(<LaunchPage {...props} />);
    await wait(() => expect(asFragment()).toMatchSnapshot());
  });

  it('renders redirect to home page when launch is tentative', async () => {
    getLaunch.mockReturnValue(
      Promise.resolve(createLaunch({ isSuccessful: false, isTentative: true }))
    );
    const { asFragment } = render(<LaunchPage {...props} />);
    await wait(() => expect(asFragment()).toMatchSnapshot());
  });

  it('does not render mission ids when launch does not have mission ids', async () => {
    getLaunch.mockReturnValue(
      Promise.resolve(createLaunch({ missionIds: [] }))
    );
    const { asFragment } = render(<LaunchPage {...props} />);
    await wait(() => expect(asFragment()).toMatchSnapshot());
  });
});
