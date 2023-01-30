import {
  COGNITO_ACCOUNTSTORE,
  DASHBOARD_VIEW_STORE,
  LOCAL_USER_STORE,
  NODE_STORE,
  NODE_STORE_ITEM,
  ORGANISATION_DATA_STORE,
} from 'appConstants';
import {
  getOrganisationPreferenceId,
  getOrganisationPaxLabel,
} from 'datastore/orgStore/selectors';
import { COORDINATE_DATA_STORE_SELECTORS } from 'datastore/coordinateDataStore/selectors';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';

export const organisationTours = ({ toggleId }) => [
  ORGANISATION_DATA_STORE,
  'organisationTours',
  toggleId,
  'children',
];
export const organisationUpdatedAt = ({ toggleId }) => [
  ORGANISATION_DATA_STORE,
  'organisationTours',
  toggleId,
  'updatedAt',
];

export const hideOrganisations = [
  COGNITO_ACCOUNTSTORE,
  'userSettings',
  'navigationDrawer',
  'hideOrganisations',
];

export const CONFIG = {
  value: {
    ids: COORDINATE_DATA_STORE_SELECTORS.ids,
    items: RESAGA_HELPERS.subscribeIfNotGiven(organisationTours, 'items'),
    updatedAt: organisationUpdatedAt,
    search: [DASHBOARD_VIEW_STORE, 'search'],
    featuredTours: [NODE_STORE, NODE_STORE_ITEM.FEATURED_TOURS],
    starredTours: ({ userId }) => [LOCAL_USER_STORE, `${userId}`, 'stars'],
    selectedFeatured: [DASHBOARD_VIEW_STORE, 'selectedFeatured'],
    selectedFeaturedMinimise: [
      DASHBOARD_VIEW_STORE,
      'selectedFeaturedMinimise',
    ],
    preferenceId: getOrganisationPreferenceId,
  },
  setValue: {},
};

export const CONFIG2 = {
  value: {
    paxLabel: {
      keyPath: ({ preferenceId }) =>
        getOrganisationPaxLabel({ id: preferenceId }),
      getter: val => val || 'PAX',
    },
  },
  setValue: {
    hideOrganisations,
    selectedOrgId: [DASHBOARD_VIEW_STORE, 'selectedOrgId'],
    selectedFeatured: [DASHBOARD_VIEW_STORE, 'selectedFeatured'],
    selectedFeaturedMinimise: [
      DASHBOARD_VIEW_STORE,
      'selectedFeaturedMinimise',
    ],
  },
};
