import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Box from '@material-ui/core/Box';
import JText from 'components/JText';
import PropTypes from 'prop-types';
import React from 'react';
import MomentHelper from 'utils/helpers/moment';
import _ from 'lodash';
import Icon from 'viewComponents/Icon';
import { useSelector } from 'react-redux';
import styles from './styles';
import PriceDisplay from '../../../../ugcomponents/PriceDisplay';
import Button from '../../../../viewComponents/Button';
import { VARIANTS } from '../../../../variantsConstants';
import { isNumber } from '../../../../utils/numberAdditions';
import {
  isEmptyString,
  parseStringJson,
  pluralizeText,
} from '../../../../utils/stringAdditions';
import {
  FREE_ORG_SEATS_THRESHOLD,
  SUBSCRIPTION_FREE_TOUR_PLANS,
  SUBSCRIPTION_PLAN_TYPE,
} from '../../../../appConstants';
import { SubscriptionCalculationUtility } from '../../../../utils/subscriptionCalculation';
import { makeStyles } from '../../../../components/material-ui';
import { makeSingleSelect } from '../../../../datastore/selectUtility';
import { CUSTOMER_RESELECTOR } from '../../../../datastore/customerDataImmerStore/selectors';
import { useSelectorPlanData } from '../../../Plan/hooks/useSelectorPlanData';
const useStyles = makeStyles(styles);
function ScheduleSubscriptionItemPlan(props) {
  const classes = useStyles();
  const {
    currentPlanId,
    scheduleId,
    currentPlanAmount,
    currentPlanTierAmount,
    currentPlanInterval,
    currentQuantity,
    currentPlanName,
    tax,
    subscriptionItemIndex,
    currentInvoiceTotal,
    currentOtherSubscriptionTotalAmount,
    currentProductLineInvoiceTotal,
    planType,
    onSubmitCancelSchedule,
    currentCouponMode,
    currentCouponPercentOff,
    currentDiscountEnd,
    currentInvoiceStartingBalance,
  } = props;

  const nextPhaseStartTime = useSelector(state =>
    makeSingleSelect(CUSTOMER_RESELECTOR.selectScheduleAttribute)(state, {
      scheduleId,
      attribute: 'current_phase.end_date',
    }),
  );

  const nextPhasePlans = useSelector(state =>
    CUSTOMER_RESELECTOR.makeSelectFuturePlans(state, {
      schedulePhaseKey: `${nextPhaseStartTime}${scheduleId}`,
      attribute: 'plans',
    }),
  );
  const nextPlans = parseStringJson(nextPhasePlans);
  const nextPhasePlan =
    nextPlans && nextPlans.length > 0
      ? nextPlans[subscriptionItemIndex].plan
      : null;

  const nextPhaseQuantity =
    nextPlans && nextPlans.length > 0
      ? nextPlans[subscriptionItemIndex].quantity
      : 0;

  const {
    PlanAmount: nextPhaseAmount,
    PlanTierAmount: nextPhaseTierPrice,
    PlanInterval: nextPhasePlanInterval,
    PlanName: nextPhasePlanName,
    PlanMetaDescription: nextPhaseMetaDescription,
    PlanSecondTierAmount: nextPhaseSecondTierPrice,
    PlanCurrency: nextPhaseCurrency,
    PlanFirstPurchase: nextPhaseFirstPurchase,
  } = useSelectorPlanData({
    planId: nextPhasePlan,
  });

  const shouldShowSchedulePlan = () => {
    if (isEmptyString(scheduleId)) return false;
    if (currentPlanId !== nextPhasePlan) {
      return true;
    }
    return currentQuantity !== nextPhaseQuantity;
  };

  const orgSeatContent = () => {
    let action = '';
    if (isNumber(nextPhaseAmount)) {
      if (
        nextPhaseAmount < currentPlanTierAmount ||
        nextPhaseAmount < currentPlanAmount
      ) {
        action = 'Downgrade';
      } else {
        action = 'Upgrade';
      }
    } else if (isNumber(nextPhaseTierPrice)) {
      if (
        nextPhaseTierPrice < currentPlanTierAmount ||
        nextPhaseTierPrice < currentPlanAmount
      ) {
        action = 'Downgrade';
      } else if (
        nextPhaseTierPrice === currentPlanTierAmount &&
        currentQuantity > nextPhaseQuantity
      ) {
        action = 'Downgrade';
      } else {
        action = 'Upgrade';
      }
    }
    let showQuantity = '';
    if (nextPhaseQuantity !== currentQuantity) {
      if (nextPhaseMetaDescription !== 'Free') {
        showQuantity = ` with ${nextPhaseQuantity} ${pluralizeText(
          'seat',
          nextPhaseQuantity,
        )}`;
      } else {
        showQuantity = ` with ${FREE_ORG_SEATS_THRESHOLD + 1} free viewer seat`;
      }
    }

    return (
      <JText italic nowrap={false} gray>
        <Icon icon="clock3" size="extraSmall" /> {action} to {nextPhasePlanName}{' '}
        plan
        {showQuantity} effective on{' '}
        {MomentHelper.dateFromTimeStamp(nextPhaseStartTime, 'MMMM DD, YYYY')}
      </JText>
    );
  };

  const tourSeatContent = () => {
    let action = '';
    let tourplan = '';
    if (currentPlanInterval === nextPhasePlanInterval) {
      if (currentQuantity > nextPhaseQuantity) {
        action = 'Downgrade';
      } else if (nextPhasePlanName === 'Free Tour Seat Plan') {
        action = 'Downgrade';
      } else {
        action = 'Upgrade';
      }
    } else if (nextPhasePlanInterval === 'month') {
      action = 'Downgrade';
    } else {
      action = 'Upgrade';
    }
    const q = nextPhaseQuantity;
    if (nextPhasePlanName !== currentPlanName) {
      if (SUBSCRIPTION_FREE_TOUR_PLANS.includes(nextPhasePlanName)) {
        tourplan = `${nextPhaseMetaDescription} `;
      } else {
        tourplan = `${nextPhaseMetaDescription} with ${q} tour seats `;
      }
    }
    return (
      <JText italic nowrap={false} gray>
        <Icon icon="clock3" size="extraSmall" /> {action} to {tourplan}
        effective on{' '}
        {MomentHelper.dateFromTimeStamp(nextPhaseStartTime, 'MMMM DD, YYYY')}
      </JText>
    );
  };

  const personalSeatContent = () => {
    let action = '';
    if (isNumber(nextPhaseAmount)) {
      if (nextPhaseAmount < currentPlanAmount) {
        action = 'Downgrade';
      } else {
        action = 'Upgrade';
      }
    }
    return (
      <JText italic nowrap={false} gray>
        <Icon icon="clock3" size="extraSmall" /> {action} to {nextPhasePlanName}{' '}
        effective on{' '}
        {MomentHelper.dateFromTimeStamp(nextPhaseStartTime, 'MMMM DD, YYYY')}
      </JText>
    );
  };

  const content = () => {
    if (planType === SUBSCRIPTION_PLAN_TYPE.ORG_SEAT) {
      return orgSeatContent();
    }
    if (planType === SUBSCRIPTION_PLAN_TYPE.TOUR_SEAT) {
      return tourSeatContent();
    }
    return personalSeatContent();
  };

  const appliedDiscount = (amount, selectPlanAmount) =>
    SubscriptionCalculationUtility.appliedCoupon(
      amount,
      selectPlanAmount,
      currentCouponMode,
      currentCouponPercentOff,
      currentDiscountEnd,
    );

  const displayPrice = () => {
    let q = nextPhaseQuantity;
    if (nextPhaseFirstPurchase) {
      if (parseInt(nextPhaseFirstPurchase, 10) === nextPhaseQuantity) {
        q = nextPhaseQuantity / parseInt(nextPhaseFirstPurchase, 10);
      } else {
        q = nextPhaseQuantity - parseInt(nextPhaseFirstPurchase, 10);
      }
    }

    let prorateAmount = 0;
    const otherLineItem = currentInvoiceTotal - currentProductLineInvoiceTotal;
    if (currentInvoiceTotal >= 0) {
      prorateAmount = 0;
    } else if (currentInvoiceTotal + currentOtherSubscriptionTotalAmount >= 0) {
      if (otherLineItem >= 0) {
        prorateAmount = currentInvoiceTotal / 100;
      } else {
        prorateAmount = 0;
      }
    } else {
      prorateAmount = currentInvoiceTotal / 100;
    }
    let amount = nextPhaseAmount / 100;
    if (planType === SUBSCRIPTION_PLAN_TYPE.TOUR_SEAT) {
      const tierIndex = SubscriptionCalculationUtility.convertQuantityIntoTierIndex(
        nextPhaseQuantity,
      );
      amount = SubscriptionCalculationUtility.convertIndexToAmount(
        tierIndex,
        nextPhasePlanInterval,
      );
      q = 1;
    }
    let total = 0;
    let basePrice = 0;
    if (isNumber(amount)) {
      basePrice = SubscriptionCalculationUtility.getBasePrice({
        amount,
        excludeTax: true,
        quantity: q,
        tax,
      });
      total = basePrice + prorateAmount;
    } else {
      basePrice = SubscriptionCalculationUtility.getBasePrice({
        firstTier: nextPhaseTierPrice / 100,
        secondTier:
          nextPhaseQuantity === parseInt(nextPhaseFirstPurchase, 10)
            ? null
            : nextPhaseSecondTierPrice / 100,
        excludeTax: true,
        quantity: q,
        tax,
      });
      total = _.round(basePrice + prorateAmount, 2);
    }
    const appliedCouponTotal = appliedDiscount(total, basePrice);
    const finalTotal = SubscriptionCalculationUtility.appliedAccountBalance(
      appliedCouponTotal,
      currentInvoiceStartingBalance,
      planType,
      tax,
      currentOtherSubscriptionTotalAmount,
    );
    return (
      <PriceDisplay
        amount={finalTotal > 0 ? finalTotal : 0}
        currency={nextPhaseCurrency}
        interval={nextPhasePlanInterval}
        tax={tax}
      />
    );
  };

  const renderAction = () => (
    <GridContainer alignItems="center">
      <GridItem>
        <Button
          variant={VARIANTS.INLINE}
          size="extraSmall"
          dense
          onClick={onSubmitCancelSchedule}
        >
          Cancel this pending plan
        </Button>
      </GridItem>
    </GridContainer>
  );

  if (shouldShowSchedulePlan()) {
    return (
      <Box className={classes.highlight} p={1}>
        <GridContainer direction="column">
          <GridItem>
            <GridContainer justify="space-between">
              <GridItem>{content()}</GridItem>
              <GridItem>{displayPrice()}</GridItem>
            </GridContainer>
          </GridItem>
          <GridItem>{renderAction()}</GridItem>
        </GridContainer>
      </Box>
    );
  }
  return null;
}

ScheduleSubscriptionItemPlan.propTypes = {
  currentPlanId: PropTypes.string,
  scheduleId: PropTypes.string,
  currentPlanAmount: PropTypes.number,
  currentPlanTierAmount: PropTypes.number,
  currentQuantity: PropTypes.number,
  tax: PropTypes.number,
  currentInvoiceTotal: PropTypes.number,
  currentOtherSubscriptionTotalAmount: PropTypes.number,
  currentProductLineInvoiceTotal: PropTypes.number,
  subscriptionItemIndex: PropTypes.number,
  planType: PropTypes.string,
  onSubmitCancelSchedule: PropTypes.func,
  currentPlanInterval: PropTypes.string,
  currentPlanName: PropTypes.string,
  currentInvoiceStartingBalance: PropTypes.number,
  currentCouponMode: PropTypes.string,
  currentCouponPercentOff: PropTypes.number,
  currentDiscountEnd: PropTypes.number,
};

ScheduleSubscriptionItemPlan.defaultProps = {};

export default React.memo(ScheduleSubscriptionItemPlan);
