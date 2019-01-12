import { HomePage } from '../HomePage';
import { createLaunch } from '../../__fixtures__/launch';
import { getLaunches } from '../../api';
import { processLaunches } from '../../utils';
import { FLIGHT_NUMBER_FIELD, DESC, FIELDS } from '../../constants';
import StatusFilter from '../../StatusFilter';
import SortingOptions from '../../SortingOptions';

jest.mock('../../api', () => ({
  getLaunches: jest.fn(),
}));

jest.mock('../../utils', () => ({
  processLaunches: jest.fn(),
}));

describe('HomePage', () => {
  let props;

  beforeEach(() => {
    props = {
      classes: {
        loader: 'loader',
      },
    };
    const launches = [
      createLaunch(),
      createLaunch({ isSuccessful: false, isFailed: true }),
      createLaunch({ isSuccessful: false, isUpcoming: true }),
    ];
    const processedLaunches = [
      createLaunch(),
      createLaunch({ isSuccessful: false, isFailed: true }),
    ];
    getLaunches.mockReturnValue(Promise.resolve(launches));
    processLaunches.mockReturnValue(processedLaunches);
  });

  it('renders', async () => {
    expect(await shallow(HomePage, props)).toMatchSnapshot();
  });

  describe('when is loading launches', () => {
    it('renders a loader', () => {
      expect(shallow(HomePage, props)).toMatchSnapshot();
    });
  });

  describe('when is updating launches', () => {
    it('renders info, filters, sorting options, and a loader', async () => {
      const homePage = await shallow(HomePage, props);
      const sortingOptions = homePage.find(SortingOptions);
      sortingOptions.prop('onSortChange')('sortField', FLIGHT_NUMBER_FIELD);
      expect(homePage).toMatchSnapshot();
    });
  });

  describe('when there are no processed launches', () => {
    it('does not render the sorting options', async () => {
      processLaunches.mockReturnValue([]);
      expect(await shallow(HomePage, props)).toMatchSnapshot();
    });
  });

  describe('when any status filter changes', () => {
    it('sets the value and checked in the state', async () => {
      const homePage = await shallow(HomePage, props);
      const statusFilter = homePage.find(StatusFilter);
      statusFilter.prop('onChange')('value', 'checked');
      expect(homePage.state().value).toBe('checked');
    });
  });

  describe('when sorting options change', () => {
    it('gets launches with new sorting options', async () => {
      const homePage = await shallow(HomePage, props);
      const sortingOptions = homePage.find(SortingOptions);
      await sortingOptions.prop('onSortChange')(
        'sortField',
        FLIGHT_NUMBER_FIELD
      );
      const state = homePage.state();
      expect(state.isUpdatingLaunches).toBe(false);
      expect(getLaunches).toBeCalledWith({
        sortField: FLIGHT_NUMBER_FIELD,
        sortOrder: DESC,
        filter: FIELDS,
      });
    });
  });
});
