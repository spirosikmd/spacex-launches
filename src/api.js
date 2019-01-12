import { FLIGHT_NUMBER_FIELD, UTC_DATE_FIELD } from './constants';

const BASE = 'https://api.spacexdata.com/v3';
const LAUNCHES_BASE = `${BASE}/launches`;
const FILTER =
  'flight_number,launch_date_utc,launch_success,upcoming,is_tentative,details,mission_name,mission_id';

function sanitizeLaunchResponse(launch) {
  return {
    flightNumber: launch.flight_number,
    utcDate: new Date(launch.launch_date_utc),
    isSuccessful: launch.launch_success === true && launch.upcoming === false,
    isFailed: launch.launch_success === false && launch.upcoming === false,
    isUpcoming: launch.launch_success === null && launch.upcoming === true,
    isInProgress: launch.launch_success === null && launch.upcoming === false,
    isTentative: launch.is_tentative === true,
    details: launch.details,
    missionName: launch.mission_name,
    missionIds: launch.mission_id || [],
  };
}

function sanitizeLaunchesResponse(launches) {
  return launches.map(sanitizeLaunchResponse);
}

function getHeaders() {
  return {
    'Content-Type': 'application/json',
  };
}

function mapSortField(sortField) {
  switch (sortField) {
    case FLIGHT_NUMBER_FIELD:
      return 'flight_number';
    case UTC_DATE_FIELD:
      return 'launch_date_utc';
    default:
      break;
  }
}

export async function getLaunches({ sortOrder, sortField }) {
  const response = await fetch(
    `${LAUNCHES_BASE}?filter=${FILTER}&sort=${mapSortField(
      sortField
    )}&order=${sortOrder}`,
    {
      headers: getHeaders(),
    }
  );
  const launches = await response.json();
  return sanitizeLaunchesResponse(launches);
}

export async function getLaunch({ flightNumber }) {
  const response = await fetch(`${LAUNCHES_BASE}/${flightNumber}`, {
    headers: getHeaders(),
  });
  const launch = await response.json();
  return sanitizeLaunchResponse(launch);
}
