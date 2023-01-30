import { PARTICIPANT_STATUSES } from 'utils/constants/nodes';
import {
  NODE_STORE_SELECTORS,
  NODE_VIEW_STORE_SELECTORS,
} from 'datastore/nodeStore/selectors';
import { COGNITO_STORE_SELECTORS } from 'datastore/stormPathStore/selectors';
import { TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS } from 'datastore/templateManagementStore/selectors';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';

export const CONFIG_1 = () => ({
  value: {
    myId: COGNITO_STORE_SELECTORS.myId,
    participantIds: RESAGA_HELPERS.mapToId(
      NODE_STORE_SELECTORS.calculatedParticipants,
      'templateId',
    ),
    peopleTabId: RESAGA_HELPERS.mapToId(
      NODE_STORE_SELECTORS.calculatedPeopleTabId,
      'templateId',
    ),
  },
});

export const CONFIG_2 = () => ({
  value: {
    people: NODE_STORE_SELECTORS.filterByStatuses({
      ids: 'participantIds',
      statuses: [PARTICIPANT_STATUSES.confirmed],
    }),
    pendingIds: NODE_STORE_SELECTORS.filterByStatuses({
      ids: 'participantIds',
      statuses: [PARTICIPANT_STATUSES.pending],
    }),
    declinedIds: NODE_STORE_SELECTORS.filterByStatuses({
      ids: 'participantIds',
      statuses: [PARTICIPANT_STATUSES.declined],
    }),
    participantListViewOpen:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT_LIST.open,
    participantCreateOpen:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT.CREATE.open,
    participantCreateParentNodeId:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT.CREATE.parentNodeId,
    participantCreateMode:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT.CREATE.mode,
    participantViewOpen:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT.VIEW.open,
    participantViewId:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT.VIEW.id,
    participantViewMode:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT.VIEW.mode,
    participantViewModeFilter:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT.VIEW.filter,
    participantViewModeModalFilter:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT.VIEW.modal,
    editable: NODE_VIEW_STORE_SELECTORS.editable,
    peopleTabIndex: {
      keyPath: ({ templateId }) =>
        NODE_STORE_SELECTORS.calculatedVisibleChildren({ id: templateId }),
      cacheKey: ({ templateId }) => `node.${templateId}.peopleTabIdIndex`,
      props: ({ peopleTabId }) => peopleTabId,
      getter: (calculatedVisibleChildren = [], peopleTabId) =>
        calculatedVisibleChildren.indexOf(peopleTabId),
    },
  },
  setValue: {
    participantListViewOpen:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT_LIST.open,
    participantListViewModeList:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT_LIST.MODE.list,
    participantCreateOpen:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT.CREATE.open,
    participantViewOpen:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT.VIEW.open,
    participantViewModeFilter:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT.VIEW.filter,
    participantViewModeModalFilter:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT.VIEW.modal,
    peopleView: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.peopleView,
    participantsCount:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.participantsCount,
  },
});
