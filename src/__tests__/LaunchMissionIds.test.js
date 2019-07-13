import React from 'react';
import { render } from '../setupTests';
import LaunchMissionIds from '../LaunchMissionIds';

describe('LaunchMissionIds', () => {
  let props;

  beforeEach(() => {
    props = {
      missionIds: ['id1'],
    };
  });

  it('renders', () => {
    const { asFragment } = render(<LaunchMissionIds {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('render IDs with multiple ids', () => {
    props.missionIds = ['id1', 'id2'];
    const { asFragment } = render(<LaunchMissionIds {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
