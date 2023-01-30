import { GEOCODE_NORMALISERS } from 'apis/components/Geocodes/normalisers';
import { GEOCODE_STORE_SELECTORS } from 'datastore/geocodeStore/selectors';
import request from 'utils/request';
import Geocode from 'react-geocode';
import {
  GEOCODE_API,
  GET_LAT_LONG,
  GET_PLACE_IDS,
  GET_GEO_COUNTRY_CODE,
  GET_GEO_CURRENT_LOCATION,
} from 'apis/constants';
import { GEOCODE_STORE, IPI_LOCATION_API } from 'appConstants';
export const CONFIG = {
  name: GEOCODE_API,

  requests: {
    [GET_PLACE_IDS]: ({ locations }) => {
      if (locations.length) {
        return locations.map(location => ({ placeId: location.placeId }));
      }
      return null;
    },
    // only call this request for single location
    [GET_LAT_LONG]: ({ location }) => {
      if (location) {
        Geocode.setApiKey(process.env.GOOGLE_MAPS_API_KEY);
        return Geocode.fromAddress(location);
      }

      return null;
    },
    [GET_GEO_COUNTRY_CODE]: ({ location }) => {
      if (location) {
        Geocode.setApiKey(process.env.GOOGLE_MAPS_API_KEY);
        return Geocode.fromAddress(location);
      }
      return null;
    },
    [GET_GEO_CURRENT_LOCATION]: () => request(IPI_LOCATION_API.locationSearch),
  },

  processResult: {
    [GET_PLACE_IDS]: GEOCODE_NORMALISERS.getLatLongs,
    [GET_LAT_LONG]: GEOCODE_NORMALISERS.getLatLong,
    [GET_GEO_COUNTRY_CODE]: GEOCODE_NORMALISERS.getCountryCode,
    [GET_GEO_CURRENT_LOCATION]: GEOCODE_NORMALISERS.getCurrentLocation,
  },

  setValue: {
    geocodes: [GEOCODE_STORE, 'geocodes'],
    currentLocation: GEOCODE_STORE_SELECTORS.currentLocation,
  },
};
