import LaunchMissionIds from '../LaunchMissionIds';

describe('LaunchMissionIds', () => {
  let props;

  beforeEach(() => {
    props = {
      missionIds: ['id1'],
    };
  });

  it('renders', () => {
    expect(shallow(LaunchMissionIds, props)).toMatchSnapshot();
  });

  it('render IDs with multiple ids', () => {
    props.missionIds = ['id1', 'id2'];
    expect(shallow(LaunchMissionIds, props)).toMatchSnapshot();
  });
});
