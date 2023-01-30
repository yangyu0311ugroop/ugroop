import {
  TEMPLATE_MANAGEMENT_VIEWSTORE,
  TEMPLATE_MANAGEMENT_DATASTORE,
} from 'appConstants';
import { createCachedSelector } from 're-reselect';

const getUpdatingTourInfo = createCachedSelector(
  state => state.get(TEMPLATE_MANAGEMENT_VIEWSTORE).get('updatingTourInfo'),
  updatingTourInfo => updatingTourInfo,
)((_, id) => `getUpdatingTourInfo.${id}`);

const getStatsDateRangeFilter = createCachedSelector(
  state => state.get(TEMPLATE_MANAGEMENT_VIEWSTORE).get('statsDateRangeFilter'),
  statsDateRangeFilter => statsDateRangeFilter,
)((_, id) => `getSTatsDateRangeFilter.${id}`);

const getSortMode = createCachedSelector(
  state =>
    state.get(TEMPLATE_MANAGEMENT_VIEWSTORE).get('participantListViewSortList'),
  sortMode => sortMode,
)(() => `getSortMode`);

const getTemplateViewStoreKey = (state, props) =>
  state.get(TEMPLATE_MANAGEMENT_VIEWSTORE).get(props.key);

const getCurrentTemplateId = createCachedSelector(
  state => state.get(TEMPLATE_MANAGEMENT_DATASTORE).get('id'),
  id => id,
)((_, id) => `templateManagementStore.getCurrentTemplateId.${id}`);

export const VIEW_STORE_ATTRIBUTES = {
  inviteeId: 'inviteeId',
  inviteeEmail: 'inviteeEmail',
  filterRoleBy: 'filterRoleBy',
  selectedOrgId: 'selectedOrgId',
  updatingTourInfo: 'updatingTourInfo',
};
export const TEMPLATE_VIEWSTORE_RESELECTORS = {
  getUpdatingTourInfo,
  getStatsDateRangeFilter,
  getSortMode,
  getTemplateViewStoreKey,
};

export const TEMPLATE_DATASTORE_RESELECTORS = {
  getCurrentTemplateId,
};
