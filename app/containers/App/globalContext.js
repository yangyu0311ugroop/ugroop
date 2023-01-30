import React from 'react';
import { useImmer } from 'use-immer';
import PropTypes from 'prop-types';

const DispatchContext = React.createContext(null);
const StateContext = React.createContext(null);

const GlobalProvider = ({ children, store }) => {
  const [state, dispatch] = useImmer({
    IntercomContext: {
      hideIntercomButton: false,
    },
    BillingContext: {
      org: {
        orgSeats: -1,
        tourSeats: -1,
        connectedOrgPeople: -1,
        connectedPax: -1,
        connectedContributor: -1,
        orgMembers: [],
        deactivatedMembers: [],
        orgPending: [],
        subscriptionPlan: '',
      },
      person: {
        tourSeats: -1,
        connectedPeople: -1,
        subscriptionPlan: '',
      },
      tourConnectedPeople: [],
    },
    WhatsNewContext: {
      ugroopUpdates: [],
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

GlobalProvider.propTypes = {
  children: PropTypes.node,
  store: PropTypes.object,
};

export { GlobalProvider, DispatchContext, StateContext };
