import { INVITATION_STORE_SELECTORS } from 'datastore/invitationStore/selectors';

// TODO: Start selecting from a well-maintained id array in template.calculated.shareSubNodeIds

export const CONFIG_1 = ({ outputProp }) => ({
  value: {
    [outputProp]: INVITATION_STORE_SELECTORS.shareSubNodeIds,
  },
});

export const CONFIG_2 = ({ outputProp, nodeIds }) => ({
  value: {
    [outputProp]: INVITATION_STORE_SELECTORS.filterShareSubNodesByNodeId({
      ids: outputProp,
      nodeIds,
    }),
  },
});

export const CONFIG_3 = ({ outputProp, roles }) => ({
  value: {
    [outputProp]: INVITATION_STORE_SELECTORS.filterShareSubNodesByRole({
      ids: outputProp,
      roles,
    }),
  },
});

export const CONFIG_4 = ({ outputProp }) => ({
  value: {
    subNodeShareTokens: INVITATION_STORE_SELECTORS.shareSubNodeShareTokens({
      ids: outputProp,
    }),
  },
});

export const CONFIG_5 = ({ outputProp, shareStatuses }) => ({
  value: {
    [outputProp]: INVITATION_STORE_SELECTORS.filterSharesByStatus({
      ids: 'subNodeShareTokens',
      statuses: shareStatuses,
    }),
  },
});
