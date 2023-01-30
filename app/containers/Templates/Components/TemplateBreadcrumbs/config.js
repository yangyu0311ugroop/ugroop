import { NODE_TRAILS_DATASTORE } from 'appConstants';
import { FOLDER_API, GET_PARENT_OF_FOLDER } from 'apis/constants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { ORGANISATION_STORE_SELECTORS } from 'datastore/orgStore/selectors';
import { COGNITO_STORE_SELECTOR } from 'datastore/stormPathStore/selectors.resaga';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';

export const GET_ORG_ID_CONFIG = {
  value: {
    // Possible to change once we support multiple organisation per user
    orgIdFromUrl: {
      getter: ORGANISATION_STORE_SELECTORS.organisationIdFromURL,
    },
    orgIdFromNode: RESAGA_HELPERS.mapToId(
      NODE_STORE_SELECTORS.organisationId,
      'folderId',
    ),
    rootNodeId: COGNITO_STORE_SELECTOR.rootNodeId.value,
  },
};

export const CONFIG = {
  value: {
    items: props => [
      NODE_TRAILS_DATASTORE,
      'breadcrumb',
      props.folderId,
      'trail',
    ],
  },
  isLoading: {
    isFetchParentsLoading: [FOLDER_API, GET_PARENT_OF_FOLDER],
  },
};

export const ITEM_CONFIG = {
  value: {
    nodeData: {
      keyPath: props => [NODE_TRAILS_DATASTORE, 'trail', props.id],
      spreadObject: true,
    },
  },
};
