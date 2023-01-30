import { INVITATION_STORE_SELECTORS } from 'datastore/invitationStore/selectors';

// TODO: Start selecting from a well-maintained id array in template.calculated.userNodeIds

export const CONFIG_1 = ({ outputProp }) => ({
  value: {
    [outputProp]: INVITATION_STORE_SELECTORS.userNodeIds,
  },
});

export const CONFIG_2 = ({ outputProp, userIds }) => ({
  value: {
    [outputProp]: INVITATION_STORE_SELECTORS.filterUserNodesByUserId({
      ids: outputProp,
      userIds,
    }),
  },
});

export const CONFIG_3 = ({ outputProp, nodeIds }) => ({
  value: {
    [outputProp]: INVITATION_STORE_SELECTORS.filterUserNodesByNodeId({
      ids: outputProp,
      nodeIds,
    }),
  },
});

export const CONFIG_4 = ({ outputProp, roles }) => ({
  value: {
    [outputProp]: INVITATION_STORE_SELECTORS.filterUserNodesByRole({
      ids: outputProp,
      roles,
    }),
  },
});
