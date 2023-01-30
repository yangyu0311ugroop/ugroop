import { INVITATION_STORE_SELECTORS } from 'datastore/invitationStore/selectors';

// TODO: Start selecting from a well-maintained id array in template.calculated.shareIds

export const CONFIG_1 = ({ outputProp }) => ({
  value: {
    [outputProp]: INVITATION_STORE_SELECTORS.shareIds,
  },
});

export const CONFIG_2 = ({ outputProp, shareToUserIds }) => ({
  value: {
    [outputProp]: INVITATION_STORE_SELECTORS.filterSharesByShareToUserId({
      ids: outputProp,
      shareToUserIds,
    }),
  },
});

export const CONFIG_3 = ({ outputProp, nodeIds }) => ({
  value: {
    [outputProp]: INVITATION_STORE_SELECTORS.filterSharesByNodeId({
      ids: outputProp,
      nodeIds,
    }),
  },
});

export const CONFIG_4 = ({ outputProp }) => ({
  value: {
    [outputProp]: INVITATION_STORE_SELECTORS.filterSharesByRole({
      ids: outputProp,
    }),
  },
});

export const CONFIG_5 = ({ outputProp }) => ({
  value: {
    [outputProp]: INVITATION_STORE_SELECTORS.filterSharesByStatus({
      ids: outputProp,
    }),
  },
});
