import { TEMPLATE_MANAGEMENT_STORE_SELECTORS as TEMPLATE_SELECTORS } from 'datastore/templateManagementStore/selectors';
import { GET_PUB_TEMPLATE_HEADER, PUB_API } from 'apis/constants';
import { TEMPLATE_MANAGEMENT_DATASTORE } from 'appConstants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const CONFIG = {
  value: {
    templateId: TEMPLATE_SELECTORS.templateId,
    tabId: TEMPLATE_SELECTORS.tabId,
  },

  isLoading: {
    isFetchingTemplate: [PUB_API, GET_PUB_TEMPLATE_HEADER],
  },
};

export const CONFIG2 = {
  value: {
    disableRYI: ({ templateId }) =>
      NODE_STORE_SELECTORS.disableRYI({ id: templateId }),
  },
  // new config, to remotely setValue to a redux store
  setValue: {
    tabId: [TEMPLATE_MANAGEMENT_DATASTORE, 'tabId'],
  },
};
