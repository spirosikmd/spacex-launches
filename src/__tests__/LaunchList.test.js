import { LaunchList } from '../LaunchList';

describe('LaunchList', () => {
  let props;

  beforeEach(() => {
    props = {
      launches: [],
    };
  });

  describe('when there are no launches', () => {
    it('renders a message', () => {
      expect(shallow(LaunchList, props)).toMatchSnapshot();
    });
  });

  describe('when there are launches', () => {
    beforeEach(() => {
      props.launches = [
        {
          flightNumber: 1,
        },
        {
          flightNumber: 2,
        },
      ];
    });

    it('renders a list of launches', () => {
      expect(shallow(LaunchList, props)).toMatchSnapshot();
    });
  });
});
