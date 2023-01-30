import { INVITATION_STORE_SELECTORS } from 'datastore/invitationStore/selectors';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { COGNITO_STORE_SELECTORS } from 'datastore/stormPathStore/selectors';
import ARRAY_HELPERS from 'utils/helpers/arrays';

export const CONFIG = {
  value: {
    roles: {
      keyPath: ({ userNodeIds }) =>
        userNodeIds.map(id => INVITATION_STORE_SELECTORS.userNodeRole({ id })),
      cacheKey: ({ userNodeIds }) =>
        `Node.${userNodeIds ? JSON.stringify(userNodeIds) : 'null'}.NodeRole`,
      props: null,
      getter: (...roles) => ARRAY_HELPERS.uniq(roles),
    },
    myId: COGNITO_STORE_SELECTORS.myId,
    ownerId: ({ nodeId }) => NODE_STORE_SELECTORS.createdBy({ id: nodeId }),
  },
};
