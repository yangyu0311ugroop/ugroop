import {
  GET_INVITATIONS,
  GET_ROLES,
  USER_API,
  GET_RECENT_ACTIVITY,
  HIDE_RECENT_ACTIVITY,
  ME,
  PERSON_SYNC,
  GET_ORGANISATION_INVITATIONS,
  REGISTER_DEVICE,
  GET_USER_PREFERENCE,
  UPDATE_USER_PREFERENCE,
  GET_USER_RELATED_TEMPLATES,
  GET_USER_NODE,
  GET_TRANSFER_NODE_LIST,
  GET_PERSONAL_PREFERENCES,
  UPSERT_PERSONAL_PREFERENCES,
} from 'apis/constants';
import PropTypes from 'prop-types';
import { Component } from 'react';
import { compose } from 'redux';
import resaga, { reducer } from 'resaga';
import injectReducer from 'utils/injectReducer';
import { CONFIG } from './config';

export class User extends Component {
  componentDidMount = () => {
    const { id } = this.props;
    if (id) this.props.resaga.dispatch({}, GET_USER_NODE);
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.id !== this.props.id) {
      if (nextProps.id) this.props.resaga.dispatch({}, GET_USER_NODE);
    }
    this.props.resaga.analyse(nextProps, {
      [GET_INVITATIONS]: { onSuccess: this.props.resaga.setValue },
      [GET_ORGANISATION_INVITATIONS]: { onSuccess: this.props.resaga.setValue },
      [GET_ROLES]: { onSuccess: this.props.resaga.setValue },
      [GET_RECENT_ACTIVITY]: { onSuccess: this.props.resaga.setValue },
      [GET_USER_RELATED_TEMPLATES]: { onSuccess: this.props.resaga.setValue },
      [ME]: { onSuccess: this.getMeSuccess },
      [PERSON_SYNC]: { onSuccess: this.personSyncSuccess },
      [REGISTER_DEVICE]: { onSuccess: this.registerDeviceSuccess },
      [GET_USER_PREFERENCE]: { onSuccess: this.props.resaga.setValue },
      [UPDATE_USER_PREFERENCE]: { onSuccess: this.props.resaga.setValue },
      [HIDE_RECENT_ACTIVITY]: { onSuccess: this.props.resaga.setValue },
      [GET_USER_NODE]: { onSuccess: this.getUserNodeSuccess },
      [GET_USER_NODE]: { onSuccess: this.getUserNodeSuccess },
      [GET_TRANSFER_NODE_LIST]: { onSuccess: this.props.resaga.setValue },
      [GET_PERSONAL_PREFERENCES]: { onSuccess: this.props.resaga.setValue },
      [UPSERT_PERSONAL_PREFERENCES]: { onSuccess: this.props.resaga.setValue },
    });
  };

  shouldComponentUpdate = () => false;

  getUserNodeSuccess = ({ userNode }) => {
    this.props.resaga.setValue({
      userNode,
    });
  };

  getMeSuccess = data => {
    this.props.resaga.setValue({
      loginAcctUser: data.user,
      loginAcctOrg: data.orgLists,
      loginAcctPerson: data.person,
      loginAcctRelatedOrgs: data.userRelatedOrgs,
      customerUsers: data.customerRelations.users,
      customerOrgs: data.customerRelations.orgs,
      subscriptions: data.subscriptions,
      subscriptionItems: data.subscriptionItems,
      paymentSources: data.paymentSources,
    });
  };

  personSyncSuccess = data => {
    this.props.resaga.setValue({
      loginAcctUser: data.userViewModel,
    });
  };

  registerDeviceSuccess = (data, payload) => {
    this.props.resaga.setValue({
      loginDeviceToken: payload.data.token,
    });
  };

  render = () => false;
}

User.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number,

  // resaga props
};

User.defaultProps = {};

export default compose(
  injectReducer({ key: USER_API, reducer: reducer(USER_API) }),
  resaga(CONFIG),
)(User);
