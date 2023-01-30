import PropTypes from 'prop-types';
import React from 'react';
import googleMapLoader from 'react-google-maps-loader';
import { compose } from 'redux';

export const withDirection = WrappedComponent => {
  class Direction extends React.PureComponent {
    componentWillMount = () => {
      const { googleMaps } = this.props;

      this.directionsService = new googleMaps.DirectionsService();
    };

    findRoute = params => {
      const { payload } = params;

      this.directionsService.route(payload, this.findRouteCallback(params));
    };

    findRouteCallback = ({ payload, data, onSuccess, onError }) => (
      result,
      status,
    ) => {
      const request = { ...payload, ...data };

      console.info('### USE GOOGLE API findRoute ###', request, result, status);
      if (status === 'OK') {
        return onSuccess(data.index, result, request);
      }

      return onError(status, request, result);
    };

    render = () => (
      <WrappedComponent findRoute={this.findRoute} {...this.props} />
    );
  }

  Direction.propTypes = {
    // hoc props
    googleMaps: PropTypes.object.isRequired,

    // parent props
    // resaga props
  };

  Direction.defaultProps = {};

  return Direction;
};

export default WrappedComponent => {
  const WrappedDirection = compose(withDirection)(WrappedComponent);

  return googleMapLoader(WrappedDirection, {
    libraries: ['places'],
    key: process.env.GOOGLE_MAPS_API_KEY,
  });
};
