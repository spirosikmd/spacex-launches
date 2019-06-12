import App from '../App';

describe('App', () => {
  it('renders', () => {
    expect(mountComponent(App)).toMatchSnapshot();
  });
});
