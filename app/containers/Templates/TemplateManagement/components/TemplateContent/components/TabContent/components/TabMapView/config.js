import { NODE_STORE, GEOCODE_STORE } from 'appConstants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import _ from 'lodash';

export const DAY_ID_CONFIG = {
  value: {
    dayIds: ({ tabId }) => [NODE_STORE, 'nodes', tabId, 'children'],
  },
};

export const PLACE_ID_CONFIG = {
  value: {
    placeIds: {
      keyPath: ({ dayIds = [] }) =>
        dayIds.map(dayId => NODE_STORE_SELECTORS.placeId({ id: dayId })),
      cacheKey: ({ dayIds }) =>
        `templateManagementPage.maps.${
          dayIds ? dayIds.toString() : null
        }.placeIds`,
      props: null,
      getter: (...args) => args,
    },
  },
};

export const CONFIG = {
  value: {
    locations: {
      keyPath: ({ dayIds = [] }) =>
        dayIds.map(dayId => NODE_STORE_SELECTORS.location({ id: dayId })),
      cacheKey: ({ placeIds }) =>
        `templateManagementPage.maps.${
          placeIds ? placeIds.toString() : null
        }.locations`,
      props: ({ placeIds }) => placeIds,
      getter: (...locations) => {
        const placeIds = locations.pop();
        return _.zip(placeIds, locations).filter(
          ([placeId, location]) => !!placeId && !!location,
        );
      },
    },
    geocodes: {
      keyPath: ({ placeIds = [] }) =>
        placeIds.map(placeId => [GEOCODE_STORE, 'geocodes', placeId]),
      cacheKey: ({ placeIds }) =>
        `templateManagementPage.maps.${
          placeIds ? placeIds.toString() : null
        }.geocodes`,
      props: null,
      getter: (...geocodes) => geocodes.filter(geocode => !!geocode),
    },
  },
  setValue: {},
};
