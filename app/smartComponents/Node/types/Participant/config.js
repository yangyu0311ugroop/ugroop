import first from 'lodash/first';
import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { PERSON_STORE_SELECTORS } from 'datastore/personDataStore/selectors';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS } from 'datastore/templateManagementStore/selectors';
import {
  TEMPLATE_MANAGEMENT_DATASTORE,
  TEMPLATE_MANAGEMENT_VIEWSTORE,
} from 'appConstants';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';
import { COGNITO_STORE_SELECTOR } from '../../../../datastore/stormPathStore/selectors.resaga';

export const CONFIG_PARENT = {
  value: {
    parentId: RESAGA_HELPERS.subscribeIfNotGiven(
      NODE_STORE_SELECTORS.parentNodeId,
      'parentId',
    ),
    rooms: NODE_STORE_SELECTORS.rooms,
    followers: NODE_STORE_SELECTORS.followers,
    oldFollowerId: NODE_STORE_SELECTORS.oldFollowerProp(['id']),
    followerId:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.INTERESTED_PERSON.VIEW.id,
    templateId: [TEMPLATE_MANAGEMENT_DATASTORE, 'id'],
    me: COGNITO_STORE_SELECTOR.userId.value,
  },
};
export const CONFIG = {
  value: {
    parentParticipants: RESAGA_HELPERS.mapToId(
      NODE_STORE_SELECTORS.participantLinks,
      'followerId',
    ),
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
    groups: NODE_STORE_SELECTORS.groups,
    personEmail: ({ id }) =>
      NODE_STORE_SELECTORS.nodeProp({ id, path: NODE_PATHS.email }),
    nodeType: ({ id }) => NODE_STORE_SELECTORS.type({ id }),
    status: NODE_STORE_SELECTORS.status,
    roomOccupants: ({ rooms }) =>
      NODE_STORE_SELECTORS.participants({ id: first(rooms) }),
    tourName: ({ templateId }) =>
      NODE_STORE_SELECTORS.content({ id: templateId }),
  },
};

export const CONFIG_3 = {
  value: {
    participantEmail: ({ personId }) =>
      PERSON_STORE_SELECTORS.email({ id: personId }),
    travelWith: ({ groups }) =>
      NODE_STORE_SELECTORS.participants({ id: first(groups) }),
    travelWithContent: ({ groups }) =>
      NODE_STORE_SELECTORS.content({ id: first(groups) }),
  },
  setValue: {
    participantViewOpen:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT.VIEW.open,
    participantViewId:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT.VIEW.id,
    participantViewMode:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT.VIEW.mode,
    selectedFollowerId:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.FOLLOWER_SELECTORS
        .selectedFollowerId,
    linkedUserEmail: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.LINKED_USER.email,
    linkedUserId: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.LINKED_USER.id,
    linkedUserToken: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.LINKED_USER.token,
    seeDetail: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'seeDetail'],
    interestedPersonCreateOpen:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.INTERESTED_PERSON.CREATE.open,
    interestedPersonCreateParticipantId:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.INTERESTED_PERSON.CREATE
        .participantId,
  },
};
