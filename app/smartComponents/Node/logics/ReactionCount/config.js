import {
  LINK_STORE_SELECTORS,
  NODE_STORE_SELECTORS,
} from 'datastore/nodeStore/selectors';
import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';
import union from 'lodash/union';

export const CONFIG = {
  value: {
    reactions: NODE_STORE_SELECTORS.reactions,
    userNodeId: USER_STORE_SELECTORS.userNodeId(),
  },
  setValue: {},
};

export const GET_LINKS_USERNODE = {
  value: {
    links: {
      keyPath: ({ reactions = [] }) =>
        reactions.map(reactionId =>
          LINK_STORE_SELECTORS.userNode({ id: reactionId }),
        ),
      cacheKey: ({ reactions = [], userId }) =>
        `node.reactionCount.${userId}.links.${reactions.toString()}`,
      props: null,
      getter: (...rest) => union(...rest),
    },
  },
};

export const CHECK_USER_REACTION = {
  value: {
    userReactionId: {
      cacheKey: ({ reactions = [], userNodeId }) =>
        `node.reactionCount.${userNodeId}.reactionUserId.${reactions.toString()}`,
      props: [
        ({ userNodeId }) => userNodeId,
        ({ reactions }) => reactions,
        ({ links }) => links,
      ],
      getter: ({ links, reactions, userNodeId }) => {
        const index = links.indexOf(userNodeId);

        return index === -1 ? 0 : reactions[index];
      },
    },
  },
};
