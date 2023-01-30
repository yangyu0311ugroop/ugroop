/**
 * Created by quando on 18/8/17.
 */
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { revealSnackbar } from 'ugcomponents/SnackBar/actions';

export const snackbar = { reveal: revealSnackbar };

export const CONFIG = {
  value: {
    layout: NODE_STORE_SELECTORS.calculatedLayout,
    visibleChildren: NODE_STORE_SELECTORS.calculatedVisibleChildren,
    hiddenIds: NODE_STORE_SELECTORS.calculatedHiddenIds,
    privateIds: NODE_STORE_SELECTORS.calculatedPrivateIds,
    peopleTabId: NODE_STORE_SELECTORS.calculatedPeopleTabId,
  },
  setValue: {
    layout: NODE_STORE_SELECTORS.calculatedLayout,
  },
};
