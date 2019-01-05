import { NotFound } from '../NotFound';

describe('NotFound', () => {
  it('renders', () => {
    expect(shallow(NotFound, {})).toMatchSnapshot();
  });
});
