import { INTERESTED_PERSON_STATUSES } from 'utils/constants/nodes';
import { INVITATION_STORE_SELECTORS } from 'datastore/invitationStore/selectors';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS } from 'datastore/templateManagementStore/selectors';
import get from 'lodash/get';
import { PENDING } from 'appConstants';
import { TOUR_ROLE } from 'apis/components/Ability/roles';

export const CONFIG_0 = () => ({
  value: {
    userNodes: INVITATION_STORE_SELECTORS.userNodes,
    shareIds: INVITATION_STORE_SELECTORS.shareIds,
  },
});

export const CONFIG_1 = () => ({
  value: {
    modeList: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.INTERESTED_LIST.MODE.list,
    modeValue:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.INTERESTED_LIST.MODE.value,
    layout: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.INTERESTED_LIST.LAYOUT.list,
    layoutValue:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.INTERESTED_LIST.LAYOUT.value,
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
      getter: (complete, pending) => {
        const statuses = [];
        if (complete) statuses.push(INTERESTED_PERSON_STATUSES.complete);
        if (pending) statuses.push(INTERESTED_PERSON_STATUSES.pending);
        return {
          statuses,
        };
      },
      spreadObject: true,
    },
    shareTokens: {
      keyPath: ({ shareIds = [] }) =>
        shareIds.map(id => [...INVITATION_STORE_SELECTORS.shares, id]),
      cacheKey: ({ shareIds = [] }) =>
        `getInteresetedShareTokens.${shareIds.toString()}.interestedPendingShareTokens`,
      props: ({ templateId }) => templateId,
      getter: (...values) => {
        const nodeId = values.pop();
        return values
          .filter(
            (share = {}) =>
              share.status === PENDING &&
              share.nodeId === nodeId &&
              share.role === TOUR_ROLE.TOUR_INTERESTED,
          )
          .map(({ notificationToken }) => notificationToken);
      },
    },
  },
});

export const CONFIG_2 = () => ({
  value: {
    completeInterestedPersonIds: NODE_STORE_SELECTORS.filterByStatuses({
      ids: 'interestedPersonIds',
      statuses: [INTERESTED_PERSON_STATUSES.complete],
    }),
    pendingInterestedPersonIds: NODE_STORE_SELECTORS.filterByStatuses({
      ids: 'interestedPersonIds',
      statuses: [INTERESTED_PERSON_STATUSES.pending],
    }),
  },
});

export const CONFIG_3 = () => ({
  value: {
    interestedPersonIds: NODE_STORE_SELECTORS.sortByProp({
      ids: 'interestedPersonIds',
    }),
    interestedListViewModalFilter:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.INTERESTED_LIST.FILTER.modal,
    peopleTabOptionSelected:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.peopleTabOptionSelected,
  },
});

export const CONFIG_4 = () => ({
  value: {
    connectedNodeIds: {
      getter: ({ interestedPersonIds = [], userNodes = {} }) =>
        Object.values(userNodes).filter(i =>
          interestedPersonIds.includes(get(i, 'nodeId', '')),
        ),
    },
  },
  setValue: {
    modeList: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.INTERESTED_LIST.MODE.list,
    layout: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.INTERESTED_LIST.LAYOUT.list,
    interestedPersonCreateOpen:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.INTERESTED_PERSON.CREATE.open,
    interestedPersonViewOpen:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.INTERESTED_PERSON.VIEW.open,
    interestedPersonViewId:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.INTERESTED_PERSON.VIEW.id,
    interestedPersonViewMode:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.INTERESTED_PERSON.VIEW.mode,
    interestedListViewModalFilter:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.INTERESTED_LIST.FILTER.modal,
    peopleTabOptionSelected:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.peopleTabOptionSelected,
    peopleFilterSelected:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.peopleFilterSelected,
  },
});
