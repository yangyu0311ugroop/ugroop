import first from 'lodash/first';
import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { PERSON_STORE_SELECTORS } from 'datastore/personDataStore/selectors';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS } from 'datastore/templateManagementStore/selectors';
import { TEMPLATE_MANAGEMENT_VIEWSTORE } from 'appConstants';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';

export const CONFIG_PARENT = {
  value: {
    parentId: RESAGA_HELPERS.subscribeIfNotGiven(
      NODE_STORE_SELECTORS.parentNodeId,
      'parentId',
    ),
  },
};
export const CONFIG = {
  value: {
    personId: {
      keyPath: ({ id }) =>
        NODE_STORE_SELECTORS.nodeProp({
          id,
          path: NODE_PATHS.calculatedPeople,
        }),
      getter: people => first(people),
    },
    linkedUserId: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.LINKED_USER.id,
    personType: ({ id }) =>
      NODE_STORE_SELECTORS.nodeProp({ id, path: NODE_PATHS.personType }),
    selectedFollowerId:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.FOLLOWER_SELECTORS
        .selectedFollowerId,
    createdBy: ({ id }) =>
      NODE_STORE_SELECTORS.nodeProp({ id, path: NODE_PATHS.createdBy }),
    parentType: ({ parentId }) => NODE_STORE_SELECTORS.type({ id: parentId }),
    personEmail: ({ id }) =>
      NODE_STORE_SELECTORS.nodeProp({ id, path: NODE_PATHS.email }),
    nodeType: ({ id }) => NODE_STORE_SELECTORS.type({ id }),
    isDialogOpen: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT.VIEW.open,
  },
};

export const CONFIG_3 = {
  value: {
    participantEmail: ({ personId }) =>
      PERSON_STORE_SELECTORS.email({ id: personId }),
  },
  setValue: {
    seeDetail: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'seeDetail'],
    participantViewOpen:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT.VIEW.open,
    participantViewId:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT.VIEW.id,
  },
};
