function sanitizeLaunchesResponse(launches) {
  return launches.map(launch => ({
    flightNumber: launch.flight_number,
    utcDate: new Date(launch.launch_date_utc),
    isSuccessful: launch.launch_success && !launch.upcoming,
    isFailed: !launch.launch_success && !launch.upcoming,
    isUpcoming: launch.upcoming,
    details: launch.details,
    missionName: launch.mission_name,
  }));
}

export async function getLaunches() {
  const response = await fetch('https://api.spacexdata.com/v3/launches', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const launches = await response.json();
  return sanitizeLaunchesResponse(launches);
}
