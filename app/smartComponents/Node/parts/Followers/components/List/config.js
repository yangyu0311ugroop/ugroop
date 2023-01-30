import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const CONFIG = {
  value: {
    followers: NODE_STORE_SELECTORS.followers,
    oldParentNodeId: NODE_STORE_SELECTORS.oldFollowerProp(['id']),
  },
};

export const CONFIG_1 = {
  value: {
    nextNodeIds: {
      keyPath: ({ followers = [] }) =>
        followers.map(followerId =>
          NODE_STORE_SELECTORS.linkProp(['nextNodeId'])({ id: followerId }),
        ),
      cacheKey: ({ followers = [] }) =>
        `app.smartComponents.Node.parts.Followers.components.List.nextNodeIds.${followers.toString()}`,
      props: () => null,
      getter: (...args) => args.filter(arg => arg),
    },
  },
};

export const CONFIG_2 = {
  value: {
    nextNodeNodeIds: {
      keyPath: ({ nextNodeIds = [] }) =>
        nextNodeIds.map(nextNodeId =>
          NODE_STORE_SELECTORS.id({ id: nextNodeId }),
        ),
      props: () => null,
      getter: (...args) => args.filter(arg => arg),
    },
  },
};

export const CONFIG_3 = {
  value: {
    filteredFollowers: {
      getter: ({ followers = [], nextNodeNodeIds }) =>
        followers.filter((follower, index) => nextNodeNodeIds[index]),
    },
  },
};
