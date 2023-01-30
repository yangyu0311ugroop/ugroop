import {
  TEMPLATE_MANAGEMENT_STORE_SELECTORS,
  TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS,
} from 'datastore/templateManagementStore/selectors';
import {
  NODE_STORE_SELECTORS,
  NODE_VIEW_STORE_SELECTORS,
} from 'datastore/nodeStore/selectors';

export const CONFIG = {
  value: {
    templateId: TEMPLATE_MANAGEMENT_STORE_SELECTORS.templateId,
    shareListFilter: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.shareListFilter,
    peopleView: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.peopleView,
    editable: NODE_VIEW_STORE_SELECTORS.editable,
    peopleFilterSelected:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.peopleFilterSelected,
  },
};

export const CONFIG1 = {
  value: {
    orgId: ({ templateId }) =>
      NODE_STORE_SELECTORS.organisationId({ id: templateId }),
    tourCreatedBy: ({ templateId }) =>
      NODE_STORE_SELECTORS.createdBy({ id: templateId }),
  },
  setValue: {
    shareListFilter: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.shareListFilter,
    peopleFilterSelected:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.peopleFilterSelected,
    peopleTabOptionSelected:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.peopleTabOptionSelected,
    peopleView: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.peopleView,
  },
};
