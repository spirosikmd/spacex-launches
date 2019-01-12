import { Home } from '../Home';
import { createLaunch } from '../../__fixtures__/launch';
import { FLIGHT_NUMBER_FIELD, DESC } from '../../constants';

describe('Home', () => {
  let props;

  beforeEach(() => {
    props = {
      classes: {
        loader: 'loader',
      },
      launches: [
        createLaunch(),
        createLaunch({ isSuccessful: false, isFailed: true }),
        createLaunch({ isSuccessful: false, isUpcoming: true }),
      ],
      processedLaunches: [
        createLaunch(),
        createLaunch({ isSuccessful: false, isFailed: true }),
      ],
      showFailed: true,
      showSuccessful: true,
      showUpcoming: false,
      sortField: FLIGHT_NUMBER_FIELD,
      sortOrder: DESC,
      isUpdatingLaunches: false,
      isLoadingLaunches: false,
    };
  });

  it('renders', () => {
    expect(shallow(Home, props)).toMatchSnapshot();
  });

  describe('when is loading launches', () => {
    it('renders a loader', () => {
      props.isLoadingLaunches = true;
      expect(shallow(Home, props)).toMatchSnapshot();
    });
  });

  describe('when is not loading launches', () => {
    describe('when is updating launches', () => {
      it('renders info, filters, sorting options, and a loader', () => {
        props.isUpdatingLaunches = true;
        expect(shallow(Home, props)).toMatchSnapshot();
      });
    });
  });

  describe('when there are no processed launches', () => {
    it('does not render the sorting options', () => {
      props.processedLaunches = [];
      expect(shallow(Home, props)).toMatchSnapshot();
    });
  });
});
