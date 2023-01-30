import { MY_TEMPLATE_VIEWSTORE_SELECTORS } from 'containers/Templates/Components/NodeExplorer/selectors';

export const CONFIG = {
  value: {
    currFolderId: MY_TEMPLATE_VIEWSTORE_SELECTORS.getters.folderId,
  },
  setValue: {
    folderFormOpen: MY_TEMPLATE_VIEWSTORE_SELECTORS.setters.folderFormOpen,
  },
};
