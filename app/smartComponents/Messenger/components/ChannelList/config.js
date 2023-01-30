import {
  STREAM_CHAT_STORE_IMMER,
  TEMPLATE_MANAGEMENT_DATASTORE,
} from '../../../../appConstants';

export const CONFIG = {
  value: {
    templateId: [TEMPLATE_MANAGEMENT_DATASTORE, 'id'],
  },
};

export const CONFIG2 = {
  value: {
    newChannelId: ({ templateId }) => [
      STREAM_CHAT_STORE_IMMER,
      'tours',
      templateId,
      'newChannel',
    ],
    channelDrawActiveChannelId: ({ templateId }) => [
      STREAM_CHAT_STORE_IMMER,
      'tours',
      templateId,
      'channelDrawActiveChannel',
    ],
    archivedChannels: ({ templateId }) => [
      STREAM_CHAT_STORE_IMMER,
      'tours',
      templateId,
      'archivedChannel',
    ],
    resetActiveChannelId: ({ templateId }) => [
      STREAM_CHAT_STORE_IMMER,
      'tours',
      templateId,
      'resetActiveChannel',
    ],
  },
};
