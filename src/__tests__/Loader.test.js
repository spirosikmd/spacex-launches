import { Loader } from '../Loader';

describe('Loader', () => {
  let props;

  beforeEach(() => {
    props = {
      classes: {
        root: 'root',
      },
    };
  });

  it('renders a loader', () => {
    expect(shallow(Loader, props)).toMatchSnapshot();
  });
});