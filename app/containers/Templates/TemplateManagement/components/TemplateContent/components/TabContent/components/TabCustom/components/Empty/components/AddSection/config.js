import { TEMPLATE_MANAGEMENT_VIEWSTORE, NODE_STORE } from 'appConstants';
import { NODE_API, CREATE_CHILD } from 'apis/constants';

export const CONFIG = {
  value: {},

  isLoading: {
    isCreatingChild: [NODE_API, CREATE_CHILD],
  },

  setValue: {
    tabs: [NODE_STORE, 'nodes'],
    sections: [NODE_STORE, 'nodes'],
    editSections: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'editSections'],
  },
};
