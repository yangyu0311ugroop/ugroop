import { COGNITO_STORE_SELECTORS } from 'datastore/stormPathStore/selectors';
import { INTERESTED_PERSON_STATUSES } from 'utils/constants/nodes';
import { INVITATION_STORE_SELECTORS } from 'datastore/invitationStore/selectors';
import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS } from 'datastore/templateManagementStore/selectors';
import { TEMPLATE_MANAGEMENT_VIEWSTORE } from 'appConstants';
import get from 'lodash/get';

export const CONFIG = {
  value: {
    createdBy: ({ id }) =>
      NODE_STORE_SELECTORS.nodeProp({ id, path: NODE_PATHS.createdBy }),
    layout: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.INTERESTED_LIST.LAYOUT.list,
    personEmail: ({ id }) =>
      NODE_STORE_SELECTORS.nodeProp({ id, path: NODE_PATHS.email }),
    myId: COGNITO_STORE_SELECTORS.myId,
    tourName: ({ templateId }) =>
      NODE_STORE_SELECTORS.content({ id: templateId }),
  },
};

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
  },
});

export const CONFIG_2 = () => ({
  value: {
    interestedPersonIds: NODE_STORE_SELECTORS.filterByStatuses({
      ids: 'interestedPersonIds',
      statuses: 'statuses',
    }),
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
    seeDetail: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'seeDetail'],
  },
});
