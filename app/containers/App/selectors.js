import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.global || initialState;

export const userActionSelect = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.userAction,
  );
