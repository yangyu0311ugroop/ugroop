import { TEMPLATE_MANAGEMENT_DATASTORE } from 'appConstants';
import toString from 'lodash/toString';
import includes from 'lodash/includes';

export const IDS_CONFIG = {
  value: {
    filteredNodeIds: [TEMPLATE_MANAGEMENT_DATASTORE, 'filteredIds'],
  },
};

export const CONFIG = {
  value: {
    customTabIds: {
      getter: ({ relatedIds, filteredNodeIds = [] }) => {
        const filteredIds = relatedIds.filter(
          id =>
            id[1] === 'tabother' && includes(filteredNodeIds, toString(id[0])),
        );
        const customTabIds = filteredIds.map(id => id[0]);
        return customTabIds;
      },
    },
  },
};
