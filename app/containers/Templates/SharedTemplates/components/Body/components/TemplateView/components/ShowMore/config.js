import { SHARED_TEMPLATES_DATASTORE, USER_DATA_STORE } from 'appConstants';
import { DEFAULT_LIMIT } from 'containers/Templates/constants';
import { GET_SHARED_TEMPLATES, NODE_SHARE_API } from 'apis/constants';

export const CONFIG = {
  value: {
    folderId: [SHARED_TEMPLATES_DATASTORE, 'id'],
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
    currResultCount: {
      keyPath: [SHARED_TEMPLATES_DATASTORE, 'currResultCount'],
      getter: currResultCount => (currResultCount / DEFAULT_LIMIT >= 1 ? 9 : 0),
    },
    isLoading: {
      isSharedFetchLoading: [NODE_SHARE_API, GET_SHARED_TEMPLATES],
    },
  },
  setValue: {
    children: [SHARED_TEMPLATES_DATASTORE, 'children'],
    folder: [SHARED_TEMPLATES_DATASTORE, 'folder'],
    id: [SHARED_TEMPLATES_DATASTORE, 'id'],
    currResultCount: [SHARED_TEMPLATES_DATASTORE, 'currResultCount'],
    people: [USER_DATA_STORE, 'people'],
  },
};
