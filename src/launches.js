export function getNumberOfSuccessful(launches) {
  return launches.filter(launch => launch.isSuccessful).length;
}

export function getNumberOfUpcoming(launches) {
  return launches.filter(launch => launch.isUpcoming).length;
}

export function getNumberOfFailed(launches) {
  return launches.filter(launch => launch.isFailed).length;
}

export function processLaunches(
  launches,
  { showUpcoming, showSuccessful, showFailed },
  { dateSortOrder }
) {
  let processedLaunches = [...launches];

  if (!showUpcoming) {
    processedLaunches = processedLaunches.filter(launch => !launch.isUpcoming);
  }

  if (!showSuccessful) {
    processedLaunches = processedLaunches.filter(
      launch => !launch.isSuccessful
    );
  }

  if (!showFailed) {
    processedLaunches = processedLaunches.filter(launch => !launch.isFailed);
  }

  if (dateSortOrder) {
    processedLaunches = processedLaunches.sort((launchA, launchB) =>
      dateSortOrder === 'asc'
        ? launchA.utcDate - launchB.utcDate
        : launchB.utcDate - launchA.utcDate
    );
  }

  return processedLaunches;
}
