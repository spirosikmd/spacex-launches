import Footer from '../Footer';

describe('Footer', () => {
  let props;

  beforeEach(() => {
    props = {
      classes: {
        root: 'root',
      },
    };
  });

  it('renders', () => {
    expect(mountComponent(Footer, props)).toMatchSnapshot();
  });
});
