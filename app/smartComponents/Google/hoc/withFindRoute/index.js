import { GOOGLE_API_DEBOUNCE_MS } from 'appConstants';
import debounce from 'lodash/debounce';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import React from 'react';
import googleMapLoader from 'react-google-maps-loader';
import { compose } from 'redux';
import { LOGIC_HELPERS } from 'utils/helpers/logic';

export const CACHE = {};
// let counter = 0;

export const withFindRoute = WrappedComponent => {
  class FindRoute extends React.PureComponent {
    componentWillMount = () => {
      this.initService();
    };

    initService = () => {
      const { googleMaps } = this.props;

      if (!googleMaps) return null;

      this.directions = new googleMaps.DirectionsService();

      return this.directions;
    };

    genKey = request => {
      const start = get(request, 'origin.placeId');
      const end = get(request, 'destination.placeId');
      const travelMode = get(request, 'travelMode');

      return `${start}___${end}___${travelMode}`;
    };

    validRequest = request => {
      const start = get(request, 'origin.placeId');
      const end = get(request, 'destination.placeId');

      return Boolean(start && end);
    };

    findRouteDebounce = (request = {}, callback) => {
      if (!this.validRequest(request)) return null;

      const cache = CACHE[this.genKey(request)];

      if (cache) {
        if (this.debounced) {
          LOGIC_HELPERS.ifFunction(this.debounced.cancel, []);
        }

        // console.log('### withFindRoute CACHE ###');
        return this.findRouteCallback(request, callback, true)(...cache);
      }

      if (!this.debounced) {
        this.debounced = debounce(this.findRoute, GOOGLE_API_DEBOUNCE_MS);
      }

      // will debounce
      return this.debounced(request, callback);
    };

    findRoute = (request = {}, callback) => {
      this.directions.route(request, this.findRouteCallback(request, callback));
    };

    findRouteCallback = (request, callback, fromCache) => (result, status) => {
      // cache success results
      if (status === 'OK') {
        if (!fromCache) {
          // console.log('findRouteCallback genKey()', this.genKey(request), [
          //   result,
          //   status,
          // ]);
          CACHE[this.genKey(request)] = [result, status];
        }
      }

      return callback(result, status, request);
    };

    render = () => {
      const { googleMaps, ...props } = this.props;

      return <WrappedComponent findRoute={this.findRouteDebounce} {...props} />;
    };
  }

  FindRoute.propTypes = {
    // hoc props
    googleMaps: PropTypes.object.isRequired,

    // parent props
    fields: PropTypes.array,
    // resaga props
  };

  FindRoute.defaultProps = {
    // fields: ['name', 'address_component', 'geometry', 'formatted_address'],
  };

  return FindRoute;
};

export default WrappedComponent => {
  const WrappedFindRoute = compose(withFindRoute)(WrappedComponent);

  return googleMapLoader(WrappedFindRoute, {
    libraries: ['places'],
    key: process.env.GOOGLE_MAPS_API_KEY,
  });
};
