import {
  COGNITO_ACCOUNTSTORE,
  NODE_STORE,
  NODE_STORE_ITEM,
} from 'appConstants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const IS_FEATURE_TOUR = {
  cacheKey: ({ id }) => `featuredTour${id}`,
  keyPath: [NODE_STORE, NODE_STORE_ITEM.FEATURED_TOURS],
  props: ({ id }) => id,
  getter: (featuredTours, id) =>
    featuredTours && Object.keys(featuredTours).indexOf(`${id}`) !== -1,
};

export const CONFIG = {
  value: {
    createdBy: NODE_STORE_SELECTORS.createdBy,
    me: [COGNITO_ACCOUNTSTORE, 'account', 'id'],
    organisationId: NODE_STORE_SELECTORS.organisationId,
  },
  setValue: {},
};
