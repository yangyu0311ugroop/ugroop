import {
  NODE_VIEW_STORE_SELECTORS,
  NODE_STORE_SELECTORS,
} from 'datastore/nodeStore/selectors';
import { ABILITY_DATA_STORE, ORGANISATION_VIEWSTORE } from 'appConstants';
/**
 * Created by quando on 7/8/17.
 */
import { SET_VALUE } from 'ugcomponents/SnackBar/config';

export const CONFIG = {
  value: {
    tourOwnerAbilities: [
      ABILITY_DATA_STORE,
      'definitions',
      'tour',
      'tour_owner',
    ],
    organisationId: [ORGANISATION_VIEWSTORE, 'organisationId'],
  },

  setValue: {
    tours: [ABILITY_DATA_STORE, 'tours'],
    nodes: NODE_STORE_SELECTORS.nodes,
    editable: NODE_VIEW_STORE_SELECTORS.editable,
    ...SET_VALUE,
  },
};
