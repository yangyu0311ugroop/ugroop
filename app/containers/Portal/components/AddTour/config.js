import { CREATE_NODE, NODE_API } from 'apis/constants';
import {
  ABILITY_DATA_STORE,
  DASHBOARD_VIEW_STORE,
  ORGANISATION_DATA_STORE,
} from 'appConstants';
import {
  NODE_STORE_SELECTORS,
  NODE_VIEW_STORE_SELECTORS,
} from 'datastore/nodeStore/selectors';
import { ORGANISATION_STORE_SELECTORS } from 'datastore/orgStore/selectors';
import { COGNITO_STORE_SELECTOR } from 'datastore/stormPathStore/selectors.resaga';
import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';
import { SET_VALUE } from 'ugcomponents/SnackBar/config';

export const CONFIG = {
  value: {
    organisations: ({ userId }) =>
      USER_STORE_SELECTORS.organisations({ id: userId }),
    myRootNodeId: COGNITO_STORE_SELECTOR.rootNodeId.value,
    orgUsers: [ORGANISATION_DATA_STORE, 'orgUsers'],
    organisationIdFromURL: {
      getter: ORGANISATION_STORE_SELECTORS.organisationIdFromMyToursURL,
    },
    selectedOrgId: [DASHBOARD_VIEW_STORE, 'selectedOrgId'],
  },
  setValue: {
    tours: [ABILITY_DATA_STORE, 'tours'],
    layout: NODE_STORE_SELECTORS.calculatedLayout,
    editable: NODE_VIEW_STORE_SELECTORS.editable,
    ...SET_VALUE,
  },

  isLoading: {
    loading: [NODE_API, CREATE_NODE],
  },
};
