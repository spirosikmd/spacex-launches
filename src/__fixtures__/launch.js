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
    ...data,
  };
}
