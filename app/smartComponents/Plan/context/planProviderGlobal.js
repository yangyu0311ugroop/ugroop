import React from 'react';
import { useImmer } from 'use-immer';
import PropTypes from 'prop-types';

const DispatchContext = React.createContext(null);
const StateContext = React.createContext(null);

const PlanProviderGlobal = ({ children, store }) => {
  const [state, dispatch] = useImmer({
    subscriptionPrice: {},
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

PlanProviderGlobal.propTypes = {
  children: PropTypes.node,
  store: PropTypes.object,
};

export { PlanProviderGlobal, DispatchContext, StateContext };
