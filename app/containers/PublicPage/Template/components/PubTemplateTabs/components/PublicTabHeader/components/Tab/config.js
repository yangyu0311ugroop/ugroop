import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

const CONFIG = {
  value: {
    label: ({ tabId: id }) => NODE_STORE_SELECTORS.content({ id }),
    isPrivate: ({ tabId: id }) =>
      NODE_STORE_SELECTORS.nodeProp({ id, path: ['customData', 'private'] }),
  },
};

export default CONFIG;
