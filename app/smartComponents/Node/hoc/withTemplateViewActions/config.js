import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { SET_VALUE } from 'ugcomponents/SnackBar/config';
import { APP_DATA_CACHE } from 'appConstants';
import { MY_TEMPLATE_VIEWSTORE_SELECTORS } from 'containers/Templates/Components/NodeExplorer/selectors';

export const CONFIG = {
  value: {
    content: NODE_STORE_SELECTORS.content,
    type: NODE_STORE_SELECTORS.type,
  },
  setValue: {
    nodes: NODE_STORE_SELECTORS.nodes,
    folderFormOpen: MY_TEMPLATE_VIEWSTORE_SELECTORS.setters.folderFormOpen,
    isOpenFolderTree: MY_TEMPLATE_VIEWSTORE_SELECTORS.setters.isOpenFolderTree,
    folderTreeMode: MY_TEMPLATE_VIEWSTORE_SELECTORS.setters.folderTreeMode,
    selectedId: MY_TEMPLATE_VIEWSTORE_SELECTORS.setters.selectedId,
    selectedType: MY_TEMPLATE_VIEWSTORE_SELECTORS.setters.selectedType,
    selectedName: MY_TEMPLATE_VIEWSTORE_SELECTORS.setters.selectedName,

    isOpenDeleteDialog:
      MY_TEMPLATE_VIEWSTORE_SELECTORS.setters.isOpenDeleteDialog,
    selectedItem: MY_TEMPLATE_VIEWSTORE_SELECTORS.setters.selectedItem,
    deleteType: MY_TEMPLATE_VIEWSTORE_SELECTORS.setters.deleteType,
    shouldRedirect: MY_TEMPLATE_VIEWSTORE_SELECTORS.setters.shouldRedirect,

    isEditable: NODE_STORE_SELECTORS.isEditable,
    cardImageList: [APP_DATA_CACHE, 'cardImageList'],
    ...SET_VALUE,
  },
};
