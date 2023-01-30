import React from 'react';
import { useImmer } from 'use-immer';
import PropTypes from 'prop-types';

const DispatchContext = React.createContext(null);
const StateContext = React.createContext(null);

const MessengerProvider = ({ children, store }) => {
  const [state, dispatch] = useImmer({
    channelRemoveWaitingQueue: {},
    stoppedChannel: [],
    hasStreamUser: false,
    mobileChannelMenuAnchor: null,
    currentActiveChannelId: null,
    newMemberAdded: false,
    tourChannelSlide: true,
    tourChannelPageDimension: { width: -1, height: -1 },
    showBetaMessage: true,
    activeChannelForceUpdate: {
      number: 0,
      changedActiveChannelId: null,
    },
  });
  let stateStore;
  let dispatchAction;
  if (store) {
    stateStore = store.state;
    dispatchAction = store.dispatch;
  } else {
    stateStore = state;
    dispatchAction = dispatch;
  }

  return (
    <StateContext.Provider value={stateStore}>
      <DispatchContext.Provider value={dispatchAction}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

MessengerProvider.propTypes = {
  children: PropTypes.node,
  store: PropTypes.object,
};

export { MessengerProvider, DispatchContext, StateContext };
