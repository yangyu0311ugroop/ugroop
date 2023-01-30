import { INSERT_AFTER, INSERT_BEFORE, NODE_API } from 'apis/constants';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const CONFIG = {
  value: {
    insertBeforeType: ({ insertBefore }) =>
      NODE_STORE_SELECTORS.type({ id: insertBefore }),
    insertAfterType: ({ insertAfter }) =>
      NODE_STORE_SELECTORS.type({ id: insertAfter }),
    firstChild: ({ parentId }) =>
      NODE_STORE_SELECTORS.child(0)({ id: parentId }),
    startDate: NODE_STORE_SELECTORS.startDate,
    displayDate: NODE_STORE_SELECTORS.displayDate,
    weekDay: NODE_STORE_SELECTORS.weekDay,
  },
  setValue: {
    ...PORTAL_HELPERS.setValue,
  },
  isLoading: {
    isInsertAfterLoading: [NODE_API, INSERT_AFTER],
    isInsertBeforeLoading: [NODE_API, INSERT_BEFORE],
  },
};
