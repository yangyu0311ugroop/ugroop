import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { TEMPLATE_MANAGEMENT_STORE_SELECTORS } from 'datastore/templateManagementStore/selectors';

export const CONFIG = {
  value: {
    templateId: TEMPLATE_MANAGEMENT_STORE_SELECTORS.templateId,
  },
  setValue: {
    oldFollowerId: ({ participantId: id }) =>
      NODE_STORE_SELECTORS.oldFollowerProp(['id'])({ id }),
    participants: ({ id }) => NODE_STORE_SELECTORS.participants({ id }),
  },
};
