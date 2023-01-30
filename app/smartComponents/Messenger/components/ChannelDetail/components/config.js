import { STREAM_CHAT_STORE_IMMER } from 'appConstants';
import { PORTAL_HELPERS } from '../../../../../containers/Portal/helpers';

export const CONFIG = {
  value: {
    onlineStatus: ({ templateId, channelId, userId }) => [
      STREAM_CHAT_STORE_IMMER,
      'tours',
      templateId,
      'watchers',
      channelId,
      userId,
    ],
  },
};

export const CONFIG2 = {
  value: {
    channelWatchers: ({ templateId, channelId }) => [
      STREAM_CHAT_STORE_IMMER,
      'tours',
      templateId,
      'watchers',
      channelId,
    ],
  },
};

export const CONFIG3 = {
  setValue: {
    ...PORTAL_HELPERS.setValue,
  },
};
