import LaunchStatus from '../LaunchStatus';

describe('LaunchStatus', () => {
  let props;

  beforeEach(() => {
    props = {
      classes: {
        status: 'status',
        statusIcon: 'statusIcon',
        upcoming: 'upcoming',
        success: 'success',
        fail: 'fail',
        inProgress: 'inProgress',
      },
      isSuccessful: true,
      isFailed: false,
      isUpcoming: false,
      isInProgress: false,
    };
  });

  it('renders successful', () => {
    expect(mountComponent(LaunchStatus, props)).toMatchSnapshot();
  });

  it('renders failed', () => {
    props.isFailed = true;
    props.isSuccessful = false;
    expect(mountComponent(LaunchStatus, props)).toMatchSnapshot();
  });

  it('renders upcoming', () => {
    props.isUpcoming = true;
    props.isSuccessful = false;
    expect(mountComponent(LaunchStatus, props)).toMatchSnapshot();
  });

  it('renders in progress', () => {
    props.isInProgress = true;
    props.isSuccessful = false;
    expect(mountComponent(LaunchStatus, props)).toMatchSnapshot();
  });
});
