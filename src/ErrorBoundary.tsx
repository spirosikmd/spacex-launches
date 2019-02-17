import React, { PureComponent } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Typography } from '@material-ui/core';

class ErrorBoundary extends PureComponent {
  state = {
    hasError: false,
  };

  componentDidCatch(/* error, info */) {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <CssBaseline />
          <Typography>
            Something unexpected happened! Refresh the page!
          </Typography>
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
