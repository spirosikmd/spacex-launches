export function createLaunchResponse(data) {
  return {
    flight_number: 1,
    mission_name: 'Test',
    launch_date_utc: '2019-01-01T18:16:00.000Z',
    launch_success: true,
    upcoming: false,
    is_tentative: false,
    details: 'Details',
    mission_id: ['id1'],
    links: {
      mission_patch: 'missionPatch',
    },
    ...data,
  };
}

export function createLaunch(data) {
  return {
    flightNumber: 1,
    missionName: 'Test',
    utcDate: new Date('2019-01-01'),
    isSuccessful: true,
    isFailed: false,
    isUpcoming: false,
    isInProgress: false,
    isTentative: false,
    details: 'Details',
    missionIds: ['id1'],
    missionPatch: 'missionPatch',
    ...data,
  };
}
