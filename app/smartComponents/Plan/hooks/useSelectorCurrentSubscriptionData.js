import { useSelector } from 'react-redux';
import useVigilante from '@mollycule/vigilante';
import { CUSTOMER_RESELECTOR } from '../../../datastore/customerDataImmerStore/selectors';
import { makeSingleSelect } from '../../../datastore/selectUtility';
import { useSelectorPlanData } from './useSelectorPlanData';

export const useSelectorCurrentSubscriptionData = props => {
  /*
  *   lastSync: {
    customerLastUpdate: {},
    subscriptionLastUpdate: {},
  },
  * */

  const customerId = useSelector(state =>
    CUSTOMER_RESELECTOR.makeSelectCustomerId(state, {
      orgId: props.orgId,
      userId: props.userId,
    }),
  );

  // const customerLastSyncTime = useSelector(state =>
  //   CUSTOMER_RESELECTOR.makeGetCustomerLastSync(state, {
  //     customerId: props.customerId,
  //   }),
  // );

  const currentPaymentSource = useSelector(state =>
    makeSingleSelect(CUSTOMER_RESELECTOR.selectCustomerAttribute)(state, {
      customerId,
      attribute: 'default_source',
    }),
  );

  const currentSubscriptionId = useSelector(state =>
    makeSingleSelect(CUSTOMER_RESELECTOR.selectCurrentSubscriptionId)(state, {
      customerId,
    }),
  );

  // const subscriptionLastSyncTime = useSelector(state =>
  //   CUSTOMER_RESELECTOR.makeGetSubscriptionLastSync(state, {
  //     orgId: props.orgId,
  //     userId: props.userId,
  //   }),
  // );

  const subscriptionItemId = useSelector(state =>
    makeSingleSelect(CUSTOMER_RESELECTOR.selectCurrentSubscriptionItem)(state, {
      subscriptionId: currentSubscriptionId,
      subscriptionItemIndex: props.subscriptionItemIndex,
    }),
  );

  const currentSubscriptionQuantity = useSelector(state => {
    if (props.orgId) {
      return makeSingleSelect(
        CUSTOMER_RESELECTOR.selectSubscriptionItemAttribute,
      )(state, {
        subscriptionItemId,
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

  const subscriptionItems = useSelector(state =>
    CUSTOMER_RESELECTOR.makeSelectSubscriptionItems(state, {
      subscriptionId: currentSubscriptionId,
      attribute: 'items.data',
    }),
  );

  const subscriptionTaxPercentage = useSelector(state =>
    makeSingleSelect(CUSTOMER_RESELECTOR.selectCurrentSubscriptionAttribute)(
      state,
      {
        subscriptionId: currentSubscriptionId,
        attribute: 'default_tax_rates.0.percentage',
      },
    ),
  );

  const subscriptionDefaultTax = useSelector(state =>
    makeSingleSelect(CUSTOMER_RESELECTOR.selectCurrentSubscriptionAttribute)(
      state,
      {
        subscriptionId: currentSubscriptionId,
        attribute: 'default_tax_rates.0.id',
      },
    ),
  );

  const currentPlanId = useSelector(state =>
    makeSingleSelect(CUSTOMER_RESELECTOR.selectSubscriptionItemAttribute)(
      state,
      {
        subscriptionItemId,
        attribute: `plan`,
      },
    ),
  );

  const {
    PlanAmount: currentPlanAmount,
    PlanTierAmount: currentPlanTierAmount,
    PlanInterval: currentPlanInterval,
    PlanName: currentPlanName,
    PlanSecondTierAmount: currentPlanSecondTierAmount,
    PlanCurrency: currentPlanCurrency,
    PlanFirstPurchase: currentPlanFirstPurchase,
    PlanMetaDescription: currentPlanMetaDescription,
  } = useSelectorPlanData({
    planId: currentPlanId,
  });

  const currentActiveScheduleId = useSelector(state =>
    CUSTOMER_RESELECTOR.makeSelectActiveScheduleId(state, {
      customerId,
      attribute: 'scheduleIds',
    }),
  );

  const currentSubscriptionPeriodEnd = useSelector(state =>
    makeSingleSelect(CUSTOMER_RESELECTOR.selectCurrentSubscriptionAttribute)(
      state,
      {
        subscriptionId: currentSubscriptionId,
        attribute: 'current_period_end',
      },
    ),
  );

  const currentPhaseStart = useSelector(state =>
    makeSingleSelect(CUSTOMER_RESELECTOR.selectScheduleAttribute)(state, {
      scheduleId: currentActiveScheduleId,
      attribute: 'current_phase.start_date',
    }),
  );

  const currentPhaseEnd = useSelector(state =>
    makeSingleSelect(CUSTOMER_RESELECTOR.selectScheduleAttribute)(state, {
      scheduleId: currentActiveScheduleId,
      attribute: 'current_phase.end_date',
    }),
  );

  const currentPhaseCoupon = useSelector(state =>
    makeSingleSelect(CUSTOMER_RESELECTOR.selectSchedulePhasesAttribute)(state, {
      schedulePhaseKey: `${currentPhaseStart}${currentActiveScheduleId}`,
      attribute: 'coupon',
    }),
  );

  const nextPhaseCoupon = useSelector(state =>
    makeSingleSelect(CUSTOMER_RESELECTOR.selectSchedulePhasesAttribute)(state, {
      schedulePhaseKey: `${currentPhaseEnd}${currentActiveScheduleId}`,
      attribute: 'coupon',
    }),
  );
  const nextPhasePlans = useSelector(state =>
    CUSTOMER_RESELECTOR.makeSelectFuturePlans(state, {
      schedulePhaseKey: `${currentPhaseEnd}${currentActiveScheduleId}`,
      attribute: 'plans',
    }),
  );

  const currentSubscriptionPlans = useSelector(state =>
    CUSTOMER_RESELECTOR.makeSelectSubscriptionPlans(state, {
      subscriptionId: currentSubscriptionId,
      attribute: 'items.data',
    }),
  );

  useVigilante('useSelectorCurrentSubscriptionData', {
    customerId,
    currentSubscriptionId,
    subscriptionItemId,
    subscriptionItems,
    currentPlanId,
    currentPlanAmount,
    currentPlanTierAmount,
    currentPlanName,
    currentPlanCurrency,
    subscriptionTaxPercentage,
    currentPlanInterval,
    currentSubscriptionQuantity,
    currentPlanMetaDescription,
    currentActiveScheduleId,
    currentSubscriptionPeriodEnd,
    currentPaymentSource,
    currentPhaseStart,
    currentPhaseEnd,
    currentPhaseCoupon,
    nextPhaseCoupon,
    subscriptionDefaultTax,
    currentPlanSecondTierAmount,
    currentPlanFirstPurchase,
    nextPhasePlans,
    currentSubscriptionPlans,
  });
  return {
    customerId,
    currentSubscriptionId,
    subscriptionItemId,
    subscriptionItems,
    currentPlanId,
    currentPlanAmount,
    currentPlanTierAmount,
    currentPlanName,
    currentPlanCurrency,
    subscriptionTaxPercentage,
    currentPlanInterval,
    currentSubscriptionQuantity,
    currentPlanMetaDescription,
    currentActiveScheduleId,
    currentSubscriptionPeriodEnd,
    currentPaymentSource,
    currentPhaseStart,
    currentPhaseEnd,
    currentPhaseCoupon,
    nextPhaseCoupon,
    subscriptionDefaultTax,
    currentPlanSecondTierAmount,
    currentPlanFirstPurchase,
    nextPhasePlans,
    currentSubscriptionPlans,
  };
};
