import {
  TEMPLATE_MANAGEMENT_DATASTORE,
  ORGANISATION_DATA_STORE,
  NODE_STORE,
} from 'appConstants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import {
  PUB_API,
  TEMPLATE_TAB_API,
  TEMPLATE_API,
  GET_PUB_TEMPLATE_HEADER,
  GET_TEMPLATE_DETAIL,
  BATCH_GET_PUB_TEMPLATE_TAB,
  BATCH_GET_TEMPLATE_TAB_DETAIL,
} from 'apis/constants';
import { COGNITO_STORE_SELECTOR } from 'datastore/stormPathStore/selectors.resaga';
import dropRight from 'lodash/dropRight';
import takeRight from 'lodash/takeRight';
import { normalize } from 'normalizr';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';
export const Normalize = { normalize };
export const PRINT_TEMPLATE = 'print_template';
export const FETCH_TEMPLATE = 'fetchPubTemplate';
export const FETCH_TEMPLATE_HASHKEY = 'fetchPubTemplateHashkey';
export const TAB_GALLERY = 'TabGallery';

export const TEMPLATE_MANAGEMENT = 'templateManagement';
export const FETCH_PEOPLE = 'fetchPeople';
export const GET_ANCESTORS = 'getAncestors';
export const FETCH_NODE_CHILD = 'getNodeChild';
export const FETCH_TAB = 'fetchTab';
export const FETCH_TAB_HASHKEY = 'fetchTabHashkey';

export const CONFIG = {
  value: {
    userId: COGNITO_STORE_SELECTOR.userId.value,
    templateId: () => [TEMPLATE_MANAGEMENT_DATASTORE, 'id'],
    tabId: () => [TEMPLATE_MANAGEMENT_DATASTORE, 'tabId'],
    days: [TEMPLATE_MANAGEMENT_DATASTORE, 'days'],
    tabOCustomIds: () => [TEMPLATE_MANAGEMENT_DATASTORE, 'tabOther'],
    templateInfo: {
      keyPath: [[TEMPLATE_MANAGEMENT_DATASTORE, 'id'], [NODE_STORE, 'nodes']],
      getter: (id, templates) => {
        if (id && templates) {
          return {
            tabIds: templates[id].children,
            createdBy: templates[id].createdBy,
          };
        }
        return { tabIds: [], createdBy: 0 };
      },
      spreadObject: true,
    },
  },
};

export const CUSTOM_TABS_CONFIG = {
  value: {
    orgId: RESAGA_HELPERS.mapToId(
      NODE_STORE_SELECTORS.organisationId,
      'templateId',
    ),
    relatedIds: {
      keyPath: ({ tabIds = [] }) =>
        tabIds.map(id => NODE_STORE_SELECTORS.type({ id })),
      cacheKey: ({ tabIds, cacheKey }) =>
        `pairRelatedId.${cacheKey}.${tabIds ? tabIds.toString() : null}`,
      props: ({ tabIds }) => tabIds,
      getter: (...args) => {
        const relatedIds = dropRight(args, 1);
        const [ids] = takeRight(args, 1);
        const withRelatedIds = ids.map((id, index) =>
          id instanceof Array
            ? [...id, relatedIds[index]]
            : [id, relatedIds[index]],
        );

        return withRelatedIds;
      },
    },
    shareWithTimeLine: ({ tabId }) =>
      NODE_STORE_SELECTORS.sharedWith({ id: tabId }),
  },

  // [config.PAGE]: PRINT_TEMPLATE,

  isLoading: {
    isFetchingTemplateWithHashkey: [PUB_API, GET_PUB_TEMPLATE_HEADER],
    isFetchingTemplate: [TEMPLATE_API, GET_TEMPLATE_DETAIL],
    isFetchTemplateTabWithHashkey: [PUB_API, BATCH_GET_PUB_TEMPLATE_TAB],
    isFetchingTemplateTab: [TEMPLATE_TAB_API, BATCH_GET_TEMPLATE_TAB_DETAIL],
  },

  // new config, to remotely setValue to a redux store
  setValue: {
    idData: [TEMPLATE_MANAGEMENT_DATASTORE, 'id'],
    tabsData: [TEMPLATE_MANAGEMENT_DATASTORE, 'tabs'],
    templatesData: [TEMPLATE_MANAGEMENT_DATASTORE, 'templates'],
    photosData: [TEMPLATE_MANAGEMENT_DATASTORE, 'photos'],
    days: [TEMPLATE_MANAGEMENT_DATASTORE, 'days'],
    sections: [TEMPLATE_MANAGEMENT_DATASTORE, 'sections'],
    events: [TEMPLATE_MANAGEMENT_DATASTORE, 'events'],
    photos: [TEMPLATE_MANAGEMENT_DATASTORE, 'photos'],
    tabId: [TEMPLATE_MANAGEMENT_DATASTORE, 'tabId'],
    organisation: [ORGANISATION_DATA_STORE, 'organisations'],
    tabOther: [TEMPLATE_MANAGEMENT_DATASTORE, 'tabOther'],
    nodes: [NODE_STORE, 'nodes'],
    tabCustom: [TEMPLATE_MANAGEMENT_DATASTORE, 'filteredIds'],
  },
};
