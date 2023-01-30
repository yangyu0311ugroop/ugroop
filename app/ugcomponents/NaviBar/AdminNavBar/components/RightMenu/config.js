import { STREAM_CHAT_STORE_IMMER } from 'appConstants';
import { chatDrawerKeepOpen } from '../LeftMenu/config';

export const CONFIG = {
  value: {
    isChatDrawerOpen: chatDrawerKeepOpen,
    totalUnread: [STREAM_CHAT_STORE_IMMER, 'totalUnread'],
  },
};
