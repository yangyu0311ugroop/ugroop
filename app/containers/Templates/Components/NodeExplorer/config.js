import {
  NODE_STORE,
  ORGANISATION_VIEWSTORE,
  USER_DATA_STORE,
} from 'appConstants';
import { MY_TEMPLATE_VIEWSTORE_SELECTORS } from 'containers/Templates/Components/NodeExplorer/selectors';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { ORGANISATION_STORE_SELECTORS } from 'datastore/orgStore/selectors';

export const MY_TEMPLATE_PAGE = 'myTemplatePage';

export const CONFIG_FOLDER_ID = {
  value: {
    id: MY_TEMPLATE_VIEWSTORE_SELECTORS.getters.folderId,
  },
};

export const CONFIG = {
  value: {
    folderName: NODE_STORE_SELECTORS.content,
    folderChildren: NODE_STORE_SELECTORS.children,
    view: MY_TEMPLATE_VIEWSTORE_SELECTORS.getters.view,
    sortOrder: MY_TEMPLATE_VIEWSTORE_SELECTORS.getters.sortOrder,
    sortField: MY_TEMPLATE_VIEWSTORE_SELECTORS.getters.sortField,
    orgId: ORGANISATION_STORE_SELECTORS.organisationId,

    isFetchingInitialContent:
      MY_TEMPLATE_VIEWSTORE_SELECTORS.getters.isFetchingInitialContent,
  },
  setValue: {
    folderFormOpen: MY_TEMPLATE_VIEWSTORE_SELECTORS.setters.folderFormOpen,
    isAddTemplateModalOpen:
      MY_TEMPLATE_VIEWSTORE_SELECTORS.setters.isAddTemplateModalOpen,
    nodes: [NODE_STORE, 'nodes'],
    id: MY_TEMPLATE_VIEWSTORE_SELECTORS.setters.folderId,
    folderId: MY_TEMPLATE_VIEWSTORE_SELECTORS.setters.folderId,
    layout: MY_TEMPLATE_VIEWSTORE_SELECTORS.setters.layout,
    sortOrder: MY_TEMPLATE_VIEWSTORE_SELECTORS.setters.sortOrder,
    sortField: MY_TEMPLATE_VIEWSTORE_SELECTORS.setters.sortField,
    currResultCount: MY_TEMPLATE_VIEWSTORE_SELECTORS.setters.currResultCount,
    folderTreeIds: MY_TEMPLATE_VIEWSTORE_SELECTORS.setters.folderTreeIds,
    isFetchingInitialContent:
      MY_TEMPLATE_VIEWSTORE_SELECTORS.setters.isFetchingInitialContent,
    people: [USER_DATA_STORE, 'people'],
    organisationId: [ORGANISATION_VIEWSTORE, 'organisationId'],
  },
};
