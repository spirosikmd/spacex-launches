import {
  getLaunch,
  getLaunches,
  mapSortField,
  LAUNCHES_BASE,
  FILTER,
} from '../api';
import { ASC, FLIGHT_NUMBER_FIELD, UTC_DATE_FIELD } from '../constants';
import { createLaunchResponse } from '../__fixtures__/launch';

describe('getLaunch', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('returns successful launch data', async () => {
    fetch.mockResponseOnce(JSON.stringify(createLaunchResponse()));

    const launch = await getLaunch({ flightNumber: '1' });

    expect(launch).toMatchSnapshot();
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch).toBeCalledWith(`${LAUNCHES_BASE}/1`, {
      headers: { 'Content-Type': 'application/json' },
    });
  });

  it('returns failed launch data', async () => {
    fetch.mockResponseOnce(
      JSON.stringify(createLaunchResponse({ launch_success: false }))
    );

    const launch = await getLaunch({ flightNumber: '1' });

    expect(launch.isFailed).toBe(true);
  });

  it('returns upcoming launch data', async () => {
    fetch.mockResponseOnce(
      JSON.stringify(
        createLaunchResponse({ launch_success: null, upcoming: true })
      )
    );

    const launch = await getLaunch({ flightNumber: '1' });

    expect(launch.isUpcoming).toBe(true);
  });

  it('returns in progress launch data', async () => {
    fetch.mockResponseOnce(
      JSON.stringify(
        createLaunchResponse({ launch_success: null, upcoming: false })
      )
    );

    const launch = await getLaunch({ flightNumber: '1' });

    expect(launch.isInProgress).toBe(true);
  });

  it('returns launch data with empty mission ids', async () => {
    fetch.mockResponseOnce(
      JSON.stringify(createLaunchResponse({ mission_id: null }))
    );

    const launch = await getLaunch({ flightNumber: '1' });

    expect(launch.missionIds.length).toBe(0);
  });

  it('returns launch data without mission patch', async () => {
    fetch.mockResponseOnce(
      JSON.stringify(createLaunchResponse({ links: { mission_patch: null } }))
    );

    const launch = await getLaunch({ flightNumber: '1' });

    expect(launch.missionPatch).toBe('');
  });

  it('throws error', async () => {
    fetch.mockResponseOnce(JSON.stringify({ error: 'Not Found' }), {
      status: 404,
    });

    try {
      await getLaunch({ flightNumber: '1' });
    } catch (error) {
      expect(error.message).toBe('Not Found');
    }
  });
});

describe('getLaunches', () => {
  beforeEach(() => {
    fetch.resetMocks();

    fetch.mockResponseOnce(
      JSON.stringify([
        createLaunchResponse(),
        createLaunchResponse({ flight_number: 2 }),
      ])
    );
  });

  it('returns sanitized launches data', async () => {
    const response = await getLaunches({
      sortOrder: ASC,
      sortField: FLIGHT_NUMBER_FIELD,
    });

    expect(response).toMatchSnapshot();

    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch).toBeCalledWith(
      `${LAUNCHES_BASE}?filter=${FILTER}&sort=flight_number&order=asc`,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  });

  it('throws error', async () => {
    fetch.mockResponseOnce(JSON.stringify({ error: 'Not Found' }), {
      status: 404,
    });

    try {
      await getLaunches({
        sortOrder: ASC,
        sortField: FLIGHT_NUMBER_FIELD,
      });
    } catch (error) {
      expect(error.message).toBe('Not Found');
    }
  });
});

describe('mapSortField', () => {
  it('returns "flight_number" for flightNumber', () => {
    expect(mapSortField(FLIGHT_NUMBER_FIELD)).toBe('flight_number');
  });

  it('returns "launch_date_utc" for utcDate', () => {
    expect(mapSortField(UTC_DATE_FIELD)).toBe('launch_date_utc');
  });
});
