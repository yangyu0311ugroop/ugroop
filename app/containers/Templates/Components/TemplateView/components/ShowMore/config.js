import { MY_TEMPLATE_VIEWSTORE_SELECTORS } from 'containers/Templates/Components/NodeExplorer/selectors';
import { USER_DATA_STORE, NODE_STORE } from 'appConstants';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const FOLDER_ID_CONFIG = {
  value: {
    folderId: MY_TEMPLATE_VIEWSTORE_SELECTORS.getters.folderId,
  },
};

export const CONFIG = {
  value: {
    folderChildrenArrayLength: {
      keyPath: RESAGA_HELPERS.mapToId(
        NODE_STORE_SELECTORS.sortedIds,
        'folderId',
      ),
      getter: sortedIds => (Array.isArray(sortedIds) ? sortedIds.length : 0),
    },
    sortOrder: MY_TEMPLATE_VIEWSTORE_SELECTORS.getters.sortOrder,
    sortField: MY_TEMPLATE_VIEWSTORE_SELECTORS.getters.sortField,
    currResultCount: {
      keyPath: MY_TEMPLATE_VIEWSTORE_SELECTORS.getters.currResultCount,
      getter: currResultCount => (currResultCount / 9 >= 1 ? 9 : 0),
    },
  },
  setValue: {
    nodes: [NODE_STORE, 'nodes'],
    currResultCount: MY_TEMPLATE_VIEWSTORE_SELECTORS.setters.currResultCount,
    people: [USER_DATA_STORE, 'people'],
  },
};
