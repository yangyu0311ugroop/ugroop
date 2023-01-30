import {
  TEMPLATE_MANAGEMENT_STORE_SELECTORS,
  TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS,
} from 'datastore/templateManagementStore/selectors';

export const CONFIG_0 = {
  value: {
    templateId: TEMPLATE_MANAGEMENT_STORE_SELECTORS.templateId,
  },
};

export const CONFIG = {
  value: {
    shareListFilter: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.shareListFilter,
    peopleView: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.peopleView,
    participantsCount:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.participantsCount,
    peopleFilterSelected:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.peopleFilterSelected,
    paxLabel: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.paxLabel,
  },
  setValue: {
    shareListFilter: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.shareListFilter,
    peopleView: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.peopleView,
    peopleFilterSelected:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.peopleFilterSelected,
    peopleTabOptionSelected:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.peopleTabOptionSelected,
  },
};
