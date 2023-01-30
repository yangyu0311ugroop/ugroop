import {
  SET_UNREAD_COUNT,
  MARK_READ,
  MESSAGE_NEW,
  UPDATE_USER_WATCHERS,
  REMOVE_USER_WATCHERS,
  REMOVE_PROCESSED_ADDED_CHANNEL,
  SET_RECENT_ADD_CHANNEL,
  SET_NEWLY_ADDED_CHANNEL,
  SET_CHANNEL_DRAW_ACTIVE_CHANNEL,
  SET_TOUR_UNREAD_COUNT,
  SET_TOTAL_UNREAD,
  SET_RECENT_CHANNEL_DRAW_STATUS,
} from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {string} username The new text of the input field
 *
 * @return {object} An action object with a type of CHANGE_USERNAME
 */
export function setChannelUnRead({ count, templateId, channelId }) {
  return {
    type: SET_UNREAD_COUNT,
    count,
    templateId,
    channelId,
  };
}

export function setTourTotalUnRead({ count, templateId }) {
  return {
    type: SET_TOUR_UNREAD_COUNT,
    count,
    templateId,
  };
}

export function setNewMessage({ count, templateId, channelId, totalUnread }) {
  return {
    type: MESSAGE_NEW,
    count,
    templateId,
    channelId,
    totalUnread,
  };
}

export function markRead({ templateId, channelId }) {
  return {
    type: MARK_READ,
    templateId,
    channelId,
  };
}

export function updateUserOnlineStatus({
  templateId,
  channelId,
  userId,
  onlineStatus,
}) {
  return {
    type: UPDATE_USER_WATCHERS,
    templateId,
    channelId,
    userId,
    onlineStatus,
  };
}

export function removeUserOnlineStatus({
  templateId,
  channelId,
  userId,
  onlineStatus,
}) {
  return {
    type: REMOVE_USER_WATCHERS,
    templateId,
    channelId,
    userId,
    onlineStatus,
  };
}

export function setRecentAddChannel({ templateId, channelId }) {
  return {
    type: SET_RECENT_ADD_CHANNEL,
    templateId,
    channelId,
  };
}

export function setChannelDrawActiveChannel({ templateId, channelId }) {
  return {
    type: SET_CHANNEL_DRAW_ACTIVE_CHANNEL,
    templateId,
    channelId,
  };
}

export function setNewlyAddedChannel({ templateId, channelId }) {
  return {
    type: SET_NEWLY_ADDED_CHANNEL,
    templateId,
    channelId,
  };
}

export function removeProcessedInvitedChannel({ templateId, channelId }) {
  return {
    type: REMOVE_PROCESSED_ADDED_CHANNEL,
    templateId,
    channelId,
  };
}

export function setRecentChannelDrawStatus(value) {
  return {
    type: SET_RECENT_CHANNEL_DRAW_STATUS,
    channelDraw: value,
  };
}

export function setTotalUnreadMessage({ totalUnread }) {
  return {
    type: SET_TOTAL_UNREAD,
    totalUnread,
  };
}
