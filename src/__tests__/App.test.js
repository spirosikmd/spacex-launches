import { App } from '../App';
import StatusFilter from '../StatusFilter';
import SortingOptions from '../SortingOptions';
import { getLaunches } from '../api';
import { processLaunches } from '../launches';
import { createLaunch } from '../__fixtures__/launch';
import { FLIGHT_NUMBER_FIELD, DESC } from '../constants';

jest.mock('../api', () => ({
  getLaunches: jest.fn(),
}));

jest.mock('../launches', () => ({
  processLaunches: jest.fn(),
}));

describe('App', () => {
  let props;

  beforeEach(() => {
    props = {
      classes: {
        main: 'main',
        updatingLoader: 'updatingLoader',
      },
    };
    const launches = [createLaunch()];
    getLaunches.mockReturnValue(Promise.resolve(launches));
    processLaunches.mockReturnValue(launches);
  });

  it('renders info, filters, sorting options and list of launches', async () => {
    expect(await shallow(App, props)).toMatchSnapshot();
  });

  describe('when any status filter changes', () => {
    it('sets the value and checked in the state', async () => {
      const app = await shallow(App, props);
      const statusFilter = app.find(StatusFilter);
      statusFilter.prop('onChange')('value', 'checked');
      expect(app.state().value).toBe('checked');
    });
  });

  describe('when sorting options change', () => {
    it('gets launches with new sorting options', async () => {
      const app = await shallow(App, props);
      const sortingOptions = app.find(SortingOptions);
      await sortingOptions.prop('onSortChange')(
        'sortField',
        FLIGHT_NUMBER_FIELD
      );
      const state = app.state();
      expect(state.isUpdatingLaunches).toBe(false);
      expect(getLaunches).toBeCalledWith({
        sortField: FLIGHT_NUMBER_FIELD,
        sortOrder: DESC,
      });
    });
  });

  describe('when is loading launches', () => {
    it('renders a loader', async () => {
      const app = await shallow(App, props);
      app.setState({ isLoadingLaunches: true });
      expect(app).toMatchSnapshot();
    });
  });

  describe('when is not loading launches', () => {
    describe('when is updating launches', () => {
      it('renders info, filters, sorting options, and a loader', async () => {
        const app = await shallow(App, props);
        app.setState({ isUpdatingLaunches: true });
        expect(app).toMatchSnapshot();
      });
    });
  });
});
