import LaunchDateTime from '../LaunchDateTime';

describe('LaunchDateTime', () => {
  let props;

  beforeEach(() => {
    props = {
      utcDate: new Date('2019-01-01'),
      isTentative: false,
    };
  });

  it('renders both date and time when launch is not tentative', () => {
    expect(shallow(LaunchDateTime, props)).toMatchSnapshot();
  });

  it('renders only date when launch is tentative', () => {
    props.isTentative = true;
    expect(shallow(LaunchDateTime, props)).toMatchSnapshot();
  });
});
