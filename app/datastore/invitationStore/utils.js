import { SELECTOR_HELPERS } from 'utils/helpers/selectors';

const filterSharesByShareToUserIdReducer =
  SELECTOR_HELPERS.filterIncludesReducer;

const filterSharesByNodeIdReducer = SELECTOR_HELPERS.filterIncludesReducer;

const filterSharesByRolesReducer = SELECTOR_HELPERS.filterIncludesReducer;

const filterSharesByStatusesReducer = SELECTOR_HELPERS.filterIncludesReducer;

const filterShareSubNodesByNodeIdReducer =
  SELECTOR_HELPERS.filterIncludesReducer;

const filterShareSubNodesByRolesReducer =
  SELECTOR_HELPERS.filterIncludesReducer;

const filterUserNodesByUserIdReducer = SELECTOR_HELPERS.filterIncludesReducer;

const filterUserNodesByNodeIdReducer = SELECTOR_HELPERS.filterIncludesReducer;

const filterUserNodesByRolesReducer = SELECTOR_HELPERS.filterIncludesReducer;

export const INVITATION_STORE_UTILS = {
  filterSharesByShareToUserIdReducer,
  filterSharesByNodeIdReducer,
  filterSharesByRolesReducer,
  filterSharesByStatusesReducer,

  filterShareSubNodesByNodeIdReducer,
  filterShareSubNodesByRolesReducer,

  filterUserNodesByUserIdReducer,
  filterUserNodesByNodeIdReducer,
  filterUserNodesByRolesReducer,
};
