import TopBar from '../TopBar';

describe('TopBar', () => {
  let props;

  beforeEach(() => {
    props = {
      classes: {
        logo: 'logo',
      },
    };
  });

  it('renders', () => {
    expect(mountComponent(TopBar, props)).toMatchSnapshot();
  });
});
