import { CREATE_CHILD, CREATE_NEXT_NODE, NODE_API } from 'apis/constants';
import { TEMPLATE_MANAGEMENT_VIEWSTORE } from 'appConstants';

export const CONFIG = {
  value: {},
  setValue: {
    editingCheckItem: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'editingCheckItem'],
  },

  isLoading: {
    creatingChild: [NODE_API, CREATE_CHILD],
    creatingNext: [NODE_API, CREATE_NEXT_NODE],
  },
};
