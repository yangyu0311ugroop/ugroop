import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import resaga from 'resaga';
import { toast } from 'ugcomponents/Toast';
import { get } from 'lodash';
import { connect } from 'react-redux';
import { withFirebase } from '../../lib/firebase';
import { CONFIG } from './config';
import {
  REGISTER_DEVICE,
  USER_API,
  GET_ORGANISATION_INVITATIONS,
  GET_INVITATIONS,
  ORGANISATION_API,
  GET_ORG_MEMBERS,
  NOTIFICATION_API,
  GET_UGROOP_NOTIFICATION,
  ABILITY_API,
  FIND_MY_ABILITIES,
  GET_TRANSFER_NODE_LIST,
} from '../../apis/constants';
import { messageType } from '../../utils/constant';
import { PENDING, CONFIRMED } from '../../datastore/invitationStore/constants';
import { setTotalUnreadMessage } from '../StreamChat/actions';

export class FireBaseComponent extends React.Component {
  componentDidMount = () => {
    this.props.firebase.requestFCMPermission(this.registerDevice);
    this.props.firebase.foregroundMessage(this.localMessageCB);
    this.props.firebase.subscribeNotificationChanges(
      this.props.id,
      this.handleLiveUpdate,
    );
    this.props.firebase.subscribeChatChanges(
      this.props.id,
      this.handleChatUpdate,
    );
  };

  shouldComponentUpdate = () => false;

  componentWillUnmount = () => {
    this.props.firebase.unsubscribeNotificationLiveUpdate();
    this.props.firebase.callUnsubscribeOnMessage();
    this.props.firebase.unsubscribeChatLiveUpdate();
  };

  handleClick = url => () => {
    this.props.history.push(url);
  };

  makeToast = data => {
    const json = JSON.parse(data.notification);
    const body = json.body;
    return {
      content: body,
      options: {
        type: messageType.INFO,
        onClick: this.handleClick(data.clickUri),
        toastOptions: {
          autoClose: 15000,
        },
      },
    };
  };

  localMessageCB = payload => {
    const data = payload.data;
    const { content, options } = this.makeToast(data);
    toast.notify(content, options);
  };

  registerDevice = token => {
    this.props.resaga.dispatchTo(USER_API, REGISTER_DEVICE, {
      payload: { id: this.props.id, data: { token } },
    });
  };

  handleLiveUpdate = data => {
    this.fetchLiveUpdateData(data.notification, data.response);
  };

  handleChatUpdate = data => {
    this.props.setTotalUnreadMessage({
      totalUnread: data.userData.user.total_unread_count,
    });
  };

  fetchLiveUpdateData = notification => {
    this.props.resaga.dispatchTo(NOTIFICATION_API, GET_UGROOP_NOTIFICATION, {});
    if (notification.type === 'orgInvitation') {
      this.props.resaga.dispatchTo(USER_API, GET_ORGANISATION_INVITATIONS, {});
    }
    if (notification.type === 'tourInvitation') {
      this.props.resaga.dispatchTo(USER_API, GET_INVITATIONS, {
        payload: {
          status: PENDING,
          myUserId: this.props.id,
        },
      });
    }
    if (notification.type === 'tourTransfer') {
      const { metaInfo } = notification;
      const result = JSON.parse(metaInfo);
      this.props.resaga.dispatchTo(USER_API, GET_TRANSFER_NODE_LIST, {
        payload: {
          status: PENDING,
          myUserId: this.props.id,
          nodeId: notification.nodeId,
          linkToken: notification.linkToken,
        },
      });
      if (result.status === CONFIRMED) {
        const { match } = this.props;
        const currentTourId = Number.parseInt(get(match, 'params.id', 0), 10);
        this.props.resaga.dispatchTo(ABILITY_API, FIND_MY_ABILITIES, {});
        if (currentTourId && notification.nodeId === currentTourId) {
          this.props.resaga.setValue({ refresh: Date.now() });
        }
      }
    }
    if (notification.type === 'acceptOrgInvitation') {
      this.props.resaga.dispatchTo(ORGANISATION_API, GET_ORG_MEMBERS, {
        payload: {
          id: notification.orgId,
        },
      });
    }
    if (notification.type === 'changeOrgRole') {
      this.props.resaga.dispatchTo(ABILITY_API, FIND_MY_ABILITIES, {});
      this.props.resaga.dispatchTo(ORGANISATION_API, GET_ORG_MEMBERS, {
        payload: {
          id: notification.orgId,
        },
      });
    }
    if (notification.type === 'changeTourRole') {
      this.props.resaga.dispatchTo(ABILITY_API, FIND_MY_ABILITIES, {});
    }
  };

  render = () => <React.Fragment />;
}

export function mapDispatchToProps(dispatch) {
  return {
    setTotalUnreadMessage: data => dispatch(setTotalUnreadMessage(data)),
  };
}

FireBaseComponent.propTypes = {
  id: PropTypes.number,
  resaga: PropTypes.object,
  firebase: PropTypes.object,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  setTotalUnreadMessage: PropTypes.func,
};

export default compose(
  withFirebase,
  connect(
    null,
    mapDispatchToProps,
  ),
  resaga(CONFIG),
  withRouter,
)(FireBaseComponent);
