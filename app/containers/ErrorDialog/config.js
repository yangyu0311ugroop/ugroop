import { GLOBAL_STORE } from 'appConstants';

export const config = {
  value: {
    showErrorDialog: [GLOBAL_STORE, 'showErrorDialog'],
    errorMsg: [GLOBAL_STORE, 'error'],
  },
};
