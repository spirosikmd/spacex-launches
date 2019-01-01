import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { getLaunches } from './api';
import { getNumberOfSuccess, getNumberOfFail } from './launches';
import Launch from './Launch';

class App extends Component {
  state = {
    launches: [],
    isLoadingLaunches: false,
    error: null
  };

  async componentDidMount() {
    this.setState({ isLoadingLaunches: true });
    try {
      const launches = await getLaunches();
      this.setState({ launches, isLoadingLaunches: false });
    } catch (error) {
      this.setState({ error, isLoadingLaunches: false });
    }
  }

  render() {
    const { launches, isLoadingLaunches } = this.state;

    if (isLoadingLaunches) {
      return (
        <>
          <CssBaseline />
          <div>Loading...</div>
        </>
      );
    }

    return (
      <>
        <CssBaseline />
        <div>Total launches: {launches.length}</div>
        <div>Successful launches: {getNumberOfSuccess(launches)}</div>
        <div>Failed launches: {getNumberOfFail(launches)}</div>
        {launches.map(launch => (
          <Launch key={launch.flightNumber} launch={launch} />
        ))}
      </>
    );
  }
}

export default App;
