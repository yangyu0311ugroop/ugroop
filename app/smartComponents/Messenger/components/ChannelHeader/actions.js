import { SET_CHANNEL_DETAIL } from '../../../../containers/StreamChat/constants';

export function setChannelOpen(isOpen) {
  return {
    type: SET_CHANNEL_DETAIL,
    isOpen,
  };
}
