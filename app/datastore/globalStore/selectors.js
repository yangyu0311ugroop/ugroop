import { createSelector } from 'reselect';
import { GLOBAL_STORE } from '../../appConstants';

const selectGlobal = state => state.get(GLOBAL_STORE);
const makeSelectLoginStatus = () =>
  createSelector(
    selectGlobal,
    globalState => globalState && globalState.userAction,
  );

export { selectGlobal, makeSelectLoginStatus };
