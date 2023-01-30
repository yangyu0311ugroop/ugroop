import { SHARED_TEMPLATES_DATASTORE } from 'appConstants';

export const CONFIG = {
  value: {
    view: [SHARED_TEMPLATES_DATASTORE, 'viewSelected'],
    search: {
      keyPath: ['router', 'location'],
      getter: location => location.get('search'),
    },
    pathname: {
      keyPath: ['router', 'location'],
      getter: location => location.get('pathname'),
    },
  },
  setValue: {
    view: [SHARED_TEMPLATES_DATASTORE, 'viewSelected'],
  },
};
