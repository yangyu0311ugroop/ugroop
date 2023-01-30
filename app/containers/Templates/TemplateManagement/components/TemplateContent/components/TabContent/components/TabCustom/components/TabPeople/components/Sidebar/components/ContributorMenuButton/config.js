import { TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS } from 'datastore/templateManagementStore/selectors';

export const CONFIG = {
  value: {
    peopleView: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.peopleView,
    peopleFilterSelected:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.peopleFilterSelected,
  },
  setValue: {
    peopleView: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.peopleView,
    peopleFilterSelected:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.peopleFilterSelected,
    peopleTabOptionSelected:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.peopleTabOptionSelected,
  },
};
