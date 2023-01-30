import { GEOCODE_STORE } from 'appConstants';

export const CONFIG = {
  value: {
    singleDayGeocode: {
      keyPath: ({ placeIds }) => [
        GEOCODE_STORE,
        'geocodes',
        placeIds[0][0].placeId,
      ],
      getter: geocodes => geocodes,
    },
  },
  setValue: {},
};
