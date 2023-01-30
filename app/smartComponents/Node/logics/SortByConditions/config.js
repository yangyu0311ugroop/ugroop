import { MEDICAL_SEVERITY_HELPERS } from 'utils/helpers/people';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import {
  DIETARY_PATHS,
  MEDICAL_PATHS,
} from 'datastore/personDataStore/constants';

export const CONFIG_1 = {
  value: {
    ids: NODE_STORE_SELECTORS.sortByProp({
      ids: 'ids',
    }),
  },
};

export const CONFIG_2 = {
  value: {
    ids: NODE_STORE_SELECTORS.sortByProp({
      ids: 'ids',
      path: DIETARY_PATHS.calculatedCount,
      reverse: false,
    }),
  },
};

export const CONFIG_3 = {
  value: {
    ids: NODE_STORE_SELECTORS.sortByProp({
      ids: 'ids',
      path: MEDICAL_PATHS.calculatedCount,
      reverse: false,
    }),
  },
};

export const CONFIG_4 = {
  value: {
    ids: NODE_STORE_SELECTORS.sortByProp({
      ids: 'ids',
      path: MEDICAL_PATHS.calculatedSeverity,
      sortFunc: MEDICAL_SEVERITY_HELPERS.sortSeverity,
    }),
  },
};
