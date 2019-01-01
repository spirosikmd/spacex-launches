export function getNumberOfSuccessful(launches) {
  return launches.filter(launch => launch.isSuccessful && !launch.isUpcoming)
    .length;
}

export function getNumberOfUpcoming(launches) {
  return launches.filter(launch => launch.isUpcoming).length;
}

export function getNumberOfFailed(launches) {
  return (
    launches.length -
    getNumberOfSuccessful(launches) -
    getNumberOfUpcoming(launches)
  );
}
