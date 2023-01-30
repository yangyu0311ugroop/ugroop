import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import {
  TEMPLATE_MANAGEMENT_STORE_SELECTORS,
  TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS,
} from 'datastore/templateManagementStore/selectors';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';

export const CONFIG_0 = {
  value: {
    templateId: TEMPLATE_MANAGEMENT_STORE_SELECTORS.templateId,
  },
};

export const CONFIG_1 = {
  value: {
    peopleTabId: RESAGA_HELPERS.mapToId(
      NODE_STORE_SELECTORS.calculatedPeopleTabId,
      'templateId',
    ),
    calculatedVisibleChildren: RESAGA_HELPERS.mapToId(
      NODE_STORE_SELECTORS.calculatedVisibleChildren,
      'templateId',
    ),
    nodeChildren: RESAGA_HELPERS.mapToId(
      NODE_STORE_SELECTORS.children,
      'templateId',
    ),
  },
};

export const CONFIG_2 = {
  value: {
    peopleTabIndex: {
      keyPath: ({ templateId }) =>
        NODE_STORE_SELECTORS.calculatedVisibleChildren({ id: templateId }),
      cacheKey: ({ templateId }) => `node.${templateId}.peopleTabIdIndex`,
      props: ({ peopleTabId }) => peopleTabId,
      getter: (nodeChildren, peopleTabId) => nodeChildren.indexOf(peopleTabId),
    },
  },
  setValue: {
    calculatedVisibleChildren: RESAGA_HELPERS.mapToId(
      NODE_STORE_SELECTORS.calculatedVisibleChildren,
      'templateId',
    ),
    calculatedPeopleTab: RESAGA_HELPERS.mapToId(
      NODE_STORE_SELECTORS.calculatedPeopleTabId,
      'templateId',
    ),
    peopleView: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.peopleView,
    participantViewFilter:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT.VIEW.modal,
    peopleTabOptionSelected:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.peopleTabOptionSelected,
    peopleFilterSelected:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.peopleFilterSelected,
    interestedListViewModalFilter:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.INTERESTED_LIST.FILTER.modal,
  },
};
