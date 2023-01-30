import React, { useEffect } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import Plan from 'smartComponents/Plan';
import {
  CREATE_INVOICE,
  CUSTOMER_API,
  GET_CUSTOMER_SUBSCRIPTION,
  GET_UPCOMING_INVOICE,
  INVOICE_API,
  SUBSCRIPTION_API,
  SUBSCRIPTION_SCHEDULE_API,
  UPDATE_CUSTOMER,
  UPDATE_SUBSCRIPTION,
  UPDATE_SUBSCRIPTION_SCHEDULE,
  COUPON_API,
  GET_COUPON,
} from 'apis/constants';
import _ from 'lodash';
import { useImmer } from 'use-immer';
import { SUBSCRIPTION_CONFIG } from './config';
import { isNumber } from '../../utils/numberAdditions';
import {
  COUPON_MODE,
  SUBSCRIPTION_ENTERPRISE_TOUR,
  SUBSCRIPTION_FREE_PLANS,
  SUBSCRIPTION_INDIVIDUAL,
} from '../../appConstants';
import { isEmptyString, parseStringJson } from '../../utils/stringAdditions';
import { SubscriptionCalculationUtility } from '../../utils/subscriptionCalculation';
import { SORT_HELPERS } from '../../utils/sorter';
import { useSelectorCurrentSubscriptionData } from '../Plan/hooks/useSelectorCurrentSubscriptionData';
import { usePlanContext } from '../Plan/context/planStateContext';
import { useSelectorInvoiceData } from '../Plan/hooks/useSelectorInvoiceData';
function SubscriptionUpgradeCommon(props) {
  const [state, setState] = useImmer({
    customerId: null,
  });
  const [planState, dispatchPlanState] = usePlanContext();
  const location = useLocation();
  const history = useHistory();
  const currentSubscription = useSelectorCurrentSubscriptionData(props);
  const invoiceData = useSelectorInvoiceData({
    customerId: currentSubscription.customerId,
    type: props.type,
  });
  const ref = React.createRef();
  const { type: SubscriptionType } = props;

  useEffect(() => {
    if (ref.current != null) {
      setState(draft => {
        const preview = ref.current.collectPreviewInfo();
        if (preview) {
          // eslint-disable-next-line no-param-reassign
          draft.customerId = preview.customerId;
        }
      });
    }
  }, [ref]);

  useEffect(() => {
    if (!isEmptyString(state.customerId)) {
      previewUpcomingInvoice();
    }
  }, [
    state.customerId,
    planState.selectPlanId,
    planState.planFirstPurchase,
    planState.additionalSeat,
  ]);

  useEffect(() => {
    if (state && !isEmptyString(state.customerId)) {
      previewUpcomingInvoice();
    }
  }, [planState.couponData.applyCoupon]);

  const callGenerateInvoice = ({ customerId, currentDefaultTax }) => {
    props.resaga.dispatchTo(INVOICE_API, CREATE_INVOICE, {
      payload: {
        customer: customerId,
        collection_method: 'charge_automatically',
        auto_advance: true,
        default_tax_rates: currentDefaultTax,
      },
    });
  };

  const refetchCustomerSubscription = async ({ orgId }) => {
    props.resaga.dispatchTo(SUBSCRIPTION_API, GET_CUSTOMER_SUBSCRIPTION, {
      payload: { id: orgId, type: 'org' },
    });
  };

  const generateInvoiceIfNeeded = async () => {
    const { subscriptionProrateMetaInfo } = invoiceData;
    const { totalInvoiceAmount } =
      JSON.parse(subscriptionProrateMetaInfo) || {};
    const { customerId, currentDefaultTax } = currentSubscription;
    if (totalInvoiceAmount > 0 || Array.isArray(SubscriptionType)) {
      callGenerateInvoice({ customerId, currentDefaultTax });
    }
  };

  const stripServerError = async data => {
    const response = data.response;
    if (response.error) {
      dispatchPlanState.setStripeError(response.error.message);
    }
  };

  const redirectToBillingPage = async type => {
    dispatchPlanState.setUpdatingCustomer(false);
    let urltype = '/';
    if (type === SUBSCRIPTION_ENTERPRISE_TOUR) {
      urltype = '/tourplan/';
    }
    if (_.startsWith(location.pathname, '/orgs')) {
      let redirectUrl = '';
      if (location.pathname.includes('changeDuration')) {
        redirectUrl = _.replace(
          location.pathname,
          `/subscription${urltype}changeDuration/upgrade`,
          `/settings/billings`,
        );
      } else if (location.pathname.includes('addSeat')) {
        redirectUrl = _.replace(
          location.pathname,
          `/subscription${urltype}addSeat`,
          `/settings/billings`,
        );
      } else {
        redirectUrl = _.replace(
          location.pathname,
          `/subscription${urltype}upgrade`,
          `/settings/billings`,
        );
      }
      history.push(redirectUrl);
    } else {
      history.push(`/settings/billings`);
    }
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

  const getCurrentPlans = ({ subscriptionItems }) =>
    subscriptionItems.map(o => ({
      plan: o.plan,
      quantity: o.quantity,
    }));

  // const calculateCouponEndTime = res => {
  //   if (res.duration === COUPON_MODE.REPEATING) {
  //     if (res.duration_in_months) {
  //       return moment()
  //         .add(res.duration_in_months, 'months')
  //         .unix();
  //     }
  //     if (res.duration_in_years) {
  //       return moment()
  //         .add(res.duration_in_years, 'years')
  //         .unix();
  //     }
  //   }
  //   return null;
  // };

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
      },
      onError: () => {
        dispatchPlanState.setCouponLoading(false);
        dispatchPlanState.setCouponData({
          couponError: 'invalid discount code',
        });
      },
    });
  };

  const submitUpdate = ({
    currentSubscriptionId,
    currentSubscriptionItem,
    planId,
    quantity,
    bundlePlanId,
    freePlanId,
    currentPlanId,
    subscriptionItems,
  }) => async () => {
    let items = [
      {
        id: currentSubscriptionItem,
        plan: planId,
        quantity,
      },
    ];
    if (
      currentPlanId === freePlanId &&
      subscriptionItems &&
      subscriptionItems.length > 0
    ) {
      items = subscriptionItems.map(o => {
        if (o.id === currentSubscriptionItem) {
          return {
            id: o.id,
            plan: planId,
            quantity,
          };
        }
        return {
          id: o.id,
          plan: bundlePlanId,
          quantity: 1,
        };
      });
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
      onSuccess: async () => {
        await generateInvoiceIfNeeded();
        await redirectToBillingPage(props.type);
      },
      onError: stripServerError,
    });
  };

  const submitChangeDuration = ({
    subscriptionItems,
    listPlanIds,
    subscriptionPlanQuantityList,
    currentSubscriptionId,
  }) => async () => {
    // eslint-disable-next-line camelcase
    const subscription_items = parseStringJson(subscriptionItems);
    const items = subscription_items.map((o, index) => ({
      id: o.id,
      plan: listPlanIds[index],
      quantity: subscriptionPlanQuantityList[index],
    }));

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
      onSuccess: async () => {
        await generateInvoiceIfNeeded();
        await redirectToBillingPage(props.type);
      },
      onError: stripServerError,
    });
  };

  const updateCustomer = (previewData, cb) => {
    const stripData = previewData.stripeData;
    if (stripData && stripData.token) {
      dispatchPlanState.setUpdatingCustomer(true);
      props.resaga.dispatchTo(CUSTOMER_API, UPDATE_CUSTOMER, {
        payload: {
          id: previewData.customerId,
          data: {
            source: stripData ? stripData.token.id : null,
          },
        },
        onSuccess: cb(previewData),
        onError: stripServerError,
      });
    }
  };

  const beforeSubmitUpdateSubscription = previewData => async () => {
    const isFreeUpdate = previewData.freePlanId === previewData.planId;
    if (previewData.currentPaymentSource || isFreeUpdate) {
      await submitUpdate(previewData)();
    } else {
      updateCustomer(previewData, submitUpdate);
    }
  };

  const beforeSubmitChangeDuration = previewData => async () => {
    const containAllFreePlan = _.intersection(
      previewData.listEqualPlanNames,
      SUBSCRIPTION_FREE_PLANS,
    );
    if (previewData.currentPaymentSource || containAllFreePlan.length > 0) {
      await submitChangeDuration(previewData)();
    } else {
      updateCustomer(previewData, submitChangeDuration);
    }
  };

  const updateSchedulePhases = async payload => {
    const endTime = payload.currentPhaseEnd;
    const startTime = payload.currentPhaseStart;
    const sortedOrder = payload.sortedPlansOrder;
    const oldPlans = payload.oldPlans;
    const currentPlan = [
      ...payload.existedPlans,
      {
        plan: payload.planId,
        quantity:
          payload.calculatedQuantity > 1 ? payload.calculatedQuantity : 1,
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
    const oldPhase = {
      start_date: startTime,
      end_date: 'now',
      plans: oldPlans,
    };

    const currentPhase = {
      start_date: 'now',
      end_date: endTime,
      plans: sortedCurrentPlan,
      default_tax_rates: [payload.currentDefaultTax],
    };
    const futurePhase = {
      start_date: endTime,
      plans: sortedFuturePlan,
      default_tax_rates: [payload.currentDefaultTax],
    };
    // No need to consider existed coupon, because they cannot apply another coupon on top of existed coupon.
    if (!isEmptyString(planState.couponData.applyCoupon)) {
      if (planState.couponData.applyCouponMode === COUPON_MODE.FOREVER) {
        currentPhase.coupon = planState.couponData.applyCoupon;
        futurePhase.coupon = planState.couponData.applyCoupon;
      } else if (
        planState.couponData.applyCouponMode === COUPON_MODE.REPEATING
      ) {
        // It's the first time apply the coupon in update schedules, so even the minimum one month includes current and future.
        currentPhase.coupon = planState.couponData.applyCoupon;
        futurePhase.coupon = planState.couponData.applyCoupon;
      } else {
        currentPhase.coupon = planState.couponData.applyCoupon;
      }
    } else if (!isEmptyString(payload.existedCoupon)) {
      // for update, check the currentPhaseCoupon is sufficient enough because update schedules only happen when there is downgrade.
      // So currentPhase and nextPhaseCoupon will have the data to tell how to update
      if (
        payload.existedCouponMode === COUPON_MODE.FOREVER ||
        payload.existedCouponMode === COUPON_MODE.REPEATING
      ) {
        if (!isEmptyString(payload.currentPhaseCoupon)) {
          currentPhase.coupon = payload.existedCoupon;
        }
        if (!isEmptyString(payload.nextPhaseCoupon)) {
          futurePhase.coupon = payload.existedCoupon;
        }
      } else if (payload.existedCouponMode === COUPON_MODE.ONCE) {
        if (!isEmptyString(payload.nextPhaseCoupon)) {
          futurePhase.coupon = payload.existedCoupon;
        }
      }
    }
    props.resaga.dispatchTo(
      SUBSCRIPTION_SCHEDULE_API,
      UPDATE_SUBSCRIPTION_SCHEDULE,
      {
        payload: {
          scheduleId: payload.currentActiveScheduleId,
          data: {
            phases: [oldPhase, currentPhase, futurePhase],
            renewal_behavior: 'release',
            prorate: true,
          },
        },
        onSuccess: async () => {
          await generateInvoiceIfNeeded();
          await refetchCustomerSubscription({
            orgId: props.orgId,
          });
          await redirectToBillingPage(props.type);
        },
        onError: stripServerError,
      },
    );
  };

  const onSubmit = async () => {
    const currentSubscriptionData = await ref.current.collectPaymentInfo();
    const {
      planId,
      stripeData,
      freePlanId,
      selectQuantity,
      bundlePlanId,
      listPlanIds,
      subscriptionPlanQuantityList,
      equalNames,
    } = currentSubscriptionData;
    const { existedCoupon, existedCouponEnd, existedCouponMode } = invoiceData;
    const {
      currentActiveScheduleId,
      currentPaymentSource,
      currentPhaseStart,
      currentPhaseEnd,
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
    if (Array.isArray(SubscriptionType)) {
      const payload = {
        customerId,
        currentPaymentSource,
        stripeData,
        currentSubscriptionId,
        subscriptionItems,
        listPlanIds,
        subscriptionPlanQuantityList,
        listEqualPlanNames: equalNames,
      };
      await beforeSubmitChangeDuration(payload)();
    } else {
      // eslint-disable-next-line camelcase
      const subscription_Items = JSON.parse(subscriptionItems);
      const payload = {
        currentSubscriptionQuantity,
        currentSubscriptionItem,
        currentSubscriptionId,
        currentActiveScheduleId,
        planId,
        stripeData,
        customerId,
        currentPaymentSource,
        freePlanId,
        currentPlanAmount,
        bundlePlanId,
        currentPlanId,
        subscriptionItems: subscription_Items,
        existedCoupon,
        existedCouponMode,
        existedCouponEnd,
        currentPhaseCoupon,
        nextPhaseCoupon,
        currentPlanInterval,
      };
      const additionSeats = planState.additionalSeat;
      // eslint-disable-next-line camelcase
      if (SubscriptionType === SUBSCRIPTION_ENTERPRISE_TOUR) {
        payload.quantity = selectQuantity;
      } else if (SubscriptionType === SUBSCRIPTION_INDIVIDUAL) {
        payload.quantity = 1;
      } else if (planId === currentPlanId) {
        payload.quantity =
          parseInt(currentSubscriptionQuantity, 10) + additionSeats;
      } else {
        const quantity = parseInt(planState.planFirstPurchase, 10);
        let q = quantity;
        if (currentSubscriptionQuantity > quantity) {
          q = currentSubscriptionQuantity;
        }
        payload.quantity = parseInt(q, 10) + additionSeats;
      }
      if (currentActiveScheduleId) {
        const existedPlans = getExistingPlans({
          subscriptionItems: subscription_Items,
          currentPlanId,
        });
        const oldPlans = getCurrentPlans({
          subscriptionItems: subscription_Items,
        });
        const existedFuture = getExistingFuturePlans({
          subscriptionItems: subscription_Items,
          nextPhasePlans: parseStringJson(nextPhasePlans),
          currentPlanId,
          currentActiveScheduleId,
          currentPlanInterval,
        });
        const subscriptionPlanIds = subscription_Items.map(o => o.plan);
        await updateSchedulePhases({
          currentActiveScheduleId,
          currentPlanId,
          planId,
          currentPhaseEnd,
          currentPhaseStart,
          currentDefaultTax,
          currentSubscriptionQuantity,
          calculatedQuantity: payload.quantity,
          oldPlans,
          existedPlans,
          existedFuturePlans: existedFuture,
          sortedPlansOrder: subscriptionPlanIds,
          existedCoupon,
          existedCouponMode,
          existedCouponEnd,
          currentPhaseCoupon,
          nextPhaseCoupon,
        });
      } else {
        await beforeSubmitUpdateSubscription(payload)();
      }
    }
  };

  const orgAndPersonalSeatPlanCalculation = (
    formData,
    { currentSubscriptionQuantity, currentPlanId, planId, planFirstPurchase },
  ) => {
    let calculatedQuantity = 0;
    if (planId === currentPlanId) {
      if (formData) {
        calculatedQuantity =
          parseInt(currentSubscriptionQuantity, 10) +
          parseInt(formData.model.seat, 10);
      } else {
        calculatedQuantity =
          parseInt(currentSubscriptionQuantity, 10) + planState.additionalSeat;
      }
    } else {
      const quantity = parseInt(planFirstPurchase, 10);
      let q = 0;
      if (isNumber(quantity)) {
        if (currentSubscriptionQuantity > quantity) {
          q = currentSubscriptionQuantity;
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

  const orgTourSeatPlanCalculation = selectIndex =>
    SubscriptionCalculationUtility.convertIndexToQuantity(selectIndex);

  const getUpComingInvoice = (formData, query) => {
    const onSuccessCallback = props.previewUpcomingInvoiceSuccess
      ? props.previewUpcomingInvoiceSuccess(formData)
      : null;
    const onFailCallback = props.previewUpcomingInvoiceFail
      ? props.previewUpcomingInvoiceFail(formData)
      : null;
    dispatchPlanState.setInvoicePreviewLoading(true);
    props.resaga.dispatchTo(INVOICE_API, GET_UPCOMING_INVOICE, {
      payload: {
        query: encodeURIComponent(JSON.stringify(query)),
      },
      onSuccess: () => {
        dispatchPlanState.setInvoicePreviewLoading(false);
        if (onSuccessCallback) {
          if (formData) {
            const seat = parseInt(formData ? formData.model.seat : 1, 10);
            dispatchPlanState.setAdditionalSeat(seat);
          }
          onSuccessCallback();
        }
      },
      onError: () => {
        dispatchPlanState.setInvoicePreviewLoading(false);
        if (onFailCallback) {
          if (formData) {
            const seat = parseInt(formData ? formData.model.seat : 1, 10);
            dispatchPlanState.setAdditionalSeat(seat);
          }
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
    } = currentSubscription;
    if (Array.isArray(type)) {
      // eslint-disable-next-line camelcase
      const subscription_Items = JSON.parse(subscriptionItems);
      const items = subscription_Items.map((o, index) => ({
        id: o.id,
        plan: listPlanIds[index],
        quantity: subscriptionPlanQuantityList[index],
      }));
      const query = {
        customer: customerId,
        subscription: currentSubscriptionId,
        subscription_items: items,
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
          planFirstPurchase: planState.planFirstPurchase,
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
      };
      if (!isEmptyString(planState.couponData.applyCoupon)) {
        query.coupon = planState.couponData.applyCoupon;
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

  const view = ref ? (
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
      projectPlanIds={props.projectPlanIds}
      subscriptionItemIndex={props.subscriptionItemIndex}
      loading={props.loading}
      applyCoupon={applyCoupon}
    />
  ) : (
    <div />
  );
  return view;
}

SubscriptionUpgradeCommon.propTypes = {
  userId: PropTypes.number,
  orgId: PropTypes.number,
  resaga: PropTypes.object,
  isChangeDuration: PropTypes.bool,
  isUpgrade: PropTypes.bool,
  isDowngrade: PropTypes.bool,
  variant: PropTypes.string,
  previewUpcomingInvoiceSuccess: PropTypes.func,
  previewUpcomingInvoiceFail: PropTypes.func,
  type: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  location: PropTypes.object,
  history: PropTypes.object,
  projectPlanIds: PropTypes.array,
  subscriptionItemIndex: PropTypes.number,
  loading: PropTypes.bool,
};

SubscriptionUpgradeCommon.defaultProps = {};

export default compose(resaga(SUBSCRIPTION_CONFIG))(SubscriptionUpgradeCommon);
