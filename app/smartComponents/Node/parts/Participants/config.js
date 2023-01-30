import { GET_PARTICIPANTS, TEMPLATE_API } from 'apis/constants';
import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS } from 'datastore/templateManagementStore/selectors';
import dropRight from 'lodash/dropRight';

export const GET_LINKS = {
  value: {
    links: ({ id }) =>
      NODE_STORE_SELECTORS.nodeProp({ id, path: NODE_PATHS.participantLinks }),
  },
};

export const CONFIG = {
  value: {
    value: ({ id }) =>
      NODE_STORE_SELECTORS.nodeProp({ id, path: NODE_PATHS.participants }),
    status: ({ id }) =>
      NODE_STORE_SELECTORS.nodeProp({ id, path: NODE_PATHS.status }),
    prevNodeIds: {
      keyPath: ({ links = [] }) =>
        links.map(link =>
          NODE_STORE_SELECTORS.linkProp(['prevNodeId'])({ id: link }),
        ),
      cacheKey: ({ links }) =>
        `Participants.links.${links ? links.toString() : 'null'}.prevNodeIds`,
      props: () => null,
      getter: (...args) => {
        const prevNodeIds = dropRight(args);
        const filtered = prevNodeIds.filter(prevNodeId => prevNodeId > 0);
        return filtered;
      },
    },
    paxLabel: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.paxLabel,
  },
  setValue: {
    participantCreateOpen:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT.CREATE.open,
    participantCreateParentNodeId:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT.CREATE.parentNodeId,
    participantCreateMode:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT.CREATE.mode,
    participantWithRelationship:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT.CREATE
        .withRelationship,
  },
  isLoading: {
    loading: [TEMPLATE_API, GET_PARTICIPANTS],
  },
};
