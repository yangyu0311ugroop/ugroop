/**
 * Created by paulcedrick on 7/11/17.
 */
import { fromJS, Map } from 'immutable';
import {
  REVEAL_SNACKBAR,
  HIDE_SNACKBAR,
  RESET_SNACKBAR,
  UGSNACKBAR_DEFAULT_TIME,
  STATE_IS_REVEALED,
  STATE_SNACKBAR_TEXT,
  STATE_SNACKBAR_FADEOUT_TIME,
} from './constants';

export const initialState = fromJS({
  [STATE_IS_REVEALED]: false,
  [STATE_SNACKBAR_TEXT]: '',
  [STATE_SNACKBAR_FADEOUT_TIME]: UGSNACKBAR_DEFAULT_TIME,
});

const reducer = (state = initialState, actions) => {
  switch (actions.type) {
    case REVEAL_SNACKBAR:
      return state.merge(
        Map({
          [STATE_IS_REVEALED]: true,
          [STATE_SNACKBAR_TEXT]: actions.data.text,
          [STATE_SNACKBAR_FADEOUT_TIME]:
            actions.data.fadeoutTime || UGSNACKBAR_DEFAULT_TIME,
        }),
      );

    case HIDE_SNACKBAR:
      return state.merge(
        Map({
          [STATE_IS_REVEALED]: false,
        }),
      );
    case RESET_SNACKBAR:
      return state.merge(
        Map({
          [STATE_IS_REVEALED]: false,
          [STATE_SNACKBAR_TEXT]: '',
          [STATE_SNACKBAR_FADEOUT_TIME]: UGSNACKBAR_DEFAULT_TIME,
        }),
      );
    default:
      return state;
  }
};

export default reducer;
