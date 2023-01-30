/**
 * Created by paulcedrick on 7/11/17.
 */
import { REVEAL_SNACKBAR, HIDE_SNACKBAR, RESET_SNACKBAR } from './constants';

export const revealSnackbar = data => ({
  type: REVEAL_SNACKBAR,
  data,
});

export const hideSnackbar = () => ({
  type: HIDE_SNACKBAR,
});

export const resetSnackbar = () => ({
  type: RESET_SNACKBAR,
});
