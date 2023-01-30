import GridItem from 'components/GridItem';
import PropTypes from 'prop-types';
import withResaga from 'resaga';
import React from 'react';
import { compose } from 'redux';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import {
  DEFAULT,
  SUBSCRIPTION_FREE_TOUR_PLANS,
  SUBSCRIPTION_PLAN_TYPE,
  SUBSCRIPTION_FREE_PLANS,
} from '../../../../appConstants';
import OrgSeatsPlan from './parts/OrgSeatsPlan';
import PersonalPlan from './parts/PersonalPlan';
import TourSeatsPlan from './parts/TourSeatsPlan';
import {
  GET_INVOICE,
  INVOICE_API,
  LIST_SUBSCRIPTION_SCHEDULE,
  RELEASE_SUBSCRIPTION_SCHEDULE,
  SUBSCRIPTION_API,
  SUBSCRIPTION_SCHEDULE_API,
  UPDATE_SUBSCRIPTION,
  UPDATE_SUBSCRIPTION_SCHEDULE,
} from '../../../../apis/constants';
import { SORT_HELPERS } from '../../../../utils/sorter';
import {
  isEmptyString,
  parseStringJson,
} from '../../../../utils/stringAdditions';
import { makeSingleSelect } from '../../../../datastore/selectUtility';
import { CUSTOMER_RESELECTOR } from '../../../../datastore/customerDataImmerStore/selectors';
import { PLAN_RESELECTOR } from '../../../../datastore/planDataImmerStore/selectors';
import { useSelectorInvoiceData } from '../../../Plan/hooks/useSelectorInvoiceData';
import { SubscriptionCalculationUtility } from '../../../../utils/subscriptionCalculation';
import { useSelectorPlanData } from '../../../Plan/hooks/useSelectorPlanData';

// This component will decide the type of the plan and render accordingly.
function SubscribedPlan(props) {
  const {
    orgId,
    variant,
    taxId,
    tax,
    currentActiveScheduleId,
    subscriptionItemIndex,
    currentSubscriptionId,
    customerId,
    nextPhasePlans,
    currentPhaseEndTime,
    currentPhaseStartTime,
    subscriptionItems,
    currentPhaseCoupon,
    nextPhaseCoupon,
    resaga,
    planId,
    orgSeats,
  } = props;

  // eslint-disable-next-line camelcase
  const subscription_Items = parseStringJson(subscriptionItems);
  const nextPlans = parseStringJson(nextPhasePlans);
  const nextPlanId =
    nextPlans && nextPlans.length > 0
      ? nextPlans[subscriptionItemIndex].plan
      : '';
  const nextPlanQuantity =
    nextPlans && nextPlans.length > 0
      ? nextPlans[subscriptionItemIndex].quantity
      : 0;
  const currentSubscriptionItem =
    // eslint-disable-next-line camelcase
    subscription_Items && subscription_Items.length > 0
      ? subscription_Items[subscriptionItemIndex].id
      : '';

  const currentSubscriptionQuantity = useSelector(state => {
    if (props.orgId) {
      return makeSingleSelect(
        CUSTOMER_RESELECTOR.selectSubscriptionItemAttribute,
      )(state, {
        subscriptionItemId: currentSubscriptionItem,
        attribute: 'quantity',
      });
    }
    return makeSingleSelect(
      CUSTOMER_RESELECTOR.selectCurrentSubscriptionAttribute,
    )(state, {
      subscriptionId: currentSubscriptionId,
      attribute: 'quantity',
    });
  });

  const {
    PlanName: planName,
    PlanMetaDescription: planNickName,
    PlanType: planType,
    PlanDetails: planDetails,
    PlanLevel: planLevel,
    PlanCurrency: planCurrency,
    PlanTierAmount: planTierAmount,
    PlanSecondTierAmount: planSecondTierAmount,
    PlanFirstPurchase: planFirstPurchase,
    PlanInterval: planInterval,
    PlanAmount: planAmount,
  } = useSelectorPlanData({
    planId,
  });

  const tierIndex = SubscriptionCalculationUtility.convertQuantityIntoTierIndex(
    currentSubscriptionQuantity,
  );
  const planTierFlatUptoBasedOnQuantity = useSelector(state =>
    makeSingleSelect(PLAN_RESELECTOR.selectPlanAttribute)(state, {
      id: planId,
      attribute: `tiers.${tierIndex}.up_to`,
    }),
  );

  const planTierFlatAmountBasedOnQuantity = useSelector(state => {
    if (tierIndex === 0) {
      return makeSingleSelect(PLAN_RESELECTOR.selectPlanAttribute)(state, {
        id: planId,
        attribute: `tiers.${tierIndex}.unit_amount`,
      });
    }
    return makeSingleSelect(PLAN_RESELECTOR.selectPlanAttribute)(state, {
      id: planId,
      attribute: `tiers.${tierIndex}.flat_amount`,
    });
  });

  const {
    PlanMetaDescription: nextPhasePlanNickName,
    PlanName: nextPhasePlanName,
    PlanInterval: nextPhasePlanInterval,
  } = useSelectorPlanData({
    nextPlanId,
  });

  const nextPhaseStartTime = currentPhaseEndTime;
  const invoiceData = useSelectorInvoiceData({
    customerId,
    planType,
  });
  const {
    existedCoupon: currentCouponId,
    existedCouponMode: currentCouponMode,
    existedCouponEnd: currentDiscountEnd,
    existedCouponStart: currentDiscountStart,
    existedCouponPercentOff: currentCouponPercentOff,
    existedCouponDuration: currentCouponDuration,
    existedCouponDurationInYear: currentCouponDurationInYear,
    currentInvoiceStartingBalance,
    currentInvoiceProrateAmount,
  } = invoiceData;
  const {
    currentProductLineInvoiceTotal,
    currentInvoiceTotal,
    currentOtherSubscriptionTotalAmount,
  } = parseStringJson(currentInvoiceProrateAmount);

  const fetchInvoice = () => {
    const query = {
      customer: props.customerId,
      subscription: props.currentSubscriptionId,
    };
    props.resaga.dispatchTo(INVOICE_API, GET_INVOICE, {
      payload: {
        query: JSON.stringify(query),
      },
    });
  };

  const fetchSchedulePlan = () => {
    resaga.dispatchTo(SUBSCRIPTION_SCHEDULE_API, LIST_SUBSCRIPTION_SCHEDULE, {
      payload: {
        query: JSON.stringify({ customer: customerId }),
      },
    });
  };

  const resetEndTime = () => {
    resaga.dispatchTo(SUBSCRIPTION_API, UPDATE_SUBSCRIPTION, {
      payload: {
        subscriptionId: currentSubscriptionId,
        data: {
          prorate: false,
          cancel_at_period_end: false,
        },
      },
    });
  };

  const getExistingFuturePlans = () => {
    let plans = [];
    if (currentActiveScheduleId) {
      plans = nextPlans;
    } else {
      // eslint-disable-next-line camelcase
      plans = subscription_Items;
    }
    const pObject = plans.map(o => ({
      plan: o.plan,
      quantity: o.quantity,
    }));
    return _.filter(pObject, o => o.plan !== planId);
  };

  const getExistingPlans = () => {
    const pObject = subscription_Items.map(o => ({
      plan: o.plan,
      quantity: o.quantity,
    }));
    return _.filter(pObject, o => o.plan !== planId);
  };

  const onCancelScheduleSubscriptionSuccess = () => {
    fetchInvoice();
    resetEndTime();
  };

  const onUpdateScheduleSubscriptionSuccess = () => {
    fetchSchedulePlan();
    fetchInvoice();
  };

  const cancelScheduleSubscription = () => {
    props.resaga.dispatchTo(
      SUBSCRIPTION_SCHEDULE_API,
      RELEASE_SUBSCRIPTION_SCHEDULE,
      {
        payload: {
          scheduleId: currentActiveScheduleId,
        },
        onSuccess: onCancelScheduleSubscriptionSuccess,
      },
    );
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
    const currentPhrase = {
      start_date: startTime,
      end_date: endTime,
      plans: sortedCurrentPlan,
      default_tax_rates: [payload.currentDefaultTax],
    };
    const nextPhrase = {
      start_date: endTime,
      plans: sortedFuturePlan,
      default_tax_rates: [payload.currentDefaultTax],
    };
    if (!isEmptyString(currentPhaseCoupon)) {
      currentPhrase.coupon = currentPhaseCoupon;
    }
    if (!isEmptyString(nextPhaseCoupon)) {
      nextPhrase.coupon = nextPhaseCoupon;
    }
    props.resaga.dispatchTo(
      SUBSCRIPTION_SCHEDULE_API,
      UPDATE_SUBSCRIPTION_SCHEDULE,
      {
        payload: {
          scheduleId: payload.currentActiveScheduleId,
          data: {
            phases: [currentPhrase, nextPhrase],
            renewal_behavior: 'release',
            prorate: false,
          },
        },
        onSuccess: onUpdateScheduleSubscriptionSuccess,
      },
    );
  };

  const onSubmit = () => {
    const hasFreePlan =
      SUBSCRIPTION_FREE_PLANS.includes(nextPhasePlanNickName) ||
      SUBSCRIPTION_FREE_TOUR_PLANS.includes(nextPhasePlanNickName);
    // const trueCount = scheduleSubscriptionCount.filter(item => item === true)
    //   .length;
    const subscriptionPlanIds = subscription_Items.map(o => o.plan);
    const existedFuturePlans = getExistingFuturePlans();
    const existedPlans = getExistingPlans();
    if (nextPhasePlanInterval === planInterval && hasFreePlan === false) {
      updateSchedulePhases({
        currentActiveScheduleId,
        currentPlanId: planId,
        planId, // restore to the previous plan,
        currentPhaseEnd: nextPhaseStartTime,
        currentPhaseStart: currentPhaseStartTime,
        currentDefaultTax: taxId,
        currentSubscriptionQuantity, // restore to the original plan quantity
        calculatedQuantity: currentSubscriptionQuantity,
        existedPlans,
        existedFuturePlans,
        sortedPlansOrder: subscriptionPlanIds,
      });
    } else {
      cancelScheduleSubscription();
    }
  };

  // const calculateSchedulePlanIndex = () => {
  //   const type = subscriptionPlanListTypes[subscriptionItemIndex];
  //   if (type) {
  //     return _.findIndex(lastPhasePlanListTypes, o => o === type);
  //   }
  //   return -1;
  // };

  let component = <GridItem>{planNickName}</GridItem>;
  if (planType === SUBSCRIPTION_PLAN_TYPE.INDIVIDUAL_SEAT) {
    const nextPhaseSchedulePlanId =
      nextPlans && nextPlans.length > 0
        ? nextPlans[subscriptionItemIndex].plan
        : '';
    component = (
      <PersonalPlan
        customerId={customerId}
        nextPlanId={nextPlanId}
        title={planName}
        planDetails={planDetails}
        variant={variant}
        level={planLevel}
        planAmount={planAmount}
        tax={tax}
        quantity={currentSubscriptionQuantity}
        currentActiveScheduleId={currentActiveScheduleId}
        interval={planInterval}
        currency={planCurrency}
        nextPhasePlanName={nextPhasePlanName}
        planId={planId}
        currentSubscriptionId={currentSubscriptionId}
        currentInvoiceTotal={currentInvoiceTotal}
        currentProductLineInvoiceTotal={currentProductLineInvoiceTotal}
        currentOtherSubscriptionTotalAmount={
          currentOtherSubscriptionTotalAmount
        }
        cancelScheduleSubscription={onSubmit}
        currentCouponId={currentCouponId}
        currentCouponMode={currentCouponMode}
        currentCouponPercentOff={currentCouponPercentOff}
        currentCouponDuration={currentCouponDuration}
        currentCouponDurationInYear={currentCouponDurationInYear}
        currentDiscountEnd={currentDiscountEnd}
        currentDiscountStart={currentDiscountStart}
        currentInvoiceStartingBalance={currentInvoiceStartingBalance}
        planType={planType}
        nextPhaseStartTime={nextPhaseStartTime}
        currentPhaseStartTime={currentPhaseStartTime}
        currentPhaseEndTime={currentPhaseEndTime}
        nextPhaseSchedulePlanId={nextPhaseSchedulePlanId}
        currentPhaseCoupon={currentPhaseCoupon}
        nextPhaseCoupon={nextPhaseCoupon}
        nextPlanQuantity={nextPlanQuantity}
      />
    );
  }
  if (planType === SUBSCRIPTION_PLAN_TYPE.ORG_SEAT) {
    const nextPhaseSchedulePlanId =
      nextPlans && nextPlans.length > 0
        ? nextPlans[subscriptionItemIndex].plan
        : '';
    component = (
      <OrgSeatsPlan
        customerId={customerId}
        orgId={orgId}
        title={planName}
        variant={variant}
        level={planLevel}
        planTierAmount={planTierAmount}
        planAmount={planAmount}
        planSecondTierAmount={planSecondTierAmount}
        currentActiveScheduleId={currentActiveScheduleId}
        currentSubscriptionId={currentSubscriptionId}
        planFirstPurchase={parseInt(planFirstPurchase, 10)}
        interval={planInterval}
        currency={planCurrency}
        nextPhasePlanName={nextPhasePlanName}
        tax={tax}
        quantity={currentSubscriptionQuantity}
        subscriptionItemIndex={subscriptionItemIndex}
        planId={planId}
        planType={planType}
        currentInvoiceTotal={currentInvoiceTotal}
        currentProductLineInvoiceTotal={currentProductLineInvoiceTotal}
        currentOtherSubscriptionTotalAmount={
          currentOtherSubscriptionTotalAmount
        }
        cancelScheduleSubscription={onSubmit}
        currentCouponId={currentCouponId}
        currentCouponMode={currentCouponMode}
        currentCouponPercentOff={currentCouponPercentOff}
        currentCouponDuration={currentCouponDuration}
        currentCouponDurationInYear={currentCouponDurationInYear}
        currentDiscountEnd={currentDiscountEnd}
        currentDiscountStart={currentDiscountStart}
        currentInvoiceStartingBalance={currentInvoiceStartingBalance}
        nextPhaseStartTime={nextPhaseStartTime}
        currentPhaseStartTime={currentPhaseStartTime}
        currentPhaseEndTime={currentPhaseEndTime}
        nextPhaseSchedulePlanId={nextPhaseSchedulePlanId}
        currentPhaseCoupon={currentPhaseCoupon}
        nextPhaseCoupon={nextPhaseCoupon}
        orgSeats={orgSeats}
      />
    );
  }
  if (planType === SUBSCRIPTION_PLAN_TYPE.TOUR_SEAT) {
    const nextPhaseSchedulePlanId =
      nextPlans && nextPlans.length > 0
        ? nextPlans[subscriptionItemIndex].plan
        : '';
    component = (
      <TourSeatsPlan
        customerId={customerId}
        orgId={orgId}
        title={planName}
        planDetails={planDetails}
        variant={variant}
        level={planLevel}
        planAmount={planTierFlatAmountBasedOnQuantity}
        currentActiveScheduleId={currentActiveScheduleId}
        currentSubscriptionId={currentSubscriptionId}
        interval={planInterval}
        currency={planCurrency}
        nextPhasePlanName={nextPhasePlanName}
        tax={tax}
        quantity={currentSubscriptionQuantity}
        subscriptionItemIndex={subscriptionItemIndex}
        planId={planId}
        planType={planType}
        uptoQuantity={planTierFlatUptoBasedOnQuantity}
        currentInvoiceTotal={currentInvoiceTotal}
        currentProductLineInvoiceTotal={currentProductLineInvoiceTotal}
        currentOtherSubscriptionTotalAmount={
          currentOtherSubscriptionTotalAmount
        }
        cancelScheduleSubscription={onSubmit}
        planNickName={planNickName}
        currentCouponId={currentCouponId}
        currentCouponMode={currentCouponMode}
        currentCouponPercentOff={currentCouponPercentOff}
        currentCouponDuration={currentCouponDuration}
        currentCouponDurationInYear={currentCouponDurationInYear}
        currentDiscountEnd={currentDiscountEnd}
        currentDiscountStart={currentDiscountStart}
        currentInvoiceStartingBalance={currentInvoiceStartingBalance}
        nextPhaseStartTime={nextPhaseStartTime}
        currentPhaseStartTime={currentPhaseStartTime}
        currentPhaseEndTime={currentPhaseEndTime}
        nextPhaseSchedulePlanId={nextPhaseSchedulePlanId}
        currentPhaseCoupon={currentPhaseCoupon}
        nextPhaseCoupon={nextPhaseCoupon}
        nextPhasePlan={nextPlanId}
        nextPhaseQuantity={nextPlanQuantity}
      />
    );
  }
  return <GridItem>{component}</GridItem>;
}

SubscribedPlan.propTypes = {
  variant: PropTypes.string,
  currentActiveScheduleId: PropTypes.string,
  subscriptionItemIndex: PropTypes.number,
  currentSubscriptionId: PropTypes.string,
  customerId: PropTypes.string,
  nextPhasePlans: PropTypes.string,
  resaga: PropTypes.object,
  currentPhaseStartTime: PropTypes.number,
  currentPhaseEndTime: PropTypes.number,
  currentPhaseCoupon: PropTypes.string,
  nextPhaseCoupon: PropTypes.string,
  subscriptionItems: PropTypes.string,
  taxId: PropTypes.string,
  tax: PropTypes.number,
  orgId: PropTypes.any,
  planId: PropTypes.string,
  orgSeats: PropTypes.number,
};

SubscribedPlan.defaultProps = {
  variant: DEFAULT,
};

export default compose(withResaga())(SubscribedPlan);
