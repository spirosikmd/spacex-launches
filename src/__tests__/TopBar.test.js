import { TopBar } from '../TopBar';

describe('TopBar', () => {
  it('renders app bar and title', () => {
    expect(shallow(TopBar, {})).toMatchSnapshot();
  });
});
