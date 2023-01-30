/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux-immutable';
import { USERLOGOUT } from 'containers/App/constants';
import { connectRouter } from 'connected-react-router/immutable';
import history from 'utils/history';
import globalReducer from 'containers/App/reducer';
import languageProviderReducer from 'containers/LanguageProvider/reducer';
import {
  TEMPLATE_MANAGEMENT_DATASTORE,
  TEMPLATE_MANAGEMENT_VIEWSTORE,
  MY_TEMPLATES_DATASTORE,
  NOTIFICATION_DATASTORE,
  SHARED_TEMPLATES_DATASTORE,
  DISCUSSION_DATASTORE,
  APP_DATA_CACHE,
  USER_DATA_STORE,
  PERSON_DATA_STORE,
  ORGANISATION_DATA_STORE,
  ABILITY_DATA_STORE,
  NODE_STORE,
  INVITATION_STORE,
  INVITATION_VIEW_STORE,
  NODE_TRAILS_DATASTORE,
  FOLDER_EXPLORER_DATASTORE,
  DASHBOARD_VIEW_STORE,
  INVITATION_SWITCH_ACCOUNT_STORE,
  COORDINATE_DATA_STORE,
  FILE_DATA_STORE,
  PHONE_DATA_STORE,
  COGNITO_ACCOUNTSTORE,
  EVENT_STORE,
  ORGANISATION_VIEWSTORE,
  GEOCODE_STORE,
  ATTACHMENT_DATASTORE,
  LOCAL_USER_STORE,
  SUBSCRIPTION_VIEW_STORE,
} from 'appConstants';
import { reducer } from 'resaga';

// tell resaga to clear store on USERLOGOUT
export const customReducer = {
  [USERLOGOUT]: store => store.clear(),
};

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    global: globalReducer,
    language: languageProviderReducer,
    [COGNITO_ACCOUNTSTORE]: reducer(COGNITO_ACCOUNTSTORE, customReducer),
    [ABILITY_DATA_STORE]: reducer(ABILITY_DATA_STORE, customReducer),
    [SHARED_TEMPLATES_DATASTORE]: reducer(
      SHARED_TEMPLATES_DATASTORE,
      customReducer,
    ),
    [TEMPLATE_MANAGEMENT_DATASTORE]: reducer(
      TEMPLATE_MANAGEMENT_DATASTORE,
      customReducer,
    ),
    [TEMPLATE_MANAGEMENT_VIEWSTORE]: reducer(
      TEMPLATE_MANAGEMENT_VIEWSTORE,
      customReducer,
    ),
    [MY_TEMPLATES_DATASTORE]: reducer(MY_TEMPLATES_DATASTORE, customReducer),
    [NOTIFICATION_DATASTORE]: reducer(NOTIFICATION_DATASTORE, customReducer),
    [DISCUSSION_DATASTORE]: reducer(DISCUSSION_DATASTORE, customReducer),
    [APP_DATA_CACHE]: reducer(APP_DATA_CACHE, customReducer),
    [USER_DATA_STORE]: reducer(USER_DATA_STORE, customReducer),
    [PERSON_DATA_STORE]: reducer(PERSON_DATA_STORE, customReducer),
    [ORGANISATION_DATA_STORE]: reducer(ORGANISATION_DATA_STORE, customReducer),
    [NODE_STORE]: reducer(NODE_STORE, customReducer),
    [INVITATION_STORE]: reducer(INVITATION_STORE, customReducer),
    [INVITATION_VIEW_STORE]: reducer(INVITATION_VIEW_STORE, customReducer),
    [DASHBOARD_VIEW_STORE]: reducer(DASHBOARD_VIEW_STORE, customReducer),
    [NODE_TRAILS_DATASTORE]: reducer(NODE_TRAILS_DATASTORE, customReducer),
    [FOLDER_EXPLORER_DATASTORE]: reducer(
      FOLDER_EXPLORER_DATASTORE,
      customReducer,
    ),
    [FILE_DATA_STORE]: reducer(FILE_DATA_STORE, customReducer),
    [INVITATION_SWITCH_ACCOUNT_STORE]: reducer(INVITATION_SWITCH_ACCOUNT_STORE),
    [COORDINATE_DATA_STORE]: reducer(COORDINATE_DATA_STORE, customReducer),
    [PHONE_DATA_STORE]: reducer(PHONE_DATA_STORE, customReducer),
    [EVENT_STORE]: reducer(EVENT_STORE, customReducer),
    [GEOCODE_STORE]: reducer(GEOCODE_STORE, customReducer),
    [ATTACHMENT_DATASTORE]: reducer(ATTACHMENT_DATASTORE, customReducer),
    [ORGANISATION_VIEWSTORE]: reducer(ORGANISATION_VIEWSTORE, customReducer),
    [LOCAL_USER_STORE]: reducer(LOCAL_USER_STORE),
    [SUBSCRIPTION_VIEW_STORE]: reducer(SUBSCRIPTION_VIEW_STORE),
    router: connectRouter(history),
    ...injectedReducers,
  });
  return rootReducer;
}
