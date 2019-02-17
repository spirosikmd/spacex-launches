import { FLIGHT_NUMBER_FIELD, UTC_DATE_FIELD } from './constants';

const BASE = 'https://api.spacexdata.com/v3';
export const LAUNCHES_BASE = `${BASE}/launches`;
export const FILTER =
  'flight_number,launch_date_utc,launch_success,upcoming,is_tentative,details,mission_name,mission_id';

export interface LaunchData {
  flightNumber: number;
  missionName: string;
  utcDate: Date;
  isSuccessful: boolean;
  isFailed: boolean;
  isUpcoming: boolean;
  isInProgress: boolean;
  isTentative: boolean;
  details: string;
  missionIds: string[];
  missionPatch: string;
}

export interface LaunchResponseData {
  flight_number: number;
  mission_name: string;
  launch_date_utc: string;
  launch_success: boolean;
  upcoming: boolean;
  is_tentative: boolean;
  details: string;
  mission_id: string[];
  links: {
    mission_patch: string;
  };
}

function sanitizeLaunchResponse(launch: LaunchResponseData) {
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
    missionPatch: (launch.links && launch.links.mission_patch) || '',
  };
}

function sanitizeLaunchesResponse(launches: LaunchResponseData[]) {
  return launches.map(sanitizeLaunchResponse);
}

function getHeaders() {
  return {
    'Content-Type': 'application/json',
  };
}

export function mapSortField(sortField: string) {
  switch (sortField) {
    case FLIGHT_NUMBER_FIELD:
      return 'flight_number';
    case UTC_DATE_FIELD:
    default:
      return 'launch_date_utc';
  }
}

async function handleResponse(response: Response) {
  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error);
  }

  return response.json();
}

export async function getLaunches({
  sortOrder,
  sortField,
}: {
  sortOrder: string;
  sortField: string;
}) {
  const response = await fetch(
    `${LAUNCHES_BASE}?filter=${FILTER}&sort=${mapSortField(
      sortField
    )}&order=${sortOrder}`,
    {
      headers: getHeaders(),
    }
  );

  const launches = await handleResponse(response);

  return sanitizeLaunchesResponse(launches);
}

export async function getLaunch({ flightNumber }: { flightNumber: number }) {
  const response = await fetch(`${LAUNCHES_BASE}/${flightNumber}`, {
    headers: getHeaders(),
  });

  const launch = await handleResponse(response);

  return sanitizeLaunchResponse(launch);
}
