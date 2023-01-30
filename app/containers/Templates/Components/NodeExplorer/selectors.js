import { MY_TEMPLATES_DATASTORE } from 'appConstants';
import { MY_TEMPLATE_VIEWSTORE } from 'containers/Templates/Components/NodeExplorer/constants';
import { FOLDER_TREE_MODE_ATTRIBUTE } from 'containers/Templates/Components/FolderTree/constants';

const folderId = [MY_TEMPLATE_VIEWSTORE, 'id'];
const sortOrder = [MY_TEMPLATE_VIEWSTORE, 'sortOrder'];
const sortField = [MY_TEMPLATE_VIEWSTORE, 'sortField'];
const folderFormOpen = [MY_TEMPLATE_VIEWSTORE, 'folderFormOpen'];
const layout = [MY_TEMPLATE_VIEWSTORE, 'layout'];
const currResultCount = [MY_TEMPLATE_VIEWSTORE, 'currResultCount'];

const selectedId = [MY_TEMPLATE_VIEWSTORE, 'selectedId'];
const selectedType = [MY_TEMPLATE_VIEWSTORE, 'selectedType'];
const selectedName = [MY_TEMPLATE_VIEWSTORE, 'selectedName'];

const folderTreeIds = [MY_TEMPLATE_VIEWSTORE, 'folderTreeIds'];

const isOpenFolderTree = [MY_TEMPLATE_VIEWSTORE, 'isOpenFolderTree'];

const folderTreeMode = [MY_TEMPLATE_VIEWSTORE, FOLDER_TREE_MODE_ATTRIBUTE];

// Delete Dialog (for single delete only)
const isOpenDeleteDialog = [MY_TEMPLATE_VIEWSTORE, 'isOpenDeleteDialog'];
const selectedItem = [MY_TEMPLATE_VIEWSTORE, 'selectedItem'];
const deleteType = [MY_TEMPLATE_VIEWSTORE, 'deleteType'];
const shouldRedirect = [MY_TEMPLATE_VIEWSTORE, 'shouldRedirect'];

const isAddTemplateModalOpen = [
  MY_TEMPLATE_VIEWSTORE,
  'isAddTemplateModalOpen',
];

const isFetchingInitialContent = [
  MY_TEMPLATE_VIEWSTORE,
  'isFetchingInitialContent',
];

const view = [MY_TEMPLATES_DATASTORE, 'view'];

export const MY_TEMPLATE_VIEWSTORE_SELECTORS = {
  getters: {
    folderId,
    sortOrder,
    sortField,
    currResultCount,
    folderFormOpen,
    layout,

    selectedId,
    selectedType,
    selectedName,

    folderTreeMode,
    isOpenFolderTree,
    folderTreeIds,

    isFetchingInitialContent,

    isAddTemplateModalOpen,
    view,

    isOpenDeleteDialog,
    selectedItem,
    deleteType,
    shouldRedirect,
  },
  setters: {
    folderId,
    sortOrder,
    sortField,
    currResultCount,
    folderFormOpen,
    layout,

    selectedId,
    selectedType,
    selectedName,

    folderTreeMode,
    isOpenFolderTree,
    folderTreeIds,

    isFetchingInitialContent,

    isAddTemplateModalOpen,
    view,

    isOpenDeleteDialog,
    selectedItem,
    deleteType,
    shouldRedirect,
  },
};
