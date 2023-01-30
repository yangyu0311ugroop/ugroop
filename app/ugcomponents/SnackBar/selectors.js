/**
 * Created by paulcedrick on 7/11/17.
 */
import { createSelector } from 'reselect';
import {
  UGSNACKBAR_STATE_NAME,
  STATE_IS_REVEALED,
  STATE_SNACKBAR_TEXT,
  STATE_SNACKBAR_FADEOUT_TIME,
} from './constants';

export const getSnackbarState = state => state.get(UGSNACKBAR_STATE_NAME);

export const getSnackbarIsRevealed = createSelector(
  [getSnackbarState],
  state => state.get(STATE_IS_REVEALED),
);

export const getSnackbarText = createSelector(
  [getSnackbarState],
  state => state.get(STATE_SNACKBAR_TEXT),
);

export const getSnackbarFadeoutTime = createSelector(
  [getSnackbarState],
  state => state.get(STATE_SNACKBAR_FADEOUT_TIME),
);
