import { MY_TEMPLATE_VIEWSTORE_SELECTORS } from 'containers/Templates/Components/NodeExplorer/selectors';

export const CONFIG = {
  value: {},
  setValue: {
    folderFormOpen: MY_TEMPLATE_VIEWSTORE_SELECTORS.setters.folderFormOpen,
    isAddTemplateModalOpen:
      MY_TEMPLATE_VIEWSTORE_SELECTORS.setters.isAddTemplateModalOpen,
    layout: MY_TEMPLATE_VIEWSTORE_SELECTORS.setters.layout,
  },
};
