import { ORGANISATION_DATA_STORE } from 'appConstants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { IS_FEATURE_TOUR } from 'smartComponents/Node/types/Template/variants/Card/config';

export const CONFIG = {
  value: {
    featuredTour: IS_FEATURE_TOUR,
    organisationId: NODE_STORE_SELECTORS.organisationId,
    organisationIds: [ORGANISATION_DATA_STORE, 'organisationIds'],
  },
  setValue: {},
};
