import App from '../App';

describe('App', () => {
  let props;

  beforeEach(() => {
    props = {
      classes: {
        main: 'main',
      },
    };
  });

  it('renders', async () => {
    expect(await shallow(App, props)).toMatchSnapshot();
  });
});
