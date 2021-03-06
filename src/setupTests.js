import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createSerializer } from 'enzyme-to-json';
import createMount from '@material-ui/core/test-utils/createMount';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { createCustomMuiTheme } from './createCustomMuiTheme';
import { render } from '@testing-library/react';

configure({ adapter: new Adapter() });

expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));

let mount;

beforeEach(() => {
  mount = createMount();
});

afterEach(() => {
  mount.cleanUp();
});

global.mountComponent = (Component, props = {}) => {
  return mount(
    <MuiThemeProvider theme={createCustomMuiTheme()}>
      <Component {...props} />
    </MuiThemeProvider>
  );
};

// https://github.com/airbnb/enzyme/issues/1875
jest.mock('react', () => {
  const r = jest.requireActual('react');
  return { ...r, memo: x => x };
});

global.fetch = require('jest-fetch-mock');

const AllTheProviders = ({ children }) => {
  return (
    <MuiThemeProvider theme={createCustomMuiTheme()}>
      {children}
    </MuiThemeProvider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
