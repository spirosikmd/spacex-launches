import React from 'react';
import ErrorBoundary from '../ErrorBoundary';

describe('ErrorBoundary', () => {
  let props;

  beforeEach(() => {
    props = {
      children: <div>Test</div>,
    };
  });

  describe('when there is no error', () => {
    it('renders children', () => {
      expect(shallow(ErrorBoundary, props)).toMatchSnapshot();
    });
  });

  describe('when there is error', () => {
    it('renders an error message', () => {
      const errorBoundary = shallow(ErrorBoundary, props);
      errorBoundary.setState({ hasError: true });
      expect(errorBoundary).toMatchSnapshot();
    });
  });
});
