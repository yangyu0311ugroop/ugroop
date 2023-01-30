import { GOOGLE_API_DEBOUNCE_MS } from 'appConstants';
import debounce from 'lodash/debounce';
import PropTypes from 'prop-types';
import React from 'react';
import googleMapLoader from 'react-google-maps-loader';
import { compose } from 'redux';
import { LOGIC_HELPERS } from 'utils/helpers/logic';

export const CACHE = {};
// let counter = 0;

export const withFindDetail = WrappedComponent => {
  class FindDetail extends React.PureComponent {
    componentWillMount = () => {
      this.initService();
    };

    initService = () => {
      const { googleMaps } = this.props;

      if (!googleMaps || !googleMaps.places) return null;

      this.places = new googleMaps.places.PlacesService(
        document.createElement('div'),
      );

      return this.places;
    };

    genKey = ({ placeId }) => placeId;

    findDetailDebounce = (request = {}, callback) => {
      const { placeId } = request;
      // console.log('findDetailDebounce', placeId);

      if (!placeId) return null;

      // console.log('CACHE', CACHE, this.genKey(request));
      const cache = CACHE[this.genKey(request)];

      // console.log('cache', cache);

      if (cache) {
        if (this.debounced) {
          LOGIC_HELPERS.ifFunction(this.debounced.cancel, []);
        }

        // console.log('### withFindDetail CACHE ###', placeId, cache);
        return this.findDetailCallback(request, callback, true)(...cache);
      }

      if (!this.debounced) {
        this.debounced = debounce(this.findDetail, GOOGLE_API_DEBOUNCE_MS);
      }

      // will debounce
      return this.debounced(request, callback);
    };

    findDetail = (request = {}, callback) => {
      const { fields } = this.props;
      // console.info('### GOOGLE API getDetails ', counter, '###', request);

      // counter += 1;

      this.places.getDetails(
        {
          fields,
          ...request,
        },
        this.findDetailCallback(request, callback),
      );
    };

    findDetailCallback = (request, callback, fromCache) => (result, status) => {
      // console.info(
      //   '### GOOGLE API findDetailCallback ###',
      //   fromCache && 'FROM CACHE',
      //   result,
      //   status,
      //   request,
      // );
      // cache success results
      if (status === 'OK') {
        if (!fromCache) {
          // console.log('findDetailCallback genKey()', this.genKey(request), [
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
        <WrappedComponent findDetail={this.findDetailDebounce} {...props} />
      );
    };
  }

  FindDetail.propTypes = {
    // hoc props
    googleMaps: PropTypes.object.isRequired,

    // parent props
    fields: PropTypes.array,
    // resaga props
  };

  FindDetail.defaultProps = {
    // fields: ['name', 'address_component', 'geometry', 'formatted_address'],
  };

  return FindDetail;
};

export default WrappedComponent => {
  const WrappedFindDetail = compose(withFindDetail)(WrappedComponent);

  return googleMapLoader(WrappedFindDetail, {
    libraries: ['places'],
    key: process.env.GOOGLE_MAPS_API_KEY,
  });
};
