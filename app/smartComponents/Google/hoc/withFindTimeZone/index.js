import { GOOGLE_API_DEBOUNCE_MS } from 'appConstants';
import debounce from 'lodash/debounce';
import React from 'react';
import { compose } from 'redux';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import timeZoneHelpers from 'utils/helpers/timeZone';

export const CACHE = {};
let counter = 0;

export const withFindTimeZone = WrappedComponent => {
  class FindTimeZone extends React.PureComponent {
    genKey = ({ latitude, longitude, timestamp }) =>
      `${latitude},${longitude},${timestamp}`;

    findTimeZoneDebounce = (request, callback) => {
      const { latitude, longitude } = request;

      if (!latitude || !longitude) return null;

      const cache = CACHE[this.genKey(request)];

      if (cache) {
        if (this.debounced) {
          LOGIC_HELPERS.ifFunction(this.debounced.cancel, []);
        }

        // console.log(
        //   '### withFindTimeZone CACHE ###',
        //   latitude,
        //   longitude,
        //   cache,
        // );
        return this.findTimeZoneCallback(request, callback, true)(...cache);
      }

      if (!this.debounced) {
        this.debounced = debounce(this.findTimeZone, GOOGLE_API_DEBOUNCE_MS);
      }

      // will debounce
      return this.debounced(request, callback);
    };

    findTimeZone = (request, callback) => {
      console.info('### GOOGLE API findTimeZone ', counter, '###', request);

      counter += 1;
      return timeZoneHelpers.fetchTimeZone(
        request,
        this.findTimeZoneCallback(request, callback),
      );
    };

    findTimeZoneCallback = (request, callback, fromCache) => (
      error,
      result,
    ) => {
      // console.info(
      //   '### GOOGLE API findTimeZoneCallback ###',
      //   fromCache && 'FROM CACHE',
      //   result,
      //   request,
      // );
      // cache success results
      if (!error && result.status === 'OK') {
        if (!fromCache) {
          // console.log('findTimeZoneCallback genKey()', this.genKey(request), [
          //   result,
          // ]);
          CACHE[this.genKey(request)] = [error, result];
        }
      }

      return callback(result, request);
    };

    render = () => {
      const { ...props } = this.props;

      return (
        <WrappedComponent findTimeZone={this.findTimeZoneDebounce} {...props} />
      );
    };
  }

  FindTimeZone.propTypes = {
    // hoc props
    // parent props
    // resaga props
  };

  FindTimeZone.defaultProps = {};

  return FindTimeZone;
};

export default WrappedComponent => compose(withFindTimeZone)(WrappedComponent);
