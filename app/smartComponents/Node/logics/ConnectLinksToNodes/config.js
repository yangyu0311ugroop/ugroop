import {
  LINK_STORE_SELECTORS,
  NODE_STORE_SELECTORS,
} from 'datastore/nodeStore/selectors';
import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';

export const GET_USER_NODE = {
  value: {
    userNode: LINK_STORE_SELECTORS.userNode,
  },
};

export const GET_USER_NODE_CONTENT = {
  value: {
    content: ({ userNode }) =>
      NODE_STORE_SELECTORS.content({ id: userNode[0] }),
  },
};

export const CONFIG = {
  value: {
    knownAs: ({ content }) => USER_STORE_SELECTORS.knownAs({ id: content }),
  },
  setValue: {},
};
