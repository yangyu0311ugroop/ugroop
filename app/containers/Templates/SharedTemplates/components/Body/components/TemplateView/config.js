import { SHARED_TEMPLATES_DATASTORE, USER_DATA_STORE } from 'appConstants';
import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';
export const CONFIG = {
  value: {
    pageSelected: [SHARED_TEMPLATES_DATASTORE, 'pageSelected'],
    folderChildrenArray: {
      keyPath: [
        [SHARED_TEMPLATES_DATASTORE, 'id'],
        [SHARED_TEMPLATES_DATASTORE, 'folder'],
        [SHARED_TEMPLATES_DATASTORE, 'children'],
      ],
      getter: (id, folder, children) =>
        id ? folder[id].children.map(itemId => children[itemId].id) : [],
    },
    view: [SHARED_TEMPLATES_DATASTORE, 'viewSelected'],
    sortField: [SHARED_TEMPLATES_DATASTORE, 'sortField'],
    sortOrder: [SHARED_TEMPLATES_DATASTORE, 'sortOrder'],
    search: {
      keyPath: ['router', 'location'],
      getter: location => location.get('search'),
    },
    pathname: {
      keyPath: ['router', 'location'],
      getter: location => location.get('pathname'),
    },
    switchLoading: [SHARED_TEMPLATES_DATASTORE, 'switchLoading'],
    userId: USER_STORE_SELECTORS.userId(),
  },
  setValue: {
    id: [SHARED_TEMPLATES_DATASTORE, 'id'],
    folder: [SHARED_TEMPLATES_DATASTORE, 'folder'],
    children: [SHARED_TEMPLATES_DATASTORE, 'children'],
    sortField: [SHARED_TEMPLATES_DATASTORE, 'sortField'],
    sortOrder: [SHARED_TEMPLATES_DATASTORE, 'sortOrder'],
    currResultCount: [SHARED_TEMPLATES_DATASTORE, 'currResultCount'],
    people: [USER_DATA_STORE, 'people'],
  },
};
