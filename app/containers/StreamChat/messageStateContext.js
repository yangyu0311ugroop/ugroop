import { useContext } from 'react';

import { StateContext, DispatchContext } from './messengerProvider';
/* eslint-disable no-param-reassign */

const useMessageStateContext = () => {
  const state = useContext(StateContext);

  if (state === undefined) {
    throw new Error('Ut oh, where is my state?');
  }

  return state;
};

const useMessageDispatchContext = () => {
  const dispatch = useContext(DispatchContext);

  if (dispatch === undefined) {
    throw new Error('Ut oh, where is my dispatch?');
  }

  const setHasStreamUser = value => {
    dispatch(draft => {
      draft.hasStreamUser = value;
    });
  };

  const setMobileMenuAnchor = value => {
    dispatch(draft => {
      draft.mobileChannelMenuAnchor = value;
    });
  };

  const setCurrentActiveChannelId = value => {
    dispatch(draft => {
      draft.currentActiveChannelId = value;
    });
  };

  const addInToChannelQueue = channel => {
    dispatch(draft => {
      if (!draft.channelRemoveWaitingQueue[channel.cid]) {
        draft.channelRemoveWaitingQueue[channel.cid] = channel;
      }
    });
  };

  const removeFromWaitingListQueue = cid => {
    dispatch(draft => {
      if (draft.channelRemoveWaitingQueue[cid]) {
        delete draft.channelRemoveWaitingQueue[cid];
      }
    });
  };

  const setNewAddedMember = value => {
    dispatch(draft => {
      draft.newMemberAdded = value;
    });
  };

  const toggleChannelSliderValue = () => {
    dispatch(draft => {
      const value = !draft.tourChannelSlide;
      draft.tourChannelSlide = value;
    });
  };

  const resetChannelSliderValue = () => {
    dispatch(draft => {
      draft.tourChannelSlide = true;
    });
  };

  const setTourChannelDimension = ({ w, h }) => {
    dispatch(draft => {
      if (w) {
        draft.tourChannelPageDimension.width = w;
      }
      if (h) {
        draft.tourChannelPageDimension.height = h;
      }
    });
  };

  const setShowBetaMessage = value => {
    dispatch(draft => {
      draft.showBetaMessage = value;
    });
  };

  const forceUpdateActiveChannel = cid => {
    dispatch(draft => {
      draft.activeChannelForceUpdate.number += 1;
      draft.activeChannelForceUpdate.changedActiveChannelId = cid;
    });
  };

  const resetActiveChannelForceUpdate = () => {
    dispatch(draft => {
      draft.activeChannelForceUpdate = {
        number: 0,
        changedActiveChannelId: null,
      };
    });
  };

  return {
    dispatch,
    setHasStreamUser,
    setMobileMenuAnchor,
    setCurrentActiveChannelId,
    addInToChannelQueue,
    removeFromWaitingListQueue,
    setNewAddedMember,
    toggleChannelSliderValue,
    setTourChannelDimension,
    resetChannelSliderValue,
    setShowBetaMessage,
    forceUpdateActiveChannel,
    resetActiveChannelForceUpdate,
  };
};

export const useMessengerContext = () => [
  useMessageStateContext(),
  useMessageDispatchContext(),
];
