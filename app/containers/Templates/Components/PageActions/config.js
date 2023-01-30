import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import {
  SHARED_TEMPLATES_DATASTORE,
  TEMPLATE_MANAGEMENT_VIEWSTORE,
} from 'appConstants';
import { MY_TEMPLATE_VIEWSTORE_SELECTORS } from 'containers/Templates/Components/NodeExplorer/selectors';
import { COGNITO_STORE_SELECTOR } from '../../../../datastore/stormPathStore/selectors.resaga';

export const CONFIG = {
  setValue: {
    folderFormOpen: MY_TEMPLATE_VIEWSTORE_SELECTORS.setters.folderFormOpen,
    isAddTemplateModalOpen:
      MY_TEMPLATE_VIEWSTORE_SELECTORS.setters.isAddTemplateModalOpen,
    layout: MY_TEMPLATE_VIEWSTORE_SELECTORS.setters.layout,
    search: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'search'],
    sortOrder: MY_TEMPLATE_VIEWSTORE_SELECTORS.getters.sortOrder,
    sortField: MY_TEMPLATE_VIEWSTORE_SELECTORS.getters.sortField,
  },
  value: {
    search: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'search'],
    isAddTemplateModalOpen:
      MY_TEMPLATE_VIEWSTORE_SELECTORS.getters.isAddTemplateModalOpen,
    folderChildren: props =>
      NODE_STORE_SELECTORS.sortedIds({ id: props.folderId }),
    layout: MY_TEMPLATE_VIEWSTORE_SELECTORS.getters.layout,
    parentNodeId: ({ folderId }) =>
      NODE_STORE_SELECTORS.parentNodeId({ id: folderId }),
    sortOrderValue: MY_TEMPLATE_VIEWSTORE_SELECTORS.getters.sortOrder,
    sortFieldValue: MY_TEMPLATE_VIEWSTORE_SELECTORS.getters.sortField,
    isSharedTours: [SHARED_TEMPLATES_DATASTORE, 'pageSelected'],
    userId: COGNITO_STORE_SELECTOR.userId.value,
  },
};
