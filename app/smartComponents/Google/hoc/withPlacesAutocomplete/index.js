import { GOOGLE_API_DEBOUNCE_MS } from 'appConstants';
import debounce from 'lodash/debounce';
import PropTypes from 'prop-types';
import React from 'react';
import googleMapLoader from 'react-google-maps-loader';
import { compose } from 'redux';
import { LOGIC_HELPERS } from 'utils/helpers/logic';

export const CACHE = {};
// let counter = 0;

export const withPlacesAutocomplete = WrappedComponent => {
  class PlacesAutocomplete extends React.PureComponent {
    componentWillMount = () => {
      this.initService();
    };

    initService = () => {
      const { googleMaps } = this.props;

      this.autoComplete = new googleMaps.places.AutocompleteService();
      this.LatLng = googleMaps.LatLng;
    };

    genKey = ({ input = '', types }) => `${input.trim()}__${types}`;

    findPlacesDebounce = (request = {}, callback) => {
      const { input } = request;

      if (!input) return null;

      const cache = CACHE[this.genKey(request)];

      if (cache) {
        if (this.debounced) {
          LOGIC_HELPERS.ifFunction(this.debounced.cancel, []);
        }

        // console.log('### GOOGLE API use cache ###', input, cache);
        return this.findPlacesCallback(request, callback, true)(...cache);
      }

      if (!this.debounced) {
        this.debounced = debounce(this.findPlaces, GOOGLE_API_DEBOUNCE_MS);
      }

      // will debounce
      return this.debounced(request, callback);
    };

    findPlaces = (request = {}, callback) => {
      // console.info(
      //   '### GOOGLE API getPlacePredictions ',
      //   counter,
      //   '###',
      //   request,
      // );

      // counter += 1;
      const makeRequest = {
        ...request,
        location: request.location
          ? new this.LatLng(...request.location)
          : undefined,
      };

      this.autoComplete.getPlacePredictions(
        makeRequest,
        this.findPlacesCallback(request, callback),
      );
    };

    findPlacesCallback = (request, callback, fromCache) => (result, status) => {
      // console.info('### GOOGLE API getPlacePredictions ###', status, result);
      //   fromCache && 'FROM CACHE',
      //   result,
      //   status,
      //   request,
      // );
      if (status === 'OK') {
        // cache success results
        if (!fromCache) {
          // console.log('findPlacesCallback genKey()', this.genKey(request), [
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

      return (
        <WrappedComponent findPlaces={this.findPlacesDebounce} {...props} />
      );
    };
  }

  PlacesAutocomplete.propTypes = {
    // hoc props
    googleMaps: PropTypes.object.isRequired,

    // parent props
    // resaga props
  };

  PlacesAutocomplete.defaultProps = {};

  return PlacesAutocomplete;
};

export default WrappedComponent => {
  const WrappedPlacesAutocomplete = compose(withPlacesAutocomplete)(
    WrappedComponent,
  );

  return googleMapLoader(WrappedPlacesAutocomplete, {
    libraries: ['places'],
    key: process.env.GOOGLE_MAPS_API_KEY,
  });
};
