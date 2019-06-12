import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import createMount from '@material-ui/core/test-utils/createMount';
import ErrorBoundary from '../ErrorBoundary';
import { createCustomMuiTheme } from '../createCustomMuiTheme';

const ComponentThatThrows = () => <div>Test</div>;

describe('ErrorBoundary', () => {
  let props;
  let mount;

  beforeEach(() => {
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  function mountComponent() {
    return mount(
      <MuiThemeProvider theme={createCustomMuiTheme()}>
        <ErrorBoundary>
          <ComponentThatThrows />
        </ErrorBoundary>
      </MuiThemeProvider>
    );
  }

  beforeEach(() => {
    props = {
      children: <div>Test</div>,
    };
  });

  describe('when there is no error', () => {
    it('renders children', () => {
      expect(mountComponent(props)).toMatchSnapshot();
    });
  });

  describe('when there is error', () => {
    it('renders an error message', () => {
      const error = new Error('test');
      const errorBoundary = mountComponent(props);
      errorBoundary.find(ComponentThatThrows).simulateError(error);
      expect(errorBoundary).toMatchSnapshot();
    });
  });
});
