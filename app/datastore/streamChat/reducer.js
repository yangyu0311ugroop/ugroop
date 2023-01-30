import produce from 'immer';
import dotProp from 'dot-prop';
import _ from 'lodash';
import {
  SET_UNREAD_COUNT,
  MARK_READ,
  MESSAGE_NEW,
  SET_CHANNEL_DETAIL,
  UPDATE_USER_WATCHERS,
  REMOVE_USER_WATCHERS,
  GET_TEMPLATE_PEOPLE_SUCCESS,
  SET_RECENT_ADD_CHANNEL,
  SET_NEWLY_ADDED_CHANNEL,
  SET_CHANNEL_DRAW_ACTIVE_CHANNEL,
  REMOVE_PROCESSED_ADDED_CHANNEL,
  SET_TOUR_UNREAD_COUNT,
  SET_TOTAL_UNREAD,
  SET_RECENT_CHANNEL_DRAW_STATUS,
} from '../../containers/StreamChat/constants';

// The initial state of the App
export const initialState = {
  tours: {},
  openChannelDetail: false,
  totalUnread: 0,
  channelDraw: false,
};

/* eslint-disable default-case, no-param-reassign */
const streamChatReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_UNREAD_COUNT:
        if (draft.tours[action.templateId]) {
          dotProp.set(
            draft.tours[action.templateId],
            `channels.${[action.channelId]}`,
            action.count,
          );
          draft.tours[action.templateId].count = action.total;
        } else {
          draft.tours[action.templateId] = {
            count: action.total,
            channels: {
              [action.channelId]: action.count,
            },
            presence: {},
          };
        }
        break;
      case SET_TOUR_UNREAD_COUNT: {
        dotProp.set(draft.tours[action.templateId], `count`, action.count);
        break;
      }
      case MESSAGE_NEW: {
        console.log('MESSAGE_NEW reducer', action);
        dotProp.set(
          draft.tours[action.templateId],
          `count`,
          action.totalUnread,
        );
        const preValue = dotProp.get(
          draft.tours[action.templateId],
          `channels.${[action.channelId]}`,
          0,
        );
        dotProp.set(
          draft.tours[action.templateId],
          `channels.${[action.channelId]}`,
          preValue + 1,
        );
        break;
      }
      case MARK_READ: {
        console.log('MESSAGE_NEW reducer', action);
        const count = draft.tours[action.templateId].channels[action.channelId];
        const totalCount = draft.tours[action.templateId].count;
        if (totalCount > count) {
          draft.tours[action.templateId].count -= count;
        } else {
          draft.tours[action.templateId].count = 0;
        }
        dotProp.set(
          draft.tours[action.templateId],
          `channels.${action.channelId}`,
          0,
        );
        break;
      }
      case SET_CHANNEL_DETAIL: {
        draft.openChannelDetail = action.isOpen;
        break;
      }
      case UPDATE_USER_WATCHERS: {
        dotProp.set(
          draft.tours[action.templateId],
          `watchers.${action.channelId}.${action.userId}`,
          action.onlineStatus,
        );
        break;
      }
      case REMOVE_USER_WATCHERS: {
        if (
          draft.tours[action.templateId] &&
          draft.tours[action.templateId].watchers &&
          draft.tours[action.templateId].watchers[action.channelId]
        ) {
          delete draft.tours[action.templateId].watchers[action.channelId][
            action.userId
          ];
        }
        break;
      }
      case GET_TEMPLATE_PEOPLE_SUCCESS: {
        dotProp.set(
          draft.tours,
          `${[action.result.templateId]}.userNodes`,
          action.result.userNodeUserIdsPerTour,
        );
        dotProp.set(
          draft.tours,
          `${[action.result.templateId]}.userNodeIds`,
          action.result.userNodeIdsPerTour,
        );
        break;
      }
      case SET_RECENT_ADD_CHANNEL: {
        dotProp.set(
          draft.tours,
          `${action.templateId}.newChannel`,
          action.channelId,
        );
        break;
      }
      case SET_CHANNEL_DRAW_ACTIVE_CHANNEL: {
        dotProp.set(
          draft.tours,
          `${action.templateId}.channelDrawActiveChannel`,
          action.channelId,
        );
        break;
      }
      case SET_NEWLY_ADDED_CHANNEL: {
        const addedChannel = draft.tours[action.templateId].addedChannel;
        if (Array.isArray(addedChannel)) {
          const index = _.findIndex(addedChannel, o => o === action.channelId);
          if (index === -1) {
            addedChannel.push(action.channelId);
          }
        } else {
          dotProp.set(draft.tours, `${[action.templateId]}.addedChannel`, [
            action.channelId,
          ]);
        }
        break;
      }
      case REMOVE_PROCESSED_ADDED_CHANNEL: {
        const addedChannel = draft.tours[action.templateId].addedChannel;
        if (Array.isArray(addedChannel)) {
          const index = _.findIndex(addedChannel, o => o === action.channelId);
          if (index !== -1) {
            addedChannel.splice(index, 1);
          }
        }
        break;
      }
      case SET_TOTAL_UNREAD: {
        draft.totalUnread = action.totalUnread;
        break;
      }
      case SET_RECENT_CHANNEL_DRAW_STATUS: {
        draft.channelDraw = action.channelDraw;
        break;
      }
    }
  });

export default streamChatReducer;
