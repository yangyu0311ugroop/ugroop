import {
  SHARED_TEMPLATES_DATASTORE,
  TEMPLATE_MANAGEMENT_VIEWSTORE,
  USER_DATA_STORE,
} from 'appConstants';

export const CONFIG = {
  value: {
    pageSelected: [SHARED_TEMPLATES_DATASTORE, 'pageSelected'],
    sortOrder: [SHARED_TEMPLATES_DATASTORE, 'sortOrder'],
    sortField: [SHARED_TEMPLATES_DATASTORE, 'sortField'],
    search: {
      keyPath: ['router', 'location'],
      getter: location => location.get('search'),
    },
    pathname: {
      keyPath: ['router', 'location'],
      getter: location => location.get('pathname'),
    },
    searchValue: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'search'],
  },
  setValue: {
    pageSelected: [SHARED_TEMPLATES_DATASTORE, 'pageSelected'],
    folder: [SHARED_TEMPLATES_DATASTORE, 'folder'],
    children: [SHARED_TEMPLATES_DATASTORE, 'children'],
    id: [SHARED_TEMPLATES_DATASTORE, 'id'],
    switchLoading: [SHARED_TEMPLATES_DATASTORE, 'switchLoading'],
    currResultCount: [SHARED_TEMPLATES_DATASTORE, 'currResultCount'],
    people: [USER_DATA_STORE, 'people'],
    search: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'search'],
  },
};
