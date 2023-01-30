import {
  COGNITO_ACCOUNTSTORE,
  COORDINATE_DATA_STORE,
  FILE_DATA_STORE,
  NODE_STORE,
  ORGANISATION_DATA_STORE,
  TEMPLATE_MANAGEMENT_DATASTORE as TEMPLATE,
  TEMPLATE_MANAGEMENT_DATASTORE,
  TEMPLATE_MANAGEMENT_VIEWSTORE,
  USER_DATA_STORE,
} from 'appConstants';
import {
  NODE_STORE_SELECTORS,
  NODE_VIEW_STORE_SELECTORS,
} from 'datastore/nodeStore/selectors';
/**
 * Created by quando on 5/7/17.
 */
import { SET_VALUE } from 'ugcomponents/SnackBar/config';
import { COMMENT as DISCUSSION_DRAWER } from '../components/Comment/config';
// import { SET_VALUE } from '../../../../ugcomponents/SnackBar/config';

export const TEMPLATE_ID_CONFIG = {
  value: {
    id: [TEMPLATE_MANAGEMENT_DATASTORE, 'id'],
    userId: [USER_DATA_STORE, 'userId'],
    cognitoUserId: [COGNITO_ACCOUNTSTORE, 'account', 'id'],
    userEmail: [COGNITO_ACCOUNTSTORE, 'account', 'email'],
  },
};
export const FEATURE_TOUR_CONFIG = {
  value: {
    isFeaturedTour: ({ match }) => {
      if (match.path === '/tours/:id') {
        return [NODE_STORE, 'featuredTours', match.params.id, 'type'];
      }
      return null;
    },
  },
};

export const CONFIG = {
  // new config, to remotely setValue to a redux store
  setValue: {
    idData: [TEMPLATE_MANAGEMENT_DATASTORE, 'id'],
    tabsData: [TEMPLATE_MANAGEMENT_DATASTORE, 'tabs'],
    templatesData: [TEMPLATE_MANAGEMENT_DATASTORE, 'templates'],
    feedbacksData: [TEMPLATE_MANAGEMENT_DATASTORE, 'feedbacks'],
    comments: [TEMPLATE_MANAGEMENT_DATASTORE, 'comments'],
    photosData: [TEMPLATE_MANAGEMENT_DATASTORE, 'photos'],
    photos: [FILE_DATA_STORE, 'files'],
    nodes: [NODE_STORE, 'nodes'],
    discussionDrawerNodeId: [DISCUSSION_DRAWER, 'nodeId'],
    discussionDrawerNodeStore: [DISCUSSION_DRAWER, 'nodeStore'],
    discussionDrawerSelectedFeedback: [DISCUSSION_DRAWER, 'selectedFeedback'],
    ...SET_VALUE,
    editable: NODE_VIEW_STORE_SELECTORS.editable,
    selectedId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'selectedId'],
    layout: NODE_STORE_SELECTORS.calculatedLayout,
    layoutRecheck: [TEMPLATE, 'layoutRecheck'],
    recentActivityIds: [COORDINATE_DATA_STORE, 'recentActivityIds'],
    recentActivities: [COORDINATE_DATA_STORE, 'recentActivities'],
    activeTab: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'activeTab'],
    refresh: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'refresh'],
    linkRefresh: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'linkRefresh'],
    links: [NODE_STORE, 'links'],
    transferDialog: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'transferDialog'],
    selectedOverviewType: [
      TEMPLATE_MANAGEMENT_VIEWSTORE,
      'selectedOverviewType',
    ],
    paxLabel: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'paxLabel'],
  },

  value: {
    orgId: NODE_STORE_SELECTORS.organisationId,
    seeCheckItemDetail: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'seeCheckItemDetail'],
    recentActivityIds: [COORDINATE_DATA_STORE, 'recentActivityIds'],
    activeTab: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'activeTab'],
    refresh: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'refresh'],
    idExist: NODE_STORE_SELECTORS.id,
    organisationIds: [ORGANISATION_DATA_STORE, 'organisationIds'],
    transferDialog: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'transferDialog'],
    tourTitle: ({ id }) => [NODE_STORE, 'nodes', id, 'content'],
    editable: NODE_VIEW_STORE_SELECTORS.editable,
  },

  isLoading: {},

  manuallySubscribe: true, // will not auto-subscribe to all values in `@@values`
};
