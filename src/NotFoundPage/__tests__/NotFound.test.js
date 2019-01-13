import NotFoundPage from '../NotFoundPage';

describe('NotFoundPage', () => {
  it('renders', () => {
    expect(shallow(NotFoundPage, {})).toMatchSnapshot();
  });
});
