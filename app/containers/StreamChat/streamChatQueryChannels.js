import { compose } from 'redux';
import React, { useEffect, useContext } from 'react';
import { useImmer } from 'use-immer';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUserAccount } from '../../datastore/stormPathStore/selectors';
import { StreamChatContext } from '../../lib/streamChat';
import { getChatStreamId } from '../../utils/stringAdditions';
import {
  markRead,
  setChannelUnRead,
  setNewMessage,
  updateUserOnlineStatus,
  removeUserOnlineStatus,
  removeProcessedInvitedChannel,
  setTourTotalUnRead,
} from './actions';
import { makeSelectAddedChannel } from '../../datastore/streamChat/selectors';
import { ChatTypes } from '../../lib/streamChat/chatType';
import { useMessengerContext } from './messageStateContext';

export const StreamChatQueryChannels = React.memo(props => {
  const channelsRef = React.useRef();
  const [channels, setChannels] = useImmer({
    data: [],
    unwatchedChannels: [],
  });
  const [totalUnread, setTotalUnread] = useImmer({});
  const [state, dispatchCxt] = useMessengerContext();
  const streamClient = useContext(StreamChatContext);
  const listenEvents = c => {
    c.on('message.new', messageNewListener);
    c.on('message.read', messageReadListener);
    c.on('user.watching.start', userWatchingStartEvent);
    c.on('user.watching.stop', userWatchingStopEvent);
    c.on('channel.deleted', channelDeletedEvent);
    c.on('member.removed', memberRemovedEvent);
  };

  const unListenEvents = c => {
    c.off('message.new', messageNewListener);
    c.off('message.read', messageReadListener);
    c.off('user.watching.start', userWatchingStartEvent);
    c.off('user.watching.stop', userWatchingStopEvent);
    c.off('channel.deleted', channelDeletedEvent);
    c.off('member.removed', memberRemovedEvent);
  };

  const listenOnChannelEvent = channel => {
    listenEvents(channel);
  };

  const messageNewListener = async event => {
    console.log('messageNewListener event', event);
    const currentUser = props.currentUser;
    if (event.user.id !== getChatStreamId(currentUser.email, currentUser.id)) {
      const chs = await streamClient.queryChannels({
        type: ChatTypes.UGroop,
        members: { $in: [event.user.id] },
        templateId: props.templateId,
      });
      const unreadInTours = chs.reduce((acc, c) => {
        let total = acc;
        total += c.countUnread();
        return total;
      }, 0);
      props.setNewMessage({
        count: unreadInTours,
        templateId: props.templateId,
        channelId: event.cid,
        totalUnread: unreadInTours,
      });
    }
  };

  const messageReadListener = event => {
    console.log('messageReadLifstener', event);
    const currentUser = props.currentUser;
    if (event.user.id === getChatStreamId(currentUser.email, currentUser.id)) {
      props.setMarkRead({
        templateId: props.templateId,
        channelId: event.cid,
      });
    }
  };

  const userWatchingStartEvent = event => {
    // console.log('userWatchingStartEvent', event);
    props.updateUserOnlineStatus({
      templateId: props.templateId,
      channelId: event.cid,
      userId: event.user.id,
      onlineStatus: event.user.online,
    });
  };

  const userWatchingStopEvent = async event => {
    props.removeUserOnlineStatus({
      templateId: props.templateId,
      channelId: event.cid,
      userId: event.user.id,
    });
  };

  const releaseDeleteChannelResource = async (channel, cid, action) => {
    if (channel) {
      setChannels(draftState => {
        const index = _.findIndex(draftState.data, o => o.cid === cid);
        if (index !== -1) {
          draftState.data.splice(index, 1);
        }
      });
      if (action !== 'delete') {
        unListenEvents(channel);
        // const stop = await channel.stopWatching();
        dispatchCxt.addInToChannelQueue(channel);
        // console.log('release delete channel', stop);
      }
    }
  };

  const channelDeletedEvent = async event => {
    const c = _.find(channelsRef.current, o => o.cid === event.cid);
    await releaseDeleteChannelResource(c, event.cid, 'delete');
  };

  const memberRemovedEvent = async event => {
    // if removed member is login user, then we shall also clean up the channel state
    if (
      event.user.id ===
      getChatStreamId(props.currentUser.email, props.currentUser.id)
    ) {
      // login user is removed.
      const c = _.find(channelsRef.current, o => o.cid === event.cid);
      await releaseDeleteChannelResource(c, event.cid, 'leave');
    }
  };

  const setChannelUnReadMessages = channel => {
    const unreadCount = channel.countUnread();
    props.setUnreadMessages({
      count: unreadCount,
      templateId: props.templateId,
      channelId: channel.cid,
    });
  };

  const receiveChannelEvents = channel => {
    setChannelUnReadMessages(channel);
    listenOnChannelEvent(channel);
  };

  const stopWatchingChannels = chs => {
    chs.map(c => {
      unListenEvents(c);
      dispatchCxt.addInToChannelQueue(c);
      return true;
    });
  };

  const removeStoppedChannelFromList = cid => {
    dispatchCxt.dispatch(draft => {
      const index = _.findIndex(draft.stoppedChannel, o => o === cid);
      if (index >= 0) {
        draft.stoppedChannel.splice(index, 1);
      }
    });
  };
  /* Query all entire channels in a tour that user involved in, use recursive call to call all pages. */
  const queryAllChannelsInTour = async (filter, sort, options, total = []) => {
    const client = streamClient;
    const chs = await client.queryChannels(filter, sort, options); // the options includes the watch, there is no need to watch explicitly.
    total.push(...chs);
    if (chs.length < options.limit) {
      return total;
    }
    const offset = total.length + 1;
    const newOptions = {
      offset,
      limit: options.limit,
      state: options.state,
    };
    return queryAllChannelsInTour(filter, sort, newOptions, total);
  };

  useEffect(() => {
    // Create an scoped async function in the hook
    async function subscribeChannels() {
      const filter = Object.assign(
        {},
        {
          templateId: props.templateId,
        },
      );
      if (!filter.members) {
        const { email, id } = props.currentUser;
        filter.members = { $in: [getChatStreamId(email, id)] };
        filter.type = ChatTypes.UGroop;
      }
      const { watch, ...rest } = props.options;
      const chs = await queryAllChannelsInTour(filter, props.sort, rest);
      chs.forEach(c => {
        if (
          !state.channelRemoveWaitingQueue[c.cid] ||
          state.stoppedChannel.includes(c.cid)
        ) {
          console.log('watch', c.cid);
          c.watch();
          removeStoppedChannelFromList(c.cid);
        } else if (state.channelRemoveWaitingQueue[c.cid]) {
          setChannels(draft => {
            draft.unwatchedChannels.push(c);
          });
          dispatchCxt.removeFromWaitingListQueue(c.cid);
        }
      });
      chs.forEach(receiveChannelEvents);
      console.log('query init ****', chs);
      const channelInfos = _.reduce(
        chs,
        (acc, c) => {
          let total = acc.sum;
          total += c.countUnread();
          return {
            sum: total,
          };
        },
        {
          sum: 0,
        },
      );
      setTotalUnread(draft => {
        // eslint-disable-next-line no-param-reassign
        draft[props.templateId] = {
          templateId: props.templateId,
          count: channelInfos.sum,
        };
      });
      // eslint-disable-next-line no-unused-vars
      setChannels(draft => {
        // eslint-disable-next-line no-param-reassign
        draft.data = chs;
      });
      return chs;
    }
    subscribeChannels();
  }, [props.templateId, props.sort, props.options]);

  useEffect(() => {
    console.log('useEffect current total channels', channels.data);
    channelsRef.current = channels.data;
  }, [channels.data]);

  useEffect(
    () =>
      // Specify how to clean up after this effect:
      function cleanup() {
        if (props.options && props.options.watch) {
          stopWatchingChannels(channelsRef.current); // unmount clean up
        }
      },
    [],
  );

  useEffect(() => {
    async function subscribeNewInvitedChannel() {
      if (props.addedChannels && props.addedChannels.length > 0) {
        const client = streamClient;
        // find those invitedChannel was not in our channels state
        const readyToSubscribeChannels = [];
        const currentChannels = channelsRef.current;
        props.addedChannels.forEach(cid => {
          if (currentChannels.find(o => o.cid === cid) === undefined) {
            readyToSubscribeChannels.push(cid);
          }
        });
        console.log('readyToSubscribeChannels', readyToSubscribeChannels);
        console.log('subscribeNewInvitedChannel query ***');
        if (readyToSubscribeChannels.length > 0) {
          const chs = await client.queryChannels(
            {
              cid: { $in: readyToSubscribeChannels },
              members: {
                $in: [
                  getChatStreamId(
                    props.currentUser.email,
                    props.currentUser.id,
                  ),
                ],
              },
              templateId: props.templateId,
            },
            props.sort,
            props.options,
          );
          console.log('subscribeNewInvitedChannel chs', chs);
          if (chs.length > 0) {
            chs.forEach(c => {
              // maybe check watch inside the options?
              listenEvents(c);
              setChannels(draftState => {
                const index = _.findIndex(
                  draftState.data,
                  o => o.cid === c.cid,
                );
                if (index === -1) {
                  draftState.data.push(c);
                }
              });
              props.removeProcessedInvitedChannel({
                templateId: props.templateId,
                channelId: c.cid,
              });
            });
          }
        }
      }
    }
    subscribeNewInvitedChannel();
  }, [props.addedChannels]);

  useEffect(() => {
    if (!_.isEmpty(totalUnread)) {
      props.setTourTotalUnRead(totalUnread[props.templateId]);
    }
  }, [totalUnread]);

  useEffect(() => {
    if (channels.unwatchedChannels.length >= 0) {
      channels.unwatchedChannels.forEach(c => {
        if (state.stoppedChannel.includes(c.cid)) {
          console.log('watching from unwatched channel', c.cid);
          c.watch();
          removeStoppedChannelFromList(c.cid);
        }
      });
    }
  }, [channels.unwatchedChannels, state.stoppedChannel]);

  return <div />;
});

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUserAccount(),
  addedChannels: makeSelectAddedChannel,
});

export function mapDispatchToProps(dispatch) {
  return {
    setUnreadMessages: data => dispatch(setChannelUnRead(data)),
    setMarkRead: data => dispatch(markRead(data)),
    setNewMessage: data => dispatch(setNewMessage(data)),
    updateUserOnlineStatus: data => dispatch(updateUserOnlineStatus(data)),
    removeUserOnlineStatus: data => dispatch(removeUserOnlineStatus(data)),
    removeProcessedInvitedChannel: data =>
      dispatch(removeProcessedInvitedChannel(data)),
    setTourTotalUnRead: data => dispatch(setTourTotalUnRead(data)),
  };
}

StreamChatQueryChannels.propTypes = {
  sort: PropTypes.object,
  templateId: PropTypes.number,
  currentUser: PropTypes.object,
  options: PropTypes.object,
  setUnreadMessages: PropTypes.func,
  setMarkRead: PropTypes.func,
  setNewMessage: PropTypes.func,
  updateUserOnlineStatus: PropTypes.func,
  removeUserOnlineStatus: PropTypes.func,
  addedChannels: PropTypes.array,
  removeProcessedInvitedChannel: PropTypes.func,
  setTourTotalUnRead: PropTypes.func,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(StreamChatQueryChannels);
