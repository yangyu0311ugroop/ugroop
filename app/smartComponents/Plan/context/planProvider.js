import React from 'react';
import { useImmer } from 'use-immer';
import PropTypes from 'prop-types';

const DispatchContext = React.createContext(null);
const StateContext = React.createContext(null);

const PlanProvider = ({ children, store }) => {
  const [state, dispatch] = useImmer({
    lineAmount: 0,
    selectPlanId: '',
    freePlanId: '',
    selectInterval: '',
    selectAmount: 0,
    selectQuantity: 20,
    planFirstPurchase: '',
    selectPlanBundleName: '',
    subscriptionProcess: 'subscribe', // update, downgrade, changeDuration
    subscriptionProcessLabel: 'Subscribe',
    previewLoading: false,
    couponData: {
      applyCoupon: null,
      applyCouponError: null,
      applyCouponMode: null,
      couponLoading: false,
    },
    updatingCustomer: false,
    additionalSeat: 0,
    betterSubscriptionPlan: false,
    lastUpdated: null,
    subscriptionPrice: {},
    stripeError: '',
    calculatePlanLists: [],
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

PlanProvider.propTypes = {
  children: PropTypes.node,
  store: PropTypes.object,
};

export { PlanProvider, DispatchContext, StateContext };
