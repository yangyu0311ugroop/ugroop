import {
  TEMPLATE_MANAGEMENT_STORE_SELECTORS,
  TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS,
} from 'datastore/templateManagementStore/selectors';

export const CONFIG = {
  value: {
    templateId: TEMPLATE_MANAGEMENT_STORE_SELECTORS.templateId,
    shareListFilter: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.shareListFilter,
    peopleView: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.peopleView,
    peopleFilterSelected:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.peopleFilterSelected,
  },
};

export const SET_VALUE = {
  setValue: {
    shareListFilter: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.shareListFilter,
    peopleView: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.peopleView,
    peopleFilterSelected:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.peopleFilterSelected,
    peopleTabOptionSelected:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.peopleTabOptionSelected,
  },
};
