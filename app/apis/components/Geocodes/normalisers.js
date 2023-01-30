import { get, first } from 'lodash';
import { DATASTORE_UTILS } from 'datastore';
export const getLatLongs = (result, { locations }) => ({
  geocodes: locations.reduce(
    (acc, { placeId }) => ({ ...acc, [placeId]: { placeId } }),
    {},
  ),
  raw: result,
});

export const getLatLong = result => {
  const { results } = result;
  const placeId = get(results, '0.place_id', 0);
  return {
    geocodes: {
      [placeId]: {
        lat: get(results, '0.geometry.location.lat', 0),
        lng: get(results, '0.geometry.location.lng', 0),
      },
    },
  };
};

export const getCountryCode = result => {
  const { results } = result;
  const placeId = get(results, '0.place_id', null);

  if (placeId) {
    const address = get(result.results[0], 'address_components', []);
    const country = address.filter(value => value.types.includes('country'));
    const countryCode = get(first(country), 'short_name', '');
    const res = {
      [placeId]: {
        lat: get(results, '0.geometry.location.lat', 0),
        lng: get(results, '0.geometry.location.lng', 0),
        countryCode,
      },
    };
    return { geocodes: DATASTORE_UTILS.upsertObject(res) };
  }
  return null;
};

export const getCurrentLocation = result => ({ currentLocation: result });
export const GEOCODE_NORMALISERS = {
  getLatLongs,
  getLatLong,
  getCurrentLocation,
  getCountryCode,
};
