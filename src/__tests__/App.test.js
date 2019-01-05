import { Router } from '@reach/router';
import { App } from '../App';
import Home from '../Home';
import { getLaunches } from '../api';
import { processLaunches } from '../utils';
import { createLaunch } from '../__fixtures__/launch';
import { FLIGHT_NUMBER_FIELD, DESC } from '../constants';

jest.mock('../api', () => ({
  getLaunches: jest.fn(),
}));

jest.mock('../utils', () => ({
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

  it('renders', async () => {
    expect(await shallow(App, props)).toMatchSnapshot();
  });

  describe('when any status filter changes', () => {
    it('sets the value and checked in the state', async () => {
      const app = await shallow(App, props);
      const home = app
        .find(Router)
        .children()
        .at(1);
      home.prop('onChange')('value', 'checked');
      expect(app.state().value).toBe('checked');
    });
  });

  describe('when sorting options change', () => {
    it('gets launches with new sorting options', async () => {
      const app = await shallow(App, props);
      const home = app
        .find(Router)
        .children()
        .at(1);
      await home.prop('onSortChange')('sortField', FLIGHT_NUMBER_FIELD);
      const state = app.state();
      expect(state.isUpdatingLaunches).toBe(false);
      expect(getLaunches).toBeCalledWith({
        sortField: FLIGHT_NUMBER_FIELD,
        sortOrder: DESC,
      });
    });
  });
});
