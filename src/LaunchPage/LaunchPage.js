import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getLaunch } from '../api';
import Loader from '../Loader';

export class LaunchPage extends Component {
  state = {
    error: null,
    launch: null,
    isLoadingLaunch: true,
  };

  async componentDidMount() {
    try {
      const { flightNumber } = this.props;
      const launch = await getLaunch({ flightNumber });
      this.setState({ isLoadingLaunch: false, launch });
    } catch (error) {
      this.setState({ error, isLoadingLaunch: false });
    }
  }

  render() {
    const { launch, isLoadingLaunch } = this.state;

    if (isLoadingLaunch) {
      return <Loader />;
    }

    return (
      <>
        <div>{launch.missionName}</div>
        <div>{launch.details}</div>
      </>
    );
  }
}

LaunchPage.propTypes = {
  flightNumber: PropTypes.string.isRequired,
};

export default LaunchPage;
