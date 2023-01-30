import { OPEN_STATE, TYPE_STATE, TEXT_STATE } from './config';
import { SNACKBAR_TYPE } from './constants';

export const openSnackbar = (message, type, resaga) => {
  resaga.setValue({
    [TYPE_STATE]: type,
    [TEXT_STATE]: message,
    [OPEN_STATE]: true,
  });
};

const openSuccessSnackbar = (message, resaga) => {
  openSnackbar(message, SNACKBAR_TYPE.SUCCESS, resaga);
};

const openErrorSnackbar = (message, resaga) => {
  openSnackbar(message, SNACKBAR_TYPE.CRITICAL, resaga);
};

const openInfoSnackbar = (message, resaga) => {
  openSnackbar(message, SNACKBAR_TYPE.INFO, resaga);
};

export const SNACKBAR_HELPER = {
  openErrorSnackbar,
  openSuccessSnackbar,
  openInfoSnackbar,
};

export default {
  openSuccessSnackbar,
  openErrorSnackbar,
  openInfoSnackbar,
};
