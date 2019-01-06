function sanitizeLaunchesResponse(launches) {
  return launches.map(launch => ({
    flightNumber: launch.flight_number,
    utcDate: new Date(launch.launch_date_utc),
    isSuccessful: launch.launch_success === true && launch.upcoming === false,
    isFailed: launch.launch_success === false && launch.upcoming === false,
    isUpcoming: launch.upcoming === true,
    isTentative: launch.is_tentative === true,
    details: launch.details,
    missionName: launch.mission_name,
    missionIds: launch.mission_id || [],
  }));
}

export async function getLaunches({ sortOrder, sortField, filter }) {
  const response = await fetch(
    `https://api.spacexdata.com/v3/launches?filter=${filter}&sort=${sortField}&order=${sortOrder}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const launches = await response.json();
  return sanitizeLaunchesResponse(launches);
}
