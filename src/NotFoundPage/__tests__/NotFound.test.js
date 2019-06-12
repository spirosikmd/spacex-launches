import NotFoundPage from '../NotFoundPage';

describe('NotFoundPage', () => {
  it('renders', () => {
    expect(mountComponent(NotFoundPage, {})).toMatchSnapshot();
  });
});
