import React from 'react';
import { render } from '../setupTests';
import ErrorBoundary from '../ErrorBoundary';

const ComponentThatThrows = class extends React.Component {
  render() {
    throw new Error('test');
  }
};

describe('ErrorBoundary', () => {
  describe('when there is no error', () => {
    it('renders children', () => {
      const { asFragment } = render(
        <ErrorBoundary>
          <div>Test</div>
        </ErrorBoundary>
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('when there is error', () => {
    it('renders an error message', () => {
      console.error = () => {};
      const { asFragment } = render(
        <ErrorBoundary>
          <ComponentThatThrows />
        </ErrorBoundary>
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
