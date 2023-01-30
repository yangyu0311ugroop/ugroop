import React from 'react';
import { useImmer } from 'use-immer';
import PropTypes from 'prop-types';

const DispatchContext = React.createContext(null);
const StateContext = React.createContext(null);

const MarketplaceProvider = ({ children, store }) => {
  const [state, dispatch] = useImmer({
    templateCollapseValue: false,
    newlyAppliedTemplateRedirectUrl: '',
    tabCardViewDetectHeight: 0,
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

MarketplaceProvider.propTypes = {
  children: PropTypes.node,
  store: PropTypes.object,
};

export { MarketplaceProvider, DispatchContext, StateContext };
