import {
  NODE_STORE_SELECTORS,
  NODE_VIEW_STORE_SELECTORS,
} from 'datastore/nodeStore/selectors';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';

export const CONFIG = {
  value: {
    heading: NODE_STORE_SELECTORS.heading,
    subheading: NODE_STORE_SELECTORS.subheading,
    type: NODE_STORE_SELECTORS.type,
    createdBy: NODE_STORE_SELECTORS.createdBy,

    editable: RESAGA_HELPERS.subscribeIfNotGiven(
      NODE_VIEW_STORE_SELECTORS.editable,
      'editable',
    ),
  },
  setValue: {},
};
