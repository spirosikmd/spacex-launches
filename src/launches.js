export function getNumberOfSuccess(launches) {
  return launches.filter(launch => launch.isSuccessful).length;
}

export function getNumberOfFail(launches) {
  return launches.length - getNumberOfSuccess(launches);
}
