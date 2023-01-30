import { INTERESTED_PERSON_STATUSES } from 'utils/constants/nodes';
import {
  NODE_STORE_SELECTORS,
  NODE_VIEW_STORE_SELECTORS,
} from 'datastore/nodeStore/selectors';
import { TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS } from 'datastore/templateManagementStore/selectors';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';

export const CONFIG_1 = () => ({
  value: {
    people: NODE_STORE_SELECTORS.filterByStatuses({
      ids: 'interestedPersonIds',
      statuses: [INTERESTED_PERSON_STATUSES.pending],
    }),
    peopleTabId: RESAGA_HELPERS.mapToId(
      NODE_STORE_SELECTORS.calculatedPeopleTabId,
      'templateId',
    ),
  },
});

export const CONFIG_2 = () => ({
  value: {
    peopleTabIndex: {
      keyPath: ({ templateId }) =>
        NODE_STORE_SELECTORS.calculatedVisibleChildren({ id: templateId }),
      cacheKey: ({ templateId }) => `node.${templateId}.peopleTabIdIndex`,
      props: ({ peopleTabId }) => peopleTabId,
      getter: (calculatedVisibleChildren, peopleTabId) =>
        calculatedVisibleChildren.indexOf(peopleTabId),
    },
    people: NODE_STORE_SELECTORS.sortByProp({
      ids: 'people',
    }),
    complete: NODE_STORE_SELECTORS.filterByStatuses({
      ids: 'interestedPersonIds',
      statuses: [INTERESTED_PERSON_STATUSES.complete],
    }),
    pending: NODE_STORE_SELECTORS.filterByStatuses({
      ids: 'interestedPersonIds',
      statuses: [INTERESTED_PERSON_STATUSES.pending],
    }),
    interestedListViewOpen:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.INTERESTED_LIST.open,
    interestedPersonCreateOpen:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.INTERESTED_PERSON.CREATE.open,
    interestedPersonViewOpen:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.INTERESTED_PERSON.VIEW.open,
    interestedPersonViewId:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.INTERESTED_PERSON.VIEW.id,
    interestedPersonViewMode:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.INTERESTED_PERSON.VIEW.mode,
    editable: NODE_VIEW_STORE_SELECTORS.editable,
    interestedListViewFilter:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.INTERESTED_LIST.FILTER.view,
  },
  setValue: {
    interestedListViewOpen:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.INTERESTED_LIST.open,
    interestedPersonCreateOpen:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.INTERESTED_PERSON.CREATE.open,
    interestedPersonViewOpen:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.INTERESTED_PERSON.VIEW.open,
    interestedListViewFilter:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.INTERESTED_LIST.FILTER.view,
    interestedListViewModalFilter:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.INTERESTED_LIST.FILTER.modal,
    peopleView: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.peopleView,
  },
});
