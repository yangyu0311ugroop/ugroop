import { useContext } from 'react';

import { StateContext, DispatchContext } from './planProvider';
/* eslint-disable no-param-reassign */

const usePlanStateContext = () => {
  const state = useContext(StateContext);

  if (state === undefined) {
    throw new Error('Ut oh, where is my state?');
  }

  return state;
};

const usePlanDispatchContext = () => {
  const dispatch = useContext(DispatchContext);

  if (dispatch === undefined) {
    throw new Error('Ut oh, where is my dispatch?');
  }

  const setLineAmount = value => {
    dispatch(draft => {
      draft.lineAmount = value;
    });
  };

  const setSelectAmount = value => {
    dispatch(draft => {
      draft.selectAmount = value;
    });
  };

  const setSelectPlanId = value => {
    dispatch(draft => {
      draft.selectPlanId = value;
    });
  };

  const setFreePlanId = value => {
    dispatch(draft => {
      draft.freePlanId = value;
    });
  };

  const setSelectInterval = value => {
    dispatch(draft => {
      draft.selectInterval = value;
    });
  };

  const setPlanFirstPurchase = value => {
    dispatch(draft => {
      draft.planFirstPurchase = value;
    });
  };

  const setSelectPlanBundleName = value => {
    dispatch(draft => {
      draft.selectPlanBundleName = value;
    });
  };

  const setSubscriptionProcess = value => {
    dispatch(draft => {
      draft.subscriptionProcess = value;
    });
  };

  const setSubscriptionProcessLabel = value => {
    dispatch(draft => {
      draft.subscriptionProcessLabel = value;
    });
  };

  const setInvoicePreviewLoading = value => {
    dispatch(draft => {
      draft.previewLoading = value;
    });
  };

  const setApplyCoupon = value => {
    dispatch(draft => {
      draft.couponData.applyCoupon = value;
    });
  };

  const setApplyCouponError = value => {
    dispatch(draft => {
      draft.couponData.applyCouponError = value;
    });
  };

  const setApplyCouponMode = value => {
    dispatch(draft => {
      draft.couponData.applyCouponMode = value;
    });
  };

  const setCouponLoading = value => {
    dispatch(draft => {
      draft.couponData.setCouponLoading = value;
    });
  };

  const setUpdatingCustomer = value => {
    dispatch(draft => {
      draft.updatingCustomer = value;
    });
  };

  const setCouponData = value => {
    dispatch(draft => {
      if (value.coupon) {
        draft.couponData.applyCoupon = value.coupon;
        draft.couponData.applyCouponError = null;
      }
      if (value.couponError) {
        draft.couponData.applyCoupon = null;
        draft.couponData.applyCouponMode = null;
        draft.couponData.applyCouponError = value.couponError;
      }
      if (value.couponMode) {
        draft.couponData.applyCouponMode = value.couponMode;
      }
    });
  };

  const setAdditionalSeat = value => {
    dispatch(draft => {
      draft.additionalSeat = value;
    });
  };

  const setBetterSubscriptionPLan = value => {
    dispatch(draft => {
      draft.betterSubscriptionPlan = value;
    });
  };

  const setPlanQuantity = value => {
    dispatch(draft => {
      draft.selectPlanQuantity = value;
    });
  };

  const updateLastUpdated = () => {
    const now = Date.now();
    dispatch(draft => {
      draft.lastUpdated = now;
    });
  };

  const setSubscriptionPrice = (index, total) => {
    dispatch(draft => {
      draft.subscriptionPrice[index] = total;
    });
  };

  const setStripeError = err => {
    dispatch(draft => {
      draft.stripeError = err;
    });
  };

  return {
    dispatch,
    setLineAmount,
    setSelectPlanId,
    setFreePlanId,
    setSelectInterval,
    setSelectAmount,
    setPlanFirstPurchase,
    setSelectPlanBundleName,
    setSubscriptionProcess,
    setInvoicePreviewLoading,
    setSubscriptionProcessLabel,
    setApplyCoupon,
    setApplyCouponError,
    setCouponLoading,
    setApplyCouponMode,
    setCouponData,
    setUpdatingCustomer,
    setAdditionalSeat,
    setBetterSubscriptionPLan,
    setPlanQuantity,
    updateLastUpdated,
    setSubscriptionPrice,
    setStripeError,
  };
};

export const usePlanContext = () => [
  usePlanStateContext(),
  usePlanDispatchContext(),
];
