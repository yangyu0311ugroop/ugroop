import { INTERESTED_PERSON_STATUSES } from 'utils/constants/nodes';
import { INVITATION_STORE_SELECTORS } from 'datastore/invitationStore/selectors';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS } from 'datastore/templateManagementStore/selectors';
import get from 'lodash/get';

export const CONFIG_0 = () => ({
  value: {
    interestedPersonIds: ({ templateId: id }) =>
      NODE_STORE_SELECTORS.interestedPeople({ id }),
    userNodes: INVITATION_STORE_SELECTORS.userNodes,
  },
});

export const CONFIG_1 = () => ({
  value: {
    connectedNodeIds: {
      getter: ({ interestedPersonIds = [], userNodes = {} }) =>
        Object.values(userNodes).filter(i =>
          interestedPersonIds.includes(get(i, 'nodeId', '')),
        ),
    },
    statuses: {
      keyPath: [
        TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.INTERESTED_LIST.FILTER.complete,
        TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.INTERESTED_LIST.FILTER.pending,
      ],
      cacheKey: ({ interestedPersonIds }) => {
        const ids = interestedPersonIds
          ? interestedPersonIds.toString()
          : 'null';
        return `containers.templates.modals.interestedPersonList.statuses.${ids}`;
      },
      props: ({ interestedPersonIds }) => interestedPersonIds,
      getter: (complete, pending, interestedPersonIds = []) => {
        const statuses = [];
        if (complete) statuses.push(INTERESTED_PERSON_STATUSES.complete);
        if (pending) statuses.push(INTERESTED_PERSON_STATUSES.pending);
        return {
          statuses,
          filterComplete: complete,
          filterPending: pending,
          hasInterestedPersonIds: !!interestedPersonIds.length,
        };
      },
      spreadObject: true,
    },
  },
});

export const CONFIG_2 = () => ({
  value: {
    interestedPersonIds: NODE_STORE_SELECTORS.filterByStatuses({
      ids: 'interestedPersonIds',
      statuses: 'statuses',
    }),
  },
});

export const CONFIG_3 = () => ({
  value: {
    interestedPersonIds: NODE_STORE_SELECTORS.sortByProp({
      ids: 'interestedPersonIds',
    }),
    unfilteredInterested: ({ templateId: id }) =>
      NODE_STORE_SELECTORS.interestedPeople({ id }),
  },
});
