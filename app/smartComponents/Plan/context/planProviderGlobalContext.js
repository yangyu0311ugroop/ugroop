import { useContext } from 'react';
import { StateContext, DispatchContext } from './planProviderGlobal';
/* eslint-disable no-param-reassign */
const usePlanStateGlobalContext = () => {
  const state = useContext(StateContext);

  if (state === undefined) {
    throw new Error('Ut oh, where is my state?');
  }

  return state;
};

const usePlanDispatchGlobalContext = () => {
  const dispatch = useContext(DispatchContext);

  if (dispatch === undefined) {
    throw new Error('Ut oh, where is my dispatch?');
  }

  const setSubscriptionPrice = (index, total) => {
    dispatch(draft => {
      draft.subscriptionPrice[index] = total;
    });
  };

  return {
    dispatch,
    setSubscriptionPrice,
  };
};

export const usePlanGlobalContext = () => [
  usePlanStateGlobalContext(),
  usePlanDispatchGlobalContext(),
];
