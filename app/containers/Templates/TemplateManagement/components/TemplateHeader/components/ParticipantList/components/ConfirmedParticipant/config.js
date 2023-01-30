import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import first from 'lodash/first';
import { INVITATION_STORE_SELECTORS } from 'datastore/invitationStore/selectors';

export const CONFIG_1 = {
  value: {
    nodeId: ({ userNodeIds }) =>
      INVITATION_STORE_SELECTORS.userNodeNodeId({ id: first(userNodeIds) }),
  },
};

export const CONFIG_2 = {
  value: {
    nodeId: {
      keyPath: ({ nodeId: id }) => NODE_STORE_SELECTORS.status({ id }),
      props: ({ nodeId }) => nodeId,
      getter: (status, nodeId) => nodeId,
    },
  },
};
