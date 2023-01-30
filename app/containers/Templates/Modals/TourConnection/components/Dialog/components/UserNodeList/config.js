import { TOUR_ROLE } from 'apis/components/Ability/roles';
import { INVITATION_STORE_SELECTORS } from 'datastore/invitationStore/selectors';
import { COGNITO_STORE_SELECTORS } from 'datastore/stormPathStore/selectors';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import first from 'lodash/first';
import {
  TEMPLATE_MANAGEMENT_STORE_SELECTORS,
  TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS,
} from '../../../../../../../../datastore/templateManagementStore/selectors';

export const CONFIG_1 = {
  value: {
    userId: RESAGA_HELPERS.subscribeIfNotGiven(
      INVITATION_STORE_SELECTORS.userNodeUserId,
      'userId',
    ),
    nodeId: RESAGA_HELPERS.subscribeIfNotGiven(
      INVITATION_STORE_SELECTORS.userNodeNodeId,
      'nodeId',
    ),
    myId: COGNITO_STORE_SELECTORS.myId,
    ownerId: RESAGA_HELPERS.mapToId(NODE_STORE_SELECTORS.createdBy, 'nodeId'),
    templateId: TEMPLATE_MANAGEMENT_STORE_SELECTORS.templateId,
  },
};

export const CONFIG_2 = {
  value: {
    contributorUserNodeIds: INVITATION_STORE_SELECTORS.filterUserNodesByRole({
      ids: 'userNodeIds',
      roles: [
        TOUR_ROLE.TOUR_ORGANIZER,
        TOUR_ROLE.TOUR_COLLABORATOR,
        TOUR_ROLE.TOUR_VIEWER,
      ],
    }),
    interestedUserNodeIds: INVITATION_STORE_SELECTORS.filterUserNodesByRole({
      ids: 'userNodeIds',
      roles: [TOUR_ROLE.TOUR_INTERESTED],
    }),
    participantUserNodeIds: INVITATION_STORE_SELECTORS.filterUserNodesByRole({
      ids: 'userNodeIds',
      roles: [TOUR_ROLE.TOUR_PARTICIPANT],
    }),
    paxLabel: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.paxLabel,
  },
};

export const CONFIG_3 = {
  value: {
    tourRole: ({ contributorUserNodeIds }) =>
      INVITATION_STORE_SELECTORS.userNodeProp({
        id: first(contributorUserNodeIds),
        path: 'role',
      }),
  },
};
