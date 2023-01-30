import {
  LINK_STORE_SELECTORS,
  NODE_STORE_SELECTORS,
} from 'datastore/nodeStore/selectors';
import { TEMPLATE_MANAGEMENT_STORE_SELECTORS } from 'datastore/templateManagementStore/selectors';

export const GET_USER_NODE = {
  value: {
    userNode: LINK_STORE_SELECTORS.userNode,
  },
};

export const GET_USER_NODE_CONTENT = {
  value: {
    userId: {
      keyPath: ({ userNode = [] }) =>
        NODE_STORE_SELECTORS.content({ id: userNode[0] }),
      cacheKey: ({ userNode = [] }) =>
        `reactionItem.${userNode.toString()}.userNode`,
      props: () => null,
      getter: content => Number(content),
    },
  },
};

export const CONFIG = {
  value: {
    templateId: TEMPLATE_MANAGEMENT_STORE_SELECTORS.templateId,
  },
  setValue: {},
};
