import {
  TEMPLATE_API,
  FETCH_EVENTS,
  CREATE_EVENT,
  PATCH_EVENT,
  DELETE_EVENT,
  CREATE_FLIGHT_BOOKING,
  PATCH_FLIGHT_BOOKING,
  DELETE_FLIGHT_BOOKING,
  GET_PEOPLE,
  GET_PERSON,
  BATCH_RECENT_ACTIVITY,
  REMOVE_TEMPLATE,
  GET_TEMPLATE_DETAIL,
  GET_TEMPLATE_FEATURED_LIST,
  CHANGE_ROLE,
  ADD_ROLE,
  FIND_ORGANISATION_ID,
  GET_TEMPLATE_HASHKEY,
  CREATE_EVENT_ATTACHMENT,
  DELETE_EVENT_ATTACHMENT,
  PATCH_EVENT_ATTACHMENT,
  REMOVE_USER_FROM_TOUR,
  INIT_TEMPLATE_SETTINGS,
  UPSERT_TEMPLATE_SETTING,
  GET_PARTICIPANTS,
  UPDATE_HASHKEY,
  ACCEPT_TOUR_OWNERSHIP,
  POST_HASHKEY,
  REMOVE_HASHKEY,
  ADD_MY_OWN_ROLE,
  CHANGE_CUSTOM_USER_ROLE,
  UPSERT_TEMPLATE_SETTINGS,
} from 'apis/constants';
import { SHOW_ERROR_IN_SNACKBAR } from 'error-messages';
import PropTypes from 'prop-types';
import { Component } from 'react';
import { compose } from 'redux';
import resaga, { reducer } from 'resaga';
import upsertHelpers from 'utils/helpers/upsertStore';
import injectReducer from 'utils/injectReducer';
import { TEMPLATE_API_EVENT_UTILS } from './utils/events';
import { CONFIG } from './config';

export class Template extends Component {
  componentWillReceiveProps = nextProps =>
    this.props.resaga.analyse(nextProps, {
      [FETCH_EVENTS]: {
        onSuccess: TEMPLATE_API_EVENT_UTILS.upsertEvents(this.props),
      },
      [CREATE_EVENT]: {
        onSuccess: TEMPLATE_API_EVENT_UTILS.upsertEvent(this.props),
        onError: SHOW_ERROR_IN_SNACKBAR(this.props.resaga),
      },
      [PATCH_EVENT]: {
        onSuccess: TEMPLATE_API_EVENT_UTILS.upsertEvent(this.props),
        onError: SHOW_ERROR_IN_SNACKBAR(this.props.resaga),
      },
      [DELETE_EVENT]: {
        onSuccess: TEMPLATE_API_EVENT_UTILS.deleteEvent(this.props),
        onError: SHOW_ERROR_IN_SNACKBAR(this.props.resaga),
      },
      [CREATE_FLIGHT_BOOKING]: {
        onSuccess: TEMPLATE_API_EVENT_UTILS.upsertFlightBooking(this.props),
        onError: SHOW_ERROR_IN_SNACKBAR(this.props.resaga),
      },
      [PATCH_FLIGHT_BOOKING]: {
        onSuccess: TEMPLATE_API_EVENT_UTILS.upsertFlightBooking(this.props),
        onError: SHOW_ERROR_IN_SNACKBAR(this.props.resaga),
      },
      [DELETE_FLIGHT_BOOKING]: {
        onSuccess: TEMPLATE_API_EVENT_UTILS.deleteFlightBooking(this.props),
        onError: SHOW_ERROR_IN_SNACKBAR(this.props.resaga),
      },
      [GET_PEOPLE]: { onSuccess: this.props.resaga.setValue },
      [GET_PERSON]: { onSuccess: this.props.resaga.setValue },
      [BATCH_RECENT_ACTIVITY]: { onSuccess: this.props.resaga.setValue },
      [GET_TEMPLATE_DETAIL]: { onSuccess: this.props.resaga.setValue },
      [GET_TEMPLATE_FEATURED_LIST]: { onSuccess: this.props.resaga.setValue },
      [CHANGE_ROLE]: { onSuccess: this.props.resaga.setValue },
      [ADD_ROLE]: { onSuccess: this.props.resaga.setValue },
      [REMOVE_TEMPLATE]: { onSuccess: this.props.resaga.setValue },
      [FIND_ORGANISATION_ID]: { onSuccess: this.props.resaga.setValue },
      [GET_TEMPLATE_HASHKEY]: { onSuccess: this.props.resaga.setValue },
      [CREATE_EVENT_ATTACHMENT]: { onSuccess: this.props.resaga.setValue },
      [DELETE_EVENT_ATTACHMENT]: { onSuccess: this.props.resaga.setValue },
      [PATCH_EVENT_ATTACHMENT]: { onSuccess: this.props.resaga.setValue },
      [REMOVE_USER_FROM_TOUR]: { onSuccess: this.props.resaga.setValue },
      [INIT_TEMPLATE_SETTINGS]: { onSuccess: this.props.resaga.setValue },
      [UPSERT_TEMPLATE_SETTING]: { onSuccess: this.props.resaga.setValue },
      [UPSERT_TEMPLATE_SETTINGS]: { onSuccess: this.props.resaga.setValue },
      [GET_PARTICIPANTS]: { onSuccess: this.props.resaga.setValue },
      [UPDATE_HASHKEY]: { onSuccess: this.props.resaga.setValue },
      [ACCEPT_TOUR_OWNERSHIP]: {
        onSuccess: this.props.resaga.setValue,
        onError: SHOW_ERROR_IN_SNACKBAR(this.props.resaga),
      },
      [POST_HASHKEY]: {
        onSuccess: this.onHashKeySuccess,
        onError: this.onHashKeyError,
      },
      [REMOVE_HASHKEY]: {
        onSuccess: this.onRemovedHashKeySuccess,
        onError: this.onHashKeyError,
      },
      [ADD_MY_OWN_ROLE]: { onSuccess: this.props.resaga.setValue },
      [CHANGE_CUSTOM_USER_ROLE]: { onSuccess: this.props.resaga.setValue },
    });

  onHashKeySuccess = ({ hashkey }, { id }) => {
    if (hashkey) {
      this.handleSetHashkey(id, hashkey);
    }
  };

  onHashKeyError = (_, { id }) => {
    this.handleSetHashkey(id);
  };

  onRemovedHashKeySuccess = ({ count }, { id }) => {
    if (count === 1) {
      this.handleSetHashkey(id);
    }
  };

  handleSetHashkey = (id, hashkey = null) => {
    this.props.resaga.setValue({
      nodes: upsertHelpers.deepMerge({
        [id]: { hashkey, disableRYI: false },
      }),
    });
  };

  shouldComponentUpdate = () => false;

  render = () => null;
}

Template.propTypes = {
  // hoc
  resaga: PropTypes.object.isRequired,
};

Template.defaultProps = {};

export default compose(
  injectReducer({ key: TEMPLATE_API, reducer: reducer(TEMPLATE_API) }),
  resaga(CONFIG),
)(Template);
