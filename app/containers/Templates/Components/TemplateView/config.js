import { ORGANISATION_VIEWSTORE } from 'appConstants';
import { BATCH_DELETE, NODE_API } from 'apis/constants';
import { MY_TEMPLATE_VIEWSTORE_SELECTORS } from 'containers/Templates/Components/NodeExplorer/selectors';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

import { COGNITO_STORE_SELECTOR } from 'datastore/stormPathStore/selectors.resaga';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';
import dropRight from 'lodash/dropRight';
import takeRight from 'lodash/takeRight';
import { FOLDER } from 'utils/modelConstants';

export const getFirstItem = pair => pair[0];

export const CONFIG = {
  value: {
    sortedIds: ({ folderId }) =>
      NODE_STORE_SELECTORS.sortedIds({ id: folderId }),
    folderFormOpen: MY_TEMPLATE_VIEWSTORE_SELECTORS.getters.folderFormOpen,
    sortOrder: MY_TEMPLATE_VIEWSTORE_SELECTORS.getters.sortOrder,
    sortField: MY_TEMPLATE_VIEWSTORE_SELECTORS.getters.sortField,
    layout: MY_TEMPLATE_VIEWSTORE_SELECTORS.getters.layout,
    folderName: RESAGA_HELPERS.mapToId(
      NODE_STORE_SELECTORS.content,
      'folderId',
    ),
    folderType: RESAGA_HELPERS.mapToId(NODE_STORE_SELECTORS.type, 'folderId'),
    folderParentId: RESAGA_HELPERS.mapToId(
      NODE_STORE_SELECTORS.parentNodeId,
      'folderId',
    ),
    folderStatus: RESAGA_HELPERS.mapToId(
      NODE_STORE_SELECTORS.status,
      'folderId',
    ),
    rootNodeId: COGNITO_STORE_SELECTOR.rootNodeId.value,
    selectedId: MY_TEMPLATE_VIEWSTORE_SELECTORS.getters.selectedId,
    folderTreeMode: MY_TEMPLATE_VIEWSTORE_SELECTORS.getters.folderTreeMode,
    selectedType: MY_TEMPLATE_VIEWSTORE_SELECTORS.getters.selectedType,
    selectedName: MY_TEMPLATE_VIEWSTORE_SELECTORS.getters.selectedName,
    isFetchingInitialContent:
      MY_TEMPLATE_VIEWSTORE_SELECTORS.getters.isFetchingInitialContent,

    isOpenDeleteDialog:
      MY_TEMPLATE_VIEWSTORE_SELECTORS.getters.isOpenDeleteDialog,
    selectedItem: MY_TEMPLATE_VIEWSTORE_SELECTORS.getters.selectedItem,
    deleteType: MY_TEMPLATE_VIEWSTORE_SELECTORS.getters.deleteType,
    shouldRedirect: MY_TEMPLATE_VIEWSTORE_SELECTORS.getters.shouldRedirect,
    deleteLoading: MY_TEMPLATE_VIEWSTORE_SELECTORS.getters.deleteLoading,
    organisationId: [ORGANISATION_VIEWSTORE, 'organisationId'],
  },
};

export const RELATED_IDS_CONFIG = {
  value: {
    relatedIds: {
      keyPath: ({ sortedIds = [] }) =>
        Array.isArray(sortedIds)
          ? sortedIds.map(id => NODE_STORE_SELECTORS.type({ id }))
          : [],
      cacheKey: ({ sortedIds, cacheKey, folderId }) =>
        `templateViewIdTypeRelation.${folderId}.${cacheKey}.${
          sortedIds ? sortedIds.toString() : null
        }`,
      props: ({ sortedIds }) => sortedIds,
      getter: (...args) => {
        const relatedIds = dropRight(args, 1);
        const [sortedIds] = takeRight(args, 1);
        const withRelatedIds = Array.isArray(sortedIds)
          ? sortedIds.map((id, index) =>
              id instanceof Array
                ? [...id, relatedIds[index]]
                : [id, relatedIds[index]],
            )
          : [];

        return withRelatedIds;
      },
    },
  },
};

export const TYPE_CONFIG = {
  value: {
    folderIds: {
      getter: ({ relatedIds = [] }) =>
        relatedIds.filter(pair => pair[1] === FOLDER).map(getFirstItem),
    },
  },
  setValue: {
    folderFormOpen: MY_TEMPLATE_VIEWSTORE_SELECTORS.setters.folderFormOpen,
    layout: MY_TEMPLATE_VIEWSTORE_SELECTORS.setters.layout,
    isOpenFolderTree: MY_TEMPLATE_VIEWSTORE_SELECTORS.setters.isOpenFolderTree,
    selectedId: MY_TEMPLATE_VIEWSTORE_SELECTORS.setters.selectedId,
    folderTreeMode: MY_TEMPLATE_VIEWSTORE_SELECTORS.setters.folderTreeMode,
    selectedType: MY_TEMPLATE_VIEWSTORE_SELECTORS.setters.selectedType,
    selectedName: MY_TEMPLATE_VIEWSTORE_SELECTORS.setters.selectedName,

    isOpenDeleteDialog:
      MY_TEMPLATE_VIEWSTORE_SELECTORS.setters.isOpenDeleteDialog,
    selectedItem: MY_TEMPLATE_VIEWSTORE_SELECTORS.setters.selectedItem,
    deleteType: MY_TEMPLATE_VIEWSTORE_SELECTORS.setters.deleteType,
    shouldRedirect: MY_TEMPLATE_VIEWSTORE_SELECTORS.setters.shouldRedirect,
  },
  isLoading: {
    isBatchDeleteLoading: [NODE_API, BATCH_DELETE],
    isFetchingContent:
      MY_TEMPLATE_VIEWSTORE_SELECTORS.getters.isFetchingInitialContent,
  },
};
