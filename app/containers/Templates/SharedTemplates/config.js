/**
 * Created by quando on 30/6/17.
 */
import { SHARED_TEMPLATES_DATASTORE } from 'appConstants';
import { MY_TEMPLATE_VIEWSTORE_SELECTORS } from '../Components/NodeExplorer/selectors';

export const CONFIG = {
  setValue: {
    sortOrder: [SHARED_TEMPLATES_DATASTORE, 'sortOrder'],
    sortField: [SHARED_TEMPLATES_DATASTORE, 'sortField'],
    viewSelected: [SHARED_TEMPLATES_DATASTORE, 'viewSelected'],
    pageSelected: [SHARED_TEMPLATES_DATASTORE, 'pageSelected'],
    currResultCount: [SHARED_TEMPLATES_DATASTORE, 'currResultCount'],
    id: [SHARED_TEMPLATES_DATASTORE, 'currResultCount'],
    isOpenFolderTree: MY_TEMPLATE_VIEWSTORE_SELECTORS.setters.isOpenFolderTree,
    folderTreeMode: MY_TEMPLATE_VIEWSTORE_SELECTORS.setters.folderTreeMode,
    selectedId: MY_TEMPLATE_VIEWSTORE_SELECTORS.setters.selectedId,
    selectedType: MY_TEMPLATE_VIEWSTORE_SELECTORS.setters.selectedType,
    selectedName: MY_TEMPLATE_VIEWSTORE_SELECTORS.setters.selectedName,
  },
};
