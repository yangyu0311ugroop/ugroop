import { useContext } from 'react';

import { StateContext, DispatchContext } from './globalContext';
/* eslint-disable no-param-reassign */

const useGlobalStateContext = () => {
  const state = useContext(StateContext);

  if (state === undefined) {
    throw new Error('Ut oh, where is my state?');
  }

  return state;
};

const useGlobalDispatchContext = () => {
  const dispatch = useContext(DispatchContext);

  if (dispatch === undefined) {
    throw new Error('Ut oh, where is my dispatch?');
  }

  const setIntercomButtonHide = value => {
    dispatch(draft => {
      draft.IntercomContext.hideIntercomButton = value;
    });
  };

  const setBillingPersonSeatsData = data => {
    dispatch(draft => {
      draft.BillingContext.person.tourSeats = data.tourSeats;
      draft.BillingContext.person.subscriptionPlan = data.subscriptionPlan;
    });
  };

  const setBillingOrgSeatsData = data => {
    dispatch(draft => {
      draft.BillingContext.org.tourSeats = data.tourSeats;
      draft.BillingContext.org.orgSeats = data.orgSeats;
      draft.BillingContext.org.connectedOrgPeople = data.connectedOrgPeople;
      draft.BillingContext.org.subscriptionPlan = data.subscriptionPlan;
    });
  };

  const setBillingOrgMembers = data => {
    dispatch(draft => {
      draft.BillingContext.org.orgMembers = data;
    });
  };

  const setBillingOrgDeactivatedMembers = data => {
    dispatch(draft => {
      draft.BillingContext.org.deactivatedMembers = data;
    });
  };

  const setBillingOrgPendingMembers = data => {
    dispatch(draft => {
      draft.BillingContext.org.orgPending = data;
    });
  };

  const setTourConnectedPeople = data => {
    dispatch(draft => {
      draft.BillingContext.tourConnectedPeople = data;
    });
  };
  const resetBillingData = () => {
    dispatch(draft => {
      draft.BillingContext.tourConnectedPeople = [];
      draft.BillingContext.person = {
        tourSeats: -1,
        connectedPeople: -1,
        subscriptionPlan: '',
      };
      draft.BillingContext.org = {
        orgSeats: -1,
        tourSeats: -1,
        connectedOrgPeople: -1,
        connectedPax: -1,
        connectedContributor: -1,
        orgMembers: [],
        subscriptionPlan: '',
        deactivatedMembers: [],
      };
    });
  };

  const setWhatsNew = value => {
    dispatch(draft => {
      draft.WhatsNewContext.ugroopUpdates = value;
    });
  };

  return {
    dispatch,
    setIntercomButtonHide,
    setBillingOrgSeatsData,
    setBillingPersonSeatsData,
    setBillingOrgMembers,
    setBillingOrgDeactivatedMembers,
    setTourConnectedPeople,
    setBillingOrgPendingMembers,
    resetBillingData,
    setWhatsNew,
  };
};

export const useGlobalContext = () => [
  useGlobalStateContext(),
  useGlobalDispatchContext(),
];
