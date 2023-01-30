import { get } from 'lodash';
import { TEMPLATE_MANAGEMENT_DATASTORE, NODE_STORE } from 'appConstants';
import arrays from 'datastore/templateManagementStore/helpers/arrays';
import tabHelpers from 'datastore/templateManagementStore/helpers/tabs';
import schema from 'datastore/templateManagementStore/schema';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { normalize } from 'normalizr';
import { CONFIG as config } from 'resaga';
import { requests } from 'utils/request';

export const PUB_TAB_CONTENT = 'public_tab_content';
export const FETCH_PUB_TAB = 'fetchPublicTab';
export const Normalize = { normalize };

export const CONFIG = {
  [config.PAGE]: PUB_TAB_CONTENT,
  processResult: {
    [FETCH_PUB_TAB]: ({ type, children }) => {
      let entities;
      let ids;
      // convert children linked-list to array
      const convertedChildren = tabHelpers.convertChildrenToArray(
        type,
        children,
      );
      const tabChildrenData = arrays.setIndex(convertedChildren);
      if (type === 'tabtimeline') {
        // normalise tab data
        const normalised = Normalize.normalize(
          tabChildrenData,
          schema.tabTimeLine,
        );
        entities = normalised.entities;
        ids = normalised.result;
      } else if (type === 'tabother') {
        // normalise tab data
        const normalised = Normalize.normalize(
          tabChildrenData,
          schema.tabOther,
        );
        entities = normalised.entities;
        ids = normalised.result;
      } else if (type === 'tabgallery') {
        // normalise tab data
        const normalised = Normalize.normalize(
          tabChildrenData,
          schema.tabGallery,
        );
        entities = normalised.entities;
        ids = normalised.result;
      }
      return {
        ...entities,
        nodes: {
          ...get(entities, 'days', {}),
          ...get(entities, 'sections', {}),
          ...get(entities, 'checklists', {}),
          ...get(entities, 'checkitems', {}),
          ...get(entities, 'events', {}),
        },
        ids,
      };
    },
  },
  [config.SUBMIT]: {
    [FETCH_PUB_TAB]: ({ hashkey, id }) =>
      requests.fetchWithURL('get', `/pub/template/${hashkey}/tab/${id}`),
  },
  value: {
    tab: ({ tabId: id }) => NODE_STORE_SELECTORS.node({ id }),
    sectionIds: ({ tabId }) => [NODE_STORE, 'nodes', tabId, 'children'],
  },
  setValue: {
    tabId: [TEMPLATE_MANAGEMENT_DATASTORE, 'tabId'],
  },
};
