import {
  ABILITY_API,
  FIND_MY_TOURS,
  GET_RECENT_ACTIVITY,
  USER_API,
} from 'apis/constants';
import {
  DASHBOARD_VIEW_STORE,
  NODE_STORE,
  NODE_STORE_ITEM,
  ORGANISATION_DATA_STORE,
} from 'appConstants';
import { hideOrganisations } from 'containers/Dashboard/components/Tours/components/Card/config';
import { DASHBOARD_CURRENT_PAGE } from 'containers/Dashboard/config';
import { ORGANISATION_STORE_SELECTORS } from 'datastore/orgStore/selectors';
import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';
import { STARS_SELECTOR } from 'smartComponents/Node/hoc/withStars/config';
export const CONFIG = {
  value: {
    userId: USER_STORE_SELECTORS.userId,
    hideOrganisations,
    search: [DASHBOARD_VIEW_STORE, 'search'],
    organisationIdFromURL: {
      getter: ORGANISATION_STORE_SELECTORS.organisationIdFromMyToursURL,
    },
    featuredTours: [NODE_STORE, NODE_STORE_ITEM.FEATURED_TOURS],
    selectedOrgId: [DASHBOARD_VIEW_STORE, 'selectedOrgId'],
    selectedFeatured: [DASHBOARD_VIEW_STORE, 'selectedFeatured'],
    selectedFeaturedMinimise: [
      DASHBOARD_VIEW_STORE,
      'selectedFeaturedMinimise',
    ],
    orgName: ({ location }) => {
      const getOrgIdArr = location.pathname.split('/');
      const orgId = parseInt(getOrgIdArr[2], 10);
      return (
        !Number.isNaN(orgId) && [
          ORGANISATION_DATA_STORE,
          'organisations',
          orgId,
          'name',
        ]
      );
    },
  },
  setValue: {
    page: DASHBOARD_CURRENT_PAGE,
    search: [DASHBOARD_VIEW_STORE, 'search'],
    selectedOrgId: [DASHBOARD_VIEW_STORE, 'selectedOrgId'],
    selectedFeatured: [DASHBOARD_VIEW_STORE, 'selectedFeatured'],
    selectedFeaturedMinimise: [
      DASHBOARD_VIEW_STORE,
      'selectedFeaturedMinimise',
    ],
    stars: STARS_SELECTOR,
  },

  isLoading: {
    loading: [ABILITY_API, FIND_MY_TOURS],
    getRecentActivity: [USER_API, GET_RECENT_ACTIVITY],
  },
};
