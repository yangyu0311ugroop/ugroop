/**
 * In the future, this will probably be depricated in favor of nodeStore
 *
 */

import {
  TEMPLATE_MANAGEMENT_DATASTORE as STORE,
  TEMPLATE_MANAGEMENT_VIEWSTORE,
} from 'appConstants';

export const TEMPLATE_SELECTOR = {
  children: ({ id }) => [STORE, 'templates', id, 'children'],
};

export const TAB_SELECTOR = {
  isPrivate: ({ id }) => [STORE, 'tabs', id, 'customData', 'isPrivate'],
  createdBy: ({ id }) => [STORE, 'tabs', id, 'customData', 'isPrivate'],
  type: ({ id }) => {
    if (Array.isArray(id)) {
      return id.map(tabId => [STORE, 'tabs', tabId, 'type']);
    }

    return [STORE, 'tabs', id, 'type'];
  },
};

const templateId = [STORE, 'id'];

const tabId = [STORE, 'tabId'];

const templateDisplayDate = ({ templateId: id }) => [
  STORE,
  'templates',
  id,
  'customData',
  'displayDate',
];

const tabChildren = ({ tabId: id }) => [STORE, 'tabs', id, 'children'];

export const TEMPLATE_MANAGEMENT_STORE_SELECTORS = {
  // keyPath(s) only
  templateId,
  tabId,
  templateDisplayDate,
  tabChildren,
};

const shareListTab = [TEMPLATE_MANAGEMENT_VIEWSTORE, 'shareList', 'tab'];
const shareListFilter = [TEMPLATE_MANAGEMENT_VIEWSTORE, 'shareList', 'filter'];
const selectedOrgId = [TEMPLATE_MANAGEMENT_VIEWSTORE, 'selectedOrgId'];

const selectedFollowerId = [
  TEMPLATE_MANAGEMENT_VIEWSTORE,
  'selectedFollowerId',
];

const selectedParentId = [TEMPLATE_MANAGEMENT_VIEWSTORE, 'selectedParentId'];

const invitationDetailOpen = [TEMPLATE_MANAGEMENT_VIEWSTORE, 'seeDetail'];

const tourConnection = [TEMPLATE_MANAGEMENT_VIEWSTORE, 'tourConnection'];
const tourConnectionOpen = [...tourConnection, 'open'];
const tourConnectionId = [...tourConnection, 'id'];
const tourConnectionUserId = [...tourConnection, 'userId'];
const tourConnectionMode = [...tourConnection, 'mode'];
const tourConnectionOnClose = [...tourConnection, 'onClose'];
export const TOUR_CONNECTION_MODES = {
  owner: 'owner',
  userNode: 'userNode',
};

const interestedPersonCreateOpen = [
  TEMPLATE_MANAGEMENT_VIEWSTORE,
  'interestedPersonCreateOpen',
];
const interestedPersonCreateParticipantId = [
  TEMPLATE_MANAGEMENT_VIEWSTORE,
  'interestedPersonCreateParticipantId',
];
const interestedPersonViewOpen = [
  TEMPLATE_MANAGEMENT_VIEWSTORE,
  'interestedPersonViewOpen',
];
const interestedPersonViewId = [
  TEMPLATE_MANAGEMENT_VIEWSTORE,
  'interestedPersonViewId',
];
const interestedPersonViewMode = [
  TEMPLATE_MANAGEMENT_VIEWSTORE,
  'interestedPersonViewMode',
];

const contributorsListOpen = [
  TEMPLATE_MANAGEMENT_VIEWSTORE,
  'showCopyLinkDialog',
];

const interestedListViewOpen = [
  TEMPLATE_MANAGEMENT_VIEWSTORE,
  'interestedListViewOpen',
];
const interestedListViewModeList = [
  TEMPLATE_MANAGEMENT_VIEWSTORE,
  'interestedListViewModeList',
];
const interestedListViewLayout = [
  TEMPLATE_MANAGEMENT_VIEWSTORE,
  'interestedListViewLayout',
];
const interestedListViewFilterComplete = [
  TEMPLATE_MANAGEMENT_VIEWSTORE,
  'interestedListViewFilterComplete',
];
const interestedListViewFilterPending = [
  TEMPLATE_MANAGEMENT_VIEWSTORE,
  'interestedListViewFilterPending',
];

const interestedListViewFilter = [
  TEMPLATE_MANAGEMENT_VIEWSTORE,
  'interestedListViewFilter',
];
const interestedListViewModalFilter = [
  TEMPLATE_MANAGEMENT_VIEWSTORE,
  'interestedListViewModalFilter',
];
const interestedListViewFilterValue = [
  TEMPLATE_MANAGEMENT_VIEWSTORE,
  'interestedListViewValue',
];

const participantCreateOpen = [
  TEMPLATE_MANAGEMENT_VIEWSTORE,
  'participantCreateOpen',
];
const participantCreateParentNodeId = [
  TEMPLATE_MANAGEMENT_VIEWSTORE,
  'participantCreateParentNodeId',
];
const participantCreateMode = [
  TEMPLATE_MANAGEMENT_VIEWSTORE,
  'participantCreateMode',
];
const participantWithRelationship = [
  TEMPLATE_MANAGEMENT_VIEWSTORE,
  'participantWithRelationship',
];
const participantViewOpen = [
  TEMPLATE_MANAGEMENT_VIEWSTORE,
  'participantViewOpen',
];
const participantViewId = [TEMPLATE_MANAGEMENT_VIEWSTORE, 'participantViewId'];
const participantViewMode = [
  TEMPLATE_MANAGEMENT_VIEWSTORE,
  'participantViewMode',
];
const participantViewModeFilter = [
  TEMPLATE_MANAGEMENT_VIEWSTORE,
  'participantViewModeFilter',
];
const participantViewModeModalFilter = [
  TEMPLATE_MANAGEMENT_VIEWSTORE,
  'participantViewModeModalFilter',
];

const participantViewModeModalSortBy = [
  TEMPLATE_MANAGEMENT_VIEWSTORE,
  'participantViewModeModalSortBy',
];

const participantListViewOpen = [
  TEMPLATE_MANAGEMENT_VIEWSTORE,
  'participantListViewOpen',
];
const participantListViewModeList = [
  TEMPLATE_MANAGEMENT_VIEWSTORE,
  'participantListViewModeList',
];
const participantListViewSortList = [
  TEMPLATE_MANAGEMENT_VIEWSTORE,
  'participantListViewSortList',
];
const participantListViewLayout = [
  TEMPLATE_MANAGEMENT_VIEWSTORE,
  'participantListViewLayout',
];
const participantListViewFilterConfirmed = [
  TEMPLATE_MANAGEMENT_VIEWSTORE,
  'participantListViewFilterConfirmed',
];
const participantListViewFilterPending = [
  TEMPLATE_MANAGEMENT_VIEWSTORE,
  'participantListViewFilterPending',
];
const participantListViewFilterDeclined = [
  TEMPLATE_MANAGEMENT_VIEWSTORE,
  'participantListViewFilterDeclined',
];

const showOrganisationInvitation = [
  TEMPLATE_MANAGEMENT_VIEWSTORE,
  'showOrgInvite',
];

const peopleView = [TEMPLATE_MANAGEMENT_VIEWSTORE, 'peopleView'];

const updatingTourInfo = [TEMPLATE_MANAGEMENT_VIEWSTORE, 'updatingTourInfo'];

const linkedUser = [TEMPLATE_MANAGEMENT_VIEWSTORE, 'linkedUser'];
const linkedUserPage = [...linkedUser, 'page'];
const linkedUserEmail = [...linkedUser, 'email'];
const linkedUserMessage = [...linkedUser, 'message'];
const linkedUserId = [...linkedUser, 'id'];
const linkedUserToken = [...linkedUser, 'token'];
const transferByType = [TEMPLATE_MANAGEMENT_VIEWSTORE, 'transferByType'];
const transferToUserId = [TEMPLATE_MANAGEMENT_VIEWSTORE, 'transferToUserId'];
const transferToEmail = [TEMPLATE_MANAGEMENT_VIEWSTORE, 'transferToEmail'];
const participantsCount = [TEMPLATE_MANAGEMENT_VIEWSTORE, 'participantsCount'];
const followersCount = [TEMPLATE_MANAGEMENT_VIEWSTORE, 'followersCount'];
const filterRoleBy = [TEMPLATE_MANAGEMENT_VIEWSTORE, 'filterRoleBy'];
const peopleTabOptionSelected = [
  TEMPLATE_MANAGEMENT_VIEWSTORE,
  'peopleTabOptionSelected',
];
const peopleFilterSelected = [
  TEMPLATE_MANAGEMENT_VIEWSTORE,
  'peopleFilterSelected',
];
const invitationMode = [TEMPLATE_MANAGEMENT_VIEWSTORE, 'invitationMode'];
const createLinkFollowerDialogOpen = [
  TEMPLATE_MANAGEMENT_VIEWSTORE,
  'linkFollowerDialogOpen',
];
const statsDateRangeFilter = [
  TEMPLATE_MANAGEMENT_VIEWSTORE,
  'statsDateRangeFilter',
];
/* const participantCreateCallbackOnSuccess = [
  TEMPLATE_MANAGEMENT_VIEWSTORE,
  'participantCreateCallbackOnSuccess',
]; */
const participantCreateGroupId = [
  TEMPLATE_MANAGEMENT_VIEWSTORE,
  'participantCreateGroupId',
];
const participantCreateInGroup = [
  TEMPLATE_MANAGEMENT_VIEWSTORE,
  'participantCreateInGroup',
];

const paxLabel = {
  keyPath: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'paxLabel'],
  getter: val => val || 'PAX',
};

export const TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS = {
  shareListTab,
  shareListFilter,
  updatingTourInfo,
  selectedOrgId,
  peopleView,
  participantsCount,
  followersCount,
  filterRoleBy,
  peopleTabOptionSelected,
  invitationMode,
  peopleFilterSelected,
  createLinkFollowerDialogOpen,
  statsDateRangeFilter,

  FOLLOWER_SELECTORS: {
    selectedFollowerId,
    selectedParentId,
  },

  INVITATION_DETAIL: {
    open: invitationDetailOpen,
  },

  TOUR_CONNECTION: {
    open: tourConnectionOpen,
    id: tourConnectionId,
    userId: tourConnectionUserId,
    mode: tourConnectionMode,
    onClose: tourConnectionOnClose,
  },

  INTERESTED_PERSON: {
    CREATE: {
      open: interestedPersonCreateOpen,
      participantId: interestedPersonCreateParticipantId,
    },
    VIEW: {
      open: interestedPersonViewOpen,
      id: interestedPersonViewId,
      mode: interestedPersonViewMode,
    },
  },

  CONTRIBUTORS_LIST: {
    open: contributorsListOpen,
  },

  INTERESTED_LIST: {
    open: interestedListViewOpen,
    MODE: {
      list: interestedListViewModeList,
    },
    LAYOUT: {
      list: interestedListViewLayout,
    },
    FILTER: {
      complete: interestedListViewFilterComplete,
      pending: interestedListViewFilterPending,
      view: interestedListViewFilter,
      modal: interestedListViewModalFilter,
      value: interestedListViewFilterValue,
    },
  },

  PARTICIPANT: {
    CREATE: {
      open: participantCreateOpen,
      parentNodeId: participantCreateParentNodeId,
      mode: participantCreateMode,
      withRelationship: participantWithRelationship,
      groupId: participantCreateGroupId,
      participantInGroup: participantCreateInGroup,
    },
    VIEW: {
      open: participantViewOpen,
      id: participantViewId,
      mode: participantViewMode,
      filter: participantViewModeFilter,
      modal: participantViewModeModalFilter,
      sort: participantViewModeModalSortBy,
    },
  },

  PARTICIPANT_LIST: {
    open: participantListViewOpen,
    MODE: {
      list: participantListViewModeList,
    },
    LAYOUT: {
      list: participantListViewLayout,
    },
    SORT: {
      list: participantListViewSortList,
    },
    FILTER: {
      confirmed: participantListViewFilterConfirmed,
      pending: participantListViewFilterPending,
      declined: participantListViewFilterDeclined,
    },
  },

  LINKED_USER: {
    all: linkedUser,
    page: linkedUserPage,
    email: linkedUserEmail,
    message: linkedUserMessage,
    id: linkedUserId,
    token: linkedUserToken,
  },
  TRANSFER_NODE: {
    transferByType,
    transferToUserId,
    transferToEmail,
  },
  showOrganisationInvitation,
  paxLabel,
};
