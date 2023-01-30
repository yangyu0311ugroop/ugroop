import {
  NODE_TRAILS_DATASTORE,
  USER_DATA_STORE,
  FILE_DATA_STORE,
} from 'appConstants';
import { requests } from 'utils/request';
import {
  DEFAULT_LIMIT,
  DEFAULT_OFFSET,
  DEFAULT_SORT_FIELD,
  DEFAULT_SORT_ORDER,
} from 'containers/Templates/constants';

import {
  BATCH_GET_FOLDER_TREE,
  DELETE_CHILDREN_FROM_FOLDER,
  FOLDER_API,
  GET_CHECKLISTS,
  GET_FOLDER_CHILDREN_WITH_PAGINATION,
  GET_FOLDER_TREE,
  GET_PARENT_OF_FOLDER,
  GET_FOLDER_IMAGE,
} from 'apis/constants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import NodeNormalisers from 'apis/components/Node/normalisers';
import FolderNormaliser from './normalisers';

export const CONFIG = {
  name: FOLDER_API,

  requests: {
    [GET_PARENT_OF_FOLDER]: id =>
      requests.fetchWithAuthorisation('get', `/${FOLDER_API}/${id}/parents`),
    [GET_FOLDER_CHILDREN_WITH_PAGINATION]: ({
      id,
      sortField = DEFAULT_SORT_FIELD,
      sortOrder = DEFAULT_SORT_ORDER,
      offset = DEFAULT_OFFSET,
      limit = DEFAULT_LIMIT,
    }) =>
      requests.fetchWithAuthorisation(
        'get',
        `/${FOLDER_API}/${id}/children?offset=${offset}&limit=${limit}&sortby=${sortField}:${sortOrder},id`,
      ),
    [DELETE_CHILDREN_FROM_FOLDER]: ({ id }) =>
      requests.fetchWithAuthorisation('delete', `/${FOLDER_API}/${id}`),
    [GET_FOLDER_TREE]: ({ id }) =>
      requests.fetchWithAuthorisation('get', `/${FOLDER_API}/${id}/tree`),
    [BATCH_GET_FOLDER_TREE]: ({ ids }) =>
      Promise.all(
        ids.map(id =>
          requests.fetchWithAuthorisation('get', `/${FOLDER_API}/${id}/tree`),
        ),
      ),
    [GET_CHECKLISTS]: ({ id }) =>
      requests.fetchWithAuthorisation('get', `/${FOLDER_API}/${id}/checklists`),
    [GET_FOLDER_IMAGE]: ({ id }) =>
      requests.fetchWithAuthorisation(
        'get',
        `/${FOLDER_API}/${id}/folderImage`,
      ),
  },

  processResult: {
    [GET_PARENT_OF_FOLDER]: FolderNormaliser.fetchFolderParent,
    [GET_FOLDER_CHILDREN_WITH_PAGINATION]: FolderNormaliser.fetchFolderChildren,
    [GET_CHECKLISTS]: FolderNormaliser.getChecklists,
    [DELETE_CHILDREN_FROM_FOLDER]: NodeNormalisers.batchDeleteNode,
    [BATCH_GET_FOLDER_TREE]: FolderNormaliser.batchFetchFolderTree,
  },

  setValue: {
    trail: [NODE_TRAILS_DATASTORE, 'trail'],
    breadcrumb: [NODE_TRAILS_DATASTORE, 'breadcrumb'],
    people: [USER_DATA_STORE, 'people'],
    nodes: NODE_STORE_SELECTORS.nodes,
    files: [FILE_DATA_STORE, 'files'],
  },
};
