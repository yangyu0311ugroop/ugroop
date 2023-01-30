import {
  ABILITY_DATA_STORE,
  TEMPLATE_MANAGEMENT_VIEWSTORE,
} from 'appConstants';
import {
  NODE_STORE_SELECTORS,
  NODE_VIEW_STORE_SELECTORS,
} from 'datastore/nodeStore/selectors';
import { revealSnackbar } from 'ugcomponents/SnackBar/actions';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';
import { COGNITO_STORE_SELECTORS } from 'datastore/stormPathStore/selectors';
import { PORTAL_HELPERS } from '../../../../../../Portal/helpers';
import { TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS } from '../../../../../../../datastore/templateManagementStore/selectors';

export const snackbar = { reveal: revealSnackbar };

// Actions
export const DELETE_TEMPLATE = 'deleteTemplate';
export const UNDER_CONSTRUCTION = 'underConstruction';

export const CONFIG = {
  value: {
    me: COGNITO_STORE_SELECTORS.myId,
    hashkey: RESAGA_HELPERS.mapToId(NODE_STORE_SELECTORS.hashkey, 'templateId'),
    content: ({ templateId }) =>
      NODE_STORE_SELECTORS.content({ id: templateId }),
    // not using this, but it will trigger component re-render whenever ability updated
    // so the buttons show correctly whenver user role changed
    abilityUpdated: [ABILITY_DATA_STORE, 'abilityUpdated'],
    editable: NODE_VIEW_STORE_SELECTORS.editable,

    createdBy: ({ templateId }) =>
      NODE_STORE_SELECTORS.createdBy({ id: templateId }),
    transferStatus: ({ templateId }) =>
      NODE_STORE_SELECTORS.nodeTransferStatus({ id: templateId }),
    dayIds: RESAGA_HELPERS.mapToId(NODE_STORE_SELECTORS.children, 'timelineId'),
    paxLabel: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.paxLabel,
  },

  setValue: {
    editable: NODE_VIEW_STORE_SELECTORS.editable,
    tourSettingsDialog: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'tourSettingsDialog'],
    transferDialog: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'transferDialog'],
    showMessenger: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'tourMessenger'],
    node: NODE_STORE_SELECTORS.nodes,
    ...PORTAL_HELPERS.setValue,
  },
};
