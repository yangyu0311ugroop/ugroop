import { useImmer } from 'use-immer';
import React, { useEffect } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import PropTypes from 'prop-types';
import Plan from 'smartComponents/Plan';
import { useHistory, useLocation } from 'react-router-dom';
import {
  COUPON_API,
  CREATE_SUBSCRIPTION_SCHEDULE,
  CUSTOMER_API,
  GET_COUPON,
  GET_UPCOMING_INVOICE,
  INVOICE_API,
  SUBSCRIPTION_API,
  SUBSCRIPTION_SCHEDULE_API,
  UPDATE_CUSTOMER,
  UPDATE_SUBSCRIPTION,
  UPDATE_SUBSCRIPTION_SCHEDULE,
} from 'apis/constants';
import _ from 'lodash';
import { SUBSCRIPTION_CONFIG } from './config';
import { MOMENT_HELPERS } from '../../utils/helpers/moment';
import {
  COUPON_MODE,
  ISO8601,
  SUBSCRIPTION_ENTERPRISE,
  SUBSCRIPTION_ENTERPRISE_TOUR,
  SUBSCRIPTION_FREE_PLANS,
  SUBSCRIPTION_INDIVIDUAL,
} from '../../appConstants';
import { isEmptyString, parseStringJson } from '../../utils/stringAdditions';
import { SubscriptionCalculationUtility } from '../../utils/subscriptionCalculation';
import { isNumber } from '../../utils/numberAdditions';
import { SORT_HELPERS } from '../../utils/sorter';
import { usePlanContext } from '../Plan/context/planStateContext';
import { useSelectorCurrentSubscriptionData } from '../Plan/hooks/useSelectorCurrentSubscriptionData';
import { useSelectorInvoiceData } from '../Plan/hooks/useSelectorInvoiceData';

function SubscriptionDowngradeCommon(props) {
  const [state, setState] = useImmer({
    previewData: null,
  });
  const ref = React.createRef(null);

  const [planState, dispatchPlanState] = usePlanContext();
  const { type: SubscriptionType } = props;
  const location = useLocation();
  const history = useHistory();
  const currentSubscription = useSelectorCurrentSubscriptionData(props);
  const invoiceData = useSelectorInvoiceData({
    customerId: currentSubscription.customerId,
    type: props.type,
  });
  const selectPlanId = planState && planState.selectPlanId;
  const monitorApplyCoupon = planState && planState.couponData.applyCoupon;
  useEffect(() => {
    if (ref.current != null) {
      setState(draft => {
        // eslint-disable-next-line no-param-reassign
        draft.previewData = ref.current.collectPreviewInfo();
      });
    }
  }, [ref.current]);

  useEffect(() => {
    if (state.previewData && !isEmptyString(state.previewData.customerId)) {
      previewUpcomingInvoice();
    }
  }, [state.previewData, selectPlanId]);

  useEffect(() => {
    if (state.previewData && !isEmptyString(state.previewData.customerId)) {
      previewUpcomingInvoice();
    }
  }, [monitorApplyCoupon]);

  const orgTourSeatPlanCalculation = selectIndex =>
    SubscriptionCalculationUtility.convertIndexToQuantity(selectIndex);

  const orgAndPersonalSeatPlanCalculation = (
    formData,
    { currentSubscriptionQuantity, currentPlanId, planId, planFirstPurchase },
  ) => {
    let calculatedQuantity = 0;
    if (planId === currentPlanId) {
      if (formData) {
        calculatedQuantity =
          parseInt(currentSubscriptionQuantity, 10) - parseInt(formData, 10);
      } else {
        calculatedQuantity =
          parseInt(currentSubscriptionQuantity, 10) + planState.additionalSeat;
      }
    } else {
      const quantity = parseInt(planFirstPurchase, 10);
      let q = 0;
      if (isNumber(quantity)) {
        // Quantity if it's not number, means personal plan
        if (quantity > 1) {
          if (currentSubscriptionQuantity > quantity) {
            q = currentSubscriptionQuantity;
          } else {
            q = quantity;
          }
        } else {
          q = quantity;
        }
      } else {
        q = currentSubscriptionQuantity;
      }

      if (formData) {
        calculatedQuantity =
          parseInt(q, 10) + parseInt(formData.model.seat, 10);
      } else {
        calculatedQuantity = parseInt(q, 10) + planState.additionalSeat;
      }
    }
    return calculatedQuantity;
  };

  const stripServerError = async data => {
    const response = data.response;
    if (response.error) {
      dispatchPlanState.setStripeError(response.error.message);
    }
  };

  const applyCoupon = data => {
    dispatchPlanState.setCouponLoading(true);
    props.resaga.dispatchTo(COUPON_API, GET_COUPON, {
      payload: data.coupon,
      onSuccess: res => {
        dispatchPlanState.setCouponLoading(false);
        dispatchPlanState.setCouponData({
          coupon: data.coupon,
          couponMode: res.duration,
        });
        previewUpcomingInvoice();
      },
      onError: () => {
        dispatchPlanState.setCouponLoading(false);
        dispatchPlanState.setCouponData({
          couponError: 'invalid discount code',
        });
      },
    });
  };

  const getUpComingInvoice = (formData, query) => {
    const onSuccessCallback = props.previewUpcomingInvoiceSuccess
      ? props.previewUpcomingInvoiceSuccess(formData)
      : null;
    const onFailCallback = props.previewUpcomingInvoiceFail
      ? props.previewUpcomingInvoiceFail(formData)
      : null;
    props.resaga.dispatchTo(INVOICE_API, GET_UPCOMING_INVOICE, {
      payload: {
        query: encodeURIComponent(JSON.stringify(query)),
      },
      onSuccess: () => {
        dispatchPlanState.setInvoicePreviewLoading(false);
        if (onSuccessCallback) {
          if (formData) {
            const seat = parseInt(formData || 1, 10);
            dispatchPlanState.setAdditionalSeat(seat);
          }
          onSuccessCallback();
        }
      },
      onError: () => {
        dispatchPlanState.setInvoicePreviewLoading(false);
        if (onFailCallback) {
          onFailCallback();
        }
      },
    });
  };

  const previewUpcomingInvoice = formData => {
    const {
      selectIndex,
      planId,
      type,
      planFirstPurchase,
      listPlanIds,
      subscriptionPlanQuantityList,
    } = ref.current.collectPreviewInfo();
    const {
      currentSubscriptionQuantity,
      subscriptionItemId: currentSubscriptionItem,
      currentSubscriptionId,
      customerId,
      currentPlanId,
      subscriptionItems,
      currentSubscriptionPeriodEnd,
    } = currentSubscription;
    const startTime = MOMENT_HELPERS.dateFromTimeStamp(
      currentSubscriptionPeriodEnd,
      ISO8601,
    );
    if (Array.isArray(type)) {
      // eslint-disable-next-line camelcase
      const subscription_Items = parseStringJson(subscriptionItems);
      const items = subscription_Items.map((o, index) => ({
        id: o.id,
        plan: listPlanIds[index],
        quantity: subscriptionPlanQuantityList[index],
      }));
      const query = {
        customer: customerId,
        subscription: currentSubscriptionId,
        subscription_items: items,
        subscription_proration_date: startTime,
      };
      if (!isEmptyString(planState.couponData.applyCoupon)) {
        query.coupon = planState.couponData.applyCoupon;
      }
      getUpComingInvoice(formData, query);
    } else {
      let calculatedQuantity = 0;
      if (type === SUBSCRIPTION_ENTERPRISE_TOUR) {
        calculatedQuantity = orgTourSeatPlanCalculation(selectIndex);
      } else {
        calculatedQuantity = orgAndPersonalSeatPlanCalculation(formData, {
          currentSubscriptionQuantity,
          currentPlanId,
          planId,
          planFirstPurchase,
        });
      }
      const query = {
        customer: customerId,
        subscription: currentSubscriptionId,
        subscription_items: [
          {
            id: currentSubscriptionItem,
            plan: planId, // new plan,
            quantity: calculatedQuantity,
          },
        ],
        subscription_proration_date: startTime,
      };
      if (!isEmptyString(planState.couponData.applyCouponMode)) {
        query.coupon = planState.couponData.applyCouponMode;
      }
      if (isNumber(calculatedQuantity)) {
        if (!isEmptyString(planId)) {
          getUpComingInvoice(formData, query);
        }
      } else if (props.previewUpcomingInvoiceSuccess) {
        props.previewUpcomingInvoiceSuccess(formData)();
      }
    }
  };

  const redirectToBillingPage = type => () => {
    let urltype = '/';
    if (type === SUBSCRIPTION_ENTERPRISE_TOUR) {
      urltype = '/tourplan/';
    }
    if (_.startsWith(location.pathname, '/orgs')) {
      let redirectUrl = '';
      if (location.pathname.includes('changeDuration')) {
        redirectUrl = _.replace(
          location.pathname,
          `/subscription${urltype}changeDuration/downgrade`,
          `/settings/billings`,
        );
      } else if (location.pathname.includes('removeSeat')) {
        redirectUrl = _.replace(
          location.pathname,
          `/subscription${urltype}removeSeat`,
          `/settings/billings`,
        );
      } else {
        redirectUrl = _.replace(
          location.pathname,
          `/subscription${urltype}downgrade`,
          `/settings/billings`,
        );
      }
      history.push(redirectUrl);
    } else {
      history.push(`/settings/billings`);
    }
  };

  const updateSchedulePhases = payload => {
    const endTime = payload.currentPhaseEnd;
    const startTime = payload.currentPhaseStart;
    const sortedOrder = payload.sortedPlansOrder;
    const currentPlan = [
      ...payload.existedPlans,
      {
        plan: payload.currentPlanId,
        quantity:
          payload.currentSubscriptionQuantity > 1
            ? payload.currentSubscriptionQuantity
            : 1,
      },
    ];
    const futurePlan = [
      ...payload.existedFuturePlans,
      {
        plan: payload.planId,
        quantity:
          payload.calculatedQuantity > 1 ? payload.calculatedQuantity : 1,
      },
    ];
    const sortedCurrentPlan = SORT_HELPERS.sortBasedOnOtherArray(
      sortedOrder,
      currentPlan,
      'plan',
    );
    const sortedFuturePlan = SORT_HELPERS.sortBasedOnOtherArray(
      sortedOrder,
      futurePlan,
      'plan',
    );
    let sortedFuturePlanWithBundle = [];
    if (
      payload.planId === payload.freePlanId &&
      payload.type === SUBSCRIPTION_ENTERPRISE
    ) {
      const index = _.findIndex(
        sortedFuturePlan,
        o => o.plan === payload.planId,
      );
      sortedFuturePlanWithBundle = sortedFuturePlan.map((o, i) => {
        if (i === index) {
          return o;
        }
        return {
          plan: payload.bundlePlanId,
          quantity: 1,
        };
      });
    }
    let currentPhase = {
      start_date: startTime,
      end_date: endTime,
      plans: sortedCurrentPlan,
      default_tax_rates: [payload.currentDefaultTax],
    };
    let futurePhase = {
      start_date: endTime,
      plans:
        sortedFuturePlanWithBundle.length > 0
          ? sortedFuturePlanWithBundle
          : sortedFuturePlan,
      default_tax_rates: [payload.currentDefaultTax],
    };
    const res = applyCouponInPhases(currentPhase, futurePhase, payload);
    currentPhase = res.currentPhase;
    futurePhase = res.nextPhase;
    props.resaga.dispatchTo(
      SUBSCRIPTION_SCHEDULE_API,
      UPDATE_SUBSCRIPTION_SCHEDULE,
      {
        payload: {
          scheduleId: payload.currentActiveScheduleId,
          data: {
            phases: [currentPhase, futurePhase],
            renewal_behavior: 'release',
            prorate: false,
          },
        },
        onSuccess: redirectToBillingPage(props.type),
        onError: stripServerError,
      },
    );
  };

  const applyCouponInPhases = (cp, np, payload) => {
    const currentPhase = cp;
    const nextPhase = np;
    const {
      existedCoupon,
      existedCouponMode,
      currentActiveScheduleId,
      currentPhaseCoupon,
      nextPhaseCoupon,
      currentPhaseEnd,
      currentPhaseStart,
      existedCouponStart,
      existedCouponEnd,
    } = payload;
    const start = currentPhaseStart;
    const end = currentPhaseEnd;
    if (!isEmptyString(planState.couponData.applyCoupon)) {
      if (planState.couponData.applyCouponMode === COUPON_MODE.FOREVER) {
        nextPhase.coupon = planState.couponData.applyCoupon;
      } else if (
        planState.couponData.applyCouponMode === COUPON_MODE.REPEATING
      ) {
        nextPhase.coupon = planState.couponData.applyCoupon;
      } else {
        nextPhase.coupon = planState.couponData.applyCoupon;
      }
    } else if (!isEmptyString(existedCoupon)) {
      if (existedCouponMode === COUPON_MODE.REPEATING) {
        if (currentActiveScheduleId) {
          if (
            isEmptyString(currentPhaseCoupon) &&
            isEmptyString(nextPhaseCoupon)
          ) {
            if (end >= existedCouponStart && start <= existedCouponStart) {
              currentPhase.coupon = existedCoupon;
            }
            if (end <= existedCouponEnd) {
              nextPhase.coupon = existedCoupon;
            }
          } else {
            if (!isEmptyString(currentPhaseCoupon)) {
              currentPhase.coupon = existedCoupon;
            }
            if (!isEmptyString(nextPhaseCoupon)) {
              nextPhase.coupon = existedCoupon;
            }
          }
        }
      } else if (existedCouponMode === COUPON_MODE.FOREVER) {
        if (currentActiveScheduleId) {
          if (!isEmptyString(currentPhaseCoupon)) {
            currentPhase.coupon = existedCoupon;
          }
          if (!isEmptyString(nextPhaseCoupon)) {
            nextPhase.coupon = existedCoupon;
          }
        } else {
          currentPhase.coupon = existedCoupon;
          nextPhase.coupon = existedCoupon;
        }
      } else if (existedCouponMode === COUPON_MODE.ONCE) {
        if (currentActiveScheduleId && !isEmptyString(nextPhaseCoupon)) {
          nextPhase.coupon = existedCoupon;
        }
      }
    }
    return { currentPhase, nextPhase };
  };

  const updateDurationSchedulePhases = payload => {
    const {
      currentPhaseEnd,
      currentPhaseStart,
      subscriptionPlanIds,
      subscriptionPlanQuantityList,
      listPlanIds,
      currentActiveScheduleId,
      currentDefaultTax,
    } = payload;
    const endTime = currentPhaseEnd;
    const startTime = currentPhaseStart;
    const currentPlan = subscriptionPlanIds.map((o, index) => ({
      plan: o,
      quantity: subscriptionPlanQuantityList[index],
    }));
    const futurePlan = listPlanIds.map((o, index) => ({
      plan: o,
      quantity: subscriptionPlanQuantityList[index],
    }));
    let currentPhase = {
      start_date: startTime,
      end_date: endTime,
      plans: currentPlan,
      default_tax_rates: [currentDefaultTax],
    };
    let nextPhase = {
      start_date: endTime,
      plans: futurePlan,
      default_tax_rates: [currentDefaultTax],
    };
    const res = applyCouponInPhases(currentPhase, nextPhase, payload);
    currentPhase = res.currentPhase;
    nextPhase = res.nextPhase;

    props.resaga.dispatchTo(
      SUBSCRIPTION_SCHEDULE_API,
      UPDATE_SUBSCRIPTION_SCHEDULE,
      {
        payload: {
          scheduleId: currentActiveScheduleId,
          data: {
            phases: [currentPhase, nextPhase],
            renewal_behavior: 'release',
            prorate: false,
          },
        },
        onSuccess: redirectToBillingPage(props.type),
        onError: stripServerError,
      },
    );
  };

  const createScheduleId = (paymentData, cb) => {
    props.resaga.dispatchTo(
      SUBSCRIPTION_SCHEDULE_API,
      CREATE_SUBSCRIPTION_SCHEDULE,
      {
        payload: {
          data: {
            from_subscription: paymentData.currentSubscriptionId,
          },
        },
        onSuccess: onCreateScheduleIdSuccess(paymentData, cb),
        onError: stripServerError,
      },
    );
  };

  const submitDurationDowngrade = ({
    currentSubscriptionId,
    listPlanIds,
    subscriptionItems,
    currentSubscriptionItem,
    planId,
    type,
  }) => {
    let items = [];
    if (type === SUBSCRIPTION_INDIVIDUAL) {
      items = [
        {
          id: currentSubscriptionItem,
          plan: planId,
          quantity: 1,
        },
      ];
    } else {
      items = subscriptionItems.map((o, i) => ({
        id: o.id,
        plan: listPlanIds[i],
        quantity: 1,
      }));
    }
    const data = {
      cancel_at_period_end: false,
      items,
    };
    if (!isEmptyString(planState.couponData.applyCoupon)) {
      data.coupon = planState.couponData.applyCoupon;
    }
    props.resaga.dispatchTo(SUBSCRIPTION_API, UPDATE_SUBSCRIPTION, {
      payload: {
        subscriptionId: currentSubscriptionId,
        data,
      },
      onSuccess: redirectToBillingPage(type),
      onError: stripServerError,
    });
  };

  const downgradePlan = (previewData, options) => () => {
    if (
      isEmptyString(previewData.currentActiveScheduleId) ||
      (options && options.skipCurrentScheduleCheck)
    ) {
      createScheduleId(previewData, updateSchedulePhases);
    } else {
      updateSchedulePhases(previewData);
    }
  };

  const submitChangeDuration = previewData => () => {
    if (isEmptyString(previewData.currentActiveScheduleId)) {
      createScheduleId(previewData, updateDurationSchedulePhases);
    } else {
      updateDurationSchedulePhases(previewData);
    }
  };

  const updateCustomer = (previewData, options, cb) => {
    const stripData = previewData.stripeData;
    if (stripData && stripData.token) {
      props.resaga.dispatchTo(CUSTOMER_API, UPDATE_CUSTOMER, {
        payload: {
          id: previewData.customerId,
          data: {
            source: stripData ? stripData.token.id : null,
          },
        },
        onSuccess: cb(previewData, options),
        onError: stripServerError,
      });
    }
  };

  const beforeSubmitDowngradeSubscription = (previewData, options) => () => {
    const isFreeDowngrade =
      previewData.freePlanId === previewData.planId &&
      SUBSCRIPTION_FREE_PLANS.includes(previewData.currentPlanName); // if select plan is free and current plan is free too.
    if (isFreeDowngrade) {
      submitDurationDowngrade(previewData);
    } else if (!isEmptyString(previewData.currentPaymentSource)) {
      downgradePlan(previewData, options)();
    } else {
      updateCustomer(previewData, options, downgradePlan);
    }
  };

  const beforeSubmitChangeDuration = previewData => () => {
    const containAllFreePlan = _.intersection(
      previewData.listEqualPlanNames,
      SUBSCRIPTION_FREE_PLANS,
    );
    if (containAllFreePlan.length > 0) {
      submitDurationDowngrade(previewData);
    } else if (previewData.currentPaymentSource) {
      submitChangeDuration(previewData)();
    } else {
      updateCustomer(previewData, null, submitChangeDuration);
    }
  };

  const onCreateScheduleIdSuccess = (data, cb) => response => {
    const clonedata = Object.assign({}, data);
    clonedata.currentActiveScheduleId = response.id;
    clonedata.currentPhaseEnd = response.current_phase.end_date;
    clonedata.currentPhaseStart = response.current_phase.start_date;
    cb(clonedata);
  };

  const getExistingFuturePlans = ({
    subscriptionItems,
    nextPhasePlans,
    currentPlanId,
    currentActiveScheduleId,
    currentPlanInterval,
  }) => {
    let plans = [];
    if (currentActiveScheduleId) {
      const intervals = nextPhasePlans.map(o => o.interval);
      if (intervals.includes(currentPlanInterval)) {
        plans = nextPhasePlans;
      } else {
        plans = subscriptionItems.map((o, index) => ({
          plan: o.plan,
          quantity: nextPhasePlans[index].quantity,
        }));
      }
    } else {
      plans = subscriptionItems;
    }
    const pObject = plans.map(o => ({
      plan: o.plan,
      quantity: o.quantity,
    }));
    return _.filter(pObject, o => o.plan !== currentPlanId);
  };

  const getExistingPlans = ({ subscriptionItems, currentPlanId }) => {
    const pObject = subscriptionItems.map(o => ({
      plan: o.plan,
      quantity: o.quantity,
    }));
    return _.filter(pObject, o => o.plan !== currentPlanId);
  };

  const onSubmit = async () => {
    const currentSubscriptionData = await ref.current.collectPaymentInfo();
    const {
      planId,
      stripeData,
      freePlanId,
      selectQuantity,
      bundlePlanId,
      planFirstPurchase,
      listPlanIds,
      subscriptionPlanQuantityList,
      equalNames,
    } = currentSubscriptionData;
    const {
      existedCoupon,
      existedCouponEnd,
      existedCouponMode,
      existedCouponStart,
    } = invoiceData;
    const {
      currentActiveScheduleId,
      currentPaymentSource,
      currentPhaseStart,
      currentPhaseEnd,
      currentPlanName,
      subscriptionDefaultTax: currentDefaultTax,
      customerId,
      currentPlanAmount,
      currentPlanId,
      subscriptionItemId: currentSubscriptionItem,
      currentSubscriptionId,
      currentSubscriptionQuantity,
      nextPhaseCoupon,
      currentPhaseCoupon,
      subscriptionItems,
      nextPhasePlans,
      currentPlanInterval,
    } = currentSubscription;
    // eslint-disable-next-line camelcase
    const subscription_Items = parseStringJson(subscriptionItems);
    if (Array.isArray(SubscriptionType)) {
      const subscriptionPlanIds = subscription_Items.map(o => o.plan);
      // Only used for Org Duration Change
      const payload = {
        customerId,
        currentPaymentSource,
        currentDefaultTax,
        stripeData,
        currentPhaseEnd,
        currentPhaseStart,
        currentSubscriptionId,
        listPlanIds,
        subscriptionPlanQuantityList,
        listEqualPlanNames: equalNames,
        subscriptionPlanIds,
        currentActiveScheduleId,
        subscriptionItems: subscription_Items,
      };
      beforeSubmitChangeDuration(payload)();
    } else {
      // eslint-disable-next-line camelcase
      const payload = {
        currentSubscriptionQuantity,
        currentSubscriptionItem,
        currentSubscriptionId,
        currentActiveScheduleId,
        currentDefaultTax,
        currentPlanId,
        planId,
        stripeData,
        currentPaymentSource,
        currentPhaseEnd,
        currentPhaseStart,
        customerId,
        freePlanId,
        currentPlanAmount,
        bundlePlanId,
        type: SubscriptionType,
        existedCoupon,
        existedCouponMode,
        existedCouponEnd,
        currentPhaseCoupon,
        nextPhaseCoupon,
        existedCouponStart,
        currentPlanName,
        currentPlanInterval,
      };
      const existedPlans = getExistingPlans({
        subscriptionItems: subscription_Items,
        currentPlanId,
      });
      const existedFuturePlans = getExistingFuturePlans({
        subscriptionItems: subscription_Items,
        nextPhasePlans: parseStringJson(nextPhasePlans),
        currentPlanId,
        currentActiveScheduleId,
        currentPlanInterval,
      });
      const subscriptionPlanIds = subscription_Items.map(o => o.plan);
      payload.sortedPlansOrder = subscriptionPlanIds;
      if (SubscriptionType === SUBSCRIPTION_ENTERPRISE_TOUR) {
        payload.calculatedQuantity = selectQuantity;
        payload.planId = currentPlanId;
      } else if (SubscriptionType === SUBSCRIPTION_INDIVIDUAL) {
        payload.calculatedQuantity = 1;
      } else if (planId === currentPlanId) {
        payload.calculatedQuantity =
          parseInt(currentSubscriptionQuantity, 10) - planState.additionalSeat;
      } else {
        const firstPurchase = planFirstPurchase;
        payload.calculatedQuantity = 1;
        if (!isEmptyString(firstPurchase)) {
          if (parseInt(firstPurchase, 10) > 1) {
            payload.calculatedQuantity = SubscriptionCalculationUtility.quantityOrFirstPurchase(
              currentSubscriptionQuantity,
              parseInt(firstPurchase, 10),
            );
          }
        }
      }
      payload.existedPlans = existedPlans;
      payload.existedFuturePlans = existedFuturePlans;
      await beforeSubmitDowngradeSubscription(payload)();
    }
  };

  const seatChangeHandler = formData => {
    props.seatChangeHandlerSuccess(formData);
  };

  const view = ref ? (
    <>
      <Plan
        variant={props.variant}
        type={props.type}
        ref={ref}
        onSubmit={onSubmit}
        userId={props.userId}
        orgId={props.orgId}
        isChangeDuration={props.isChangeDuration}
        isUpgrade={props.isUpgrade}
        isDowngrade={props.isDowngrade}
        previewUpcomingInvoice={previewUpcomingInvoice}
        seatChangeHandler={seatChangeHandler}
        seat={planState.additionalSeat}
        subscriptionItemIndex={props.subscriptionItemIndex}
        loading={props.loading}
        applyCoupon={applyCoupon}
      />
    </>
  ) : (
    <div />
  );
  return view;
}

SubscriptionDowngradeCommon.propTypes = {
  userId: PropTypes.number,
  orgId: PropTypes.any,
  resaga: PropTypes.object,
  isChangeDuration: PropTypes.bool,
  isUpgrade: PropTypes.bool,
  isDowngrade: PropTypes.bool,
  variant: PropTypes.string,
  type: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  location: PropTypes.object,
  history: PropTypes.object,
  seatChangeHandlerSuccess: PropTypes.func,
  subscriptionItemIndex: PropTypes.number,
  previewUpcomingInvoiceSuccess: PropTypes.func,
  previewUpcomingInvoiceFail: PropTypes.func,
  loading: PropTypes.bool,
};

SubscriptionDowngradeCommon.defaultProps = {};

export default compose(resaga(SUBSCRIPTION_CONFIG))(
  SubscriptionDowngradeCommon,
);
