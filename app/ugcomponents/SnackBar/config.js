export const SNACKBAR_VIEWSTORE = 'snackbarViewStore';

export const TEXT_STATE = 'text';
export const OPEN_STATE = 'open';
export const TYPE_STATE = 'type';

export const INIT_STATE = {
  [OPEN_STATE]: false,
};

export const SET_VALUE = {
  [TEXT_STATE]: [SNACKBAR_VIEWSTORE, TEXT_STATE],
  [OPEN_STATE]: [SNACKBAR_VIEWSTORE, OPEN_STATE],
  [TYPE_STATE]: [SNACKBAR_VIEWSTORE, TYPE_STATE],
};

export const SNACKBAR_SET_VALUE = SET_VALUE;

export const GET_VALUE = {
  [TEXT_STATE]: [SNACKBAR_VIEWSTORE, TEXT_STATE],
  [OPEN_STATE]: [SNACKBAR_VIEWSTORE, OPEN_STATE],
  [TYPE_STATE]: [SNACKBAR_VIEWSTORE, TYPE_STATE],
};

export const CONFIG = {
  value: GET_VALUE,
  setValue: SET_VALUE,
};
