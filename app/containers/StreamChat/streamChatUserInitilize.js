import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { createStructuredSelector } from 'reselect';
import { NameUtility } from 'utils/displayNameUtility';
import { withRouter } from 'react-router';
import { StreamChatContext } from '../../lib/streamChat';
import { makeSelectLoginStatus } from '../../datastore/globalStore/selectors';
import { USERLOGIN, USERLOGOUT } from '../App/constants';
import {
  selectCurrentUserAccount,
  selectCurrentLoginPerson,
} from '../../datastore/stormPathStore/selectors';
import { queryImageURL } from '../../utils/helpers/request';
import { getChatStreamId, isEmptyString } from '../../utils/stringAdditions';
import { URL_HELPERS } from '../../appConstants';
import {
  setNewlyAddedChannel,
  setRecentAddChannel,
  setTotalUnreadMessage,
} from './actions';
import { useMessengerContext } from './messageStateContext';
import { sleep } from '../../utils/timeUtility';
export const StreamChatComponent = React.memo(props => {
  const addedToChannel = async event => {
    console.log('addedToChannel', event);
    const client = streamClient;
    const filter = { cid: event.channel.cid };
    const channels = await client.queryChannels(
      filter,
      {},
      {
        limit: 1,
      },
    );
    if (channels.length > 0) {
      const addedChannel = channels[0];
      const templateId = addedChannel.data.templateId;
      if (
        props.history.location.pathname.includes(URL_HELPERS.tours(templateId))
      ) {
        props.setNewlyAddedChannel({
          templateId,
          channelId: addedChannel.cid,
        });
        if (
          // created by login user
          event.channel.created_by.id ===
          getChatStreamId(props.currentUser.email, props.currentUser.id)
        ) {
          if (props.setRecentAddChannel) {
            props.setRecentAddChannel({
              templateId,
              channelId: addedChannel.cid,
            });
          }
        }
      }
    }
  };
  // const messageNew = async event => {
  //   console.log('messageNEW', event.total_unread_count);
  //   props.setTotalUnreadMessage({
  //     totalUnread: event.total_unread_count,
  //   });
  // };
  const markRead = async event => {
    console.log('markRead', event.total_unread_count);
    await sleep(3000);
    props.setTotalUnreadMessage({
      totalUnread: event.total_unread_count,
    });
  };
  const streamClient = useContext(StreamChatContext);
  const subscribeNotificationEvents = client => {
    const notificationListener =
      client.listeners['notification.added_to_channel'];
    const markReadListener = client.listeners['notification.mark_read'];
    // const messageNewListener = client.listeners['notification.message_new'];
    if (
      _.isEmpty(notificationListener) ||
      (notificationListener && notificationListener.length === 0)
    ) {
      client.on('notification.added_to_channel', addedToChannel);
    }
    if (
      _.isEmpty(markReadListener) ||
      (markReadListener && markReadListener.length === 0)
    ) {
      client.on('notification.mark_read', markRead);
    }
    // if (
    //   _.isEmpty(messageNewListener) ||
    //   (messageNewListener && messageNewListener.length === 0)
    // ) {
    //   client.on('notification.message_new', messageNew);
    // }
  };

  const [, dispatch] = useMessengerContext();
  const createMetaInfo = photo => {
    const { x, y, width, height } = photo;
    if (
      !isEmptyString(x) &&
      !isEmptyString(y) &&
      !isEmptyString(width) &&
      !isEmptyString(height)
    ) {
      return `h=${height}&w=${width}&x=${x}&y=${y}`;
    }
    return '';
  };

  useEffect(() => {
    const setStreamChatUser = async currentUser => {
      const client = streamClient;
      const { email, id } = currentUser;
      const streamChatId = getChatStreamId(email, id);
      client.disconnect();
      try {
        if (!client.user) {
          subscribeNotificationEvents(client);
          const user = await client.setUser(
            {
              id: streamChatId,
            },
            client.devToken(streamChatId), // Temporarily use Dev Token, in Production, token shall come from server side.
          );
          if (user) {
            dispatch.setHasStreamUser(true);
            if (user.me) {
              props.setTotalUnreadMessage({
                totalUnread: user.me.total_unread_count,
              });
            }
          }
        }
      } catch (e) {
        console.error(e);
      }
    };

    if (props.loginStatus === USERLOGIN || props.loginStatus === '') {
      // streamChat set user
      if (props.currentUser) {
        setStreamChatUser(props.currentUser);
      }
    } else if (props.loginStatus === USERLOGOUT) {
      // streamChat remove user
      if (streamClient.connecting) {
        dispatch.setHasStreamUser(false);
        streamClient.off('notification.added_to_channel', addedToChannel);
        streamClient.off('notification.mark_read', markRead);
        // streamClient.off('notification.message_new', messageNew);
      }
    }
    return function cleanup() {
      streamClient.off('notification.added_to_channel', addedToChannel);
      streamClient.off('notification.mark_read', markRead);
      // streamClient.off('notification.message_new', messageNew);
    };
  }, [props.loginStatus, props.currentUser]);

  useEffect(() => {
    const updateUser = async (currentUser, currentPersonData) => {
      const { email, id } = currentUser;
      try {
        const displayName = NameUtility.userDisplayName(currentPersonData);
        // if (!displayName.includes(' ')) {
        //   displayName = `${displayName} `;
        // }
        const { photo } = props.currentPersonData;
        const userData = {
          id: getChatStreamId(email, id),
          name: displayName,
        };
        if (photo) {
          const metaInfo = createMetaInfo(photo);
          const photoData = queryImageURL(photo.url, true, 50, metaInfo);
          userData.image = photoData;
        }
        if (client.user) {
          console.log('updateUser');
          await client.updateUsers([userData]);
        }
      } catch (e) {
        console.error(e);
      }
    };
    const client = streamClient;
    if (props.currentUser && props.currentPersonData) {
      updateUser(props.currentUser, props.currentPersonData);
    }
  }, [props.currentUser, props.currentPersonData]);

  return <React.Fragment />;
});

const mapStateToProps = createStructuredSelector({
  loginStatus: makeSelectLoginStatus(),
  currentUser: selectCurrentUserAccount(),
  currentPersonData: selectCurrentLoginPerson(),
});

StreamChatComponent.propTypes = {
  loginStatus: PropTypes.string,
  currentUser: PropTypes.object,
  currentPersonData: PropTypes.object,
  history: PropTypes.object,
  setNewlyAddedChannel: PropTypes.func,
  setRecentAddChannel: PropTypes.func,
  setTotalUnreadMessage: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    setNewlyAddedChannel: data => dispatch(setNewlyAddedChannel(data)),
    setRecentAddChannel: data => dispatch(setRecentAddChannel(data)),
    setTotalUnreadMessage: data => dispatch(setTotalUnreadMessage(data)),
  };
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withRouter,
)(StreamChatComponent);
