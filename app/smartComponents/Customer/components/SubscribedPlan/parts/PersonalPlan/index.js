import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Hr from 'components/Hr';
import JText from 'components/JText';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import React, { useEffect } from 'react';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import PriceDisplay from 'ugcomponents/PriceDisplay';
import {
  COUPON_MODE,
  DEFAULT,
  READ_ONLY,
  SUBSCRIPTION_PLAN_TYPE,
  URL_HELPERS,
} from 'appConstants';
import PopoverButton from '../button';
import { VARIANTS } from '../../../../../../variantsConstants';
import ScheduleSubscriptionItemPlan from '../../../ScheduleSubscriptionItemPlan';
import { historyPushWithState } from '../../../../../../utils/routeUtility';
import { SubscriptionCalculationUtility } from '../../../../../../utils/subscriptionCalculation';
import { isEmptyString } from '../../../../../../utils/stringAdditions';
import { isNumber } from '../../../../../../utils/numberAdditions';
import { usePlanGlobalContext } from '../../../../../Plan/context/planProviderGlobalContext';

function PersonalPlan(props) {
  const [, planDispatch] = usePlanGlobalContext();
  useEffect(() => {
    const total = getCalculatePrice();
    planDispatch.setSubscriptionPrice(0, total);
  }, []);
  const history = useHistory();
  const {
    customerId,
    nextPlanId,
    planId,
    title,
    interval,
    currency,
    quantity,
    tax,
    currentSubscriptionId,
    currentInvoiceStartingBalance,
    currentOtherSubscriptionTotalAmount,
    planAmount,
    currentCouponMode,
    currentCouponPercentOff,
    currentDiscountEnd,
    currentActiveScheduleId,
    currentPhaseEndTime,
    currentDiscountStart,
    currentProductLineInvoiceTotal,
    currentInvoiceTotal,
    level,
    nextPlanQuantity: nextPhaseQuantity,
    currentPhaseCoupon,
    nextPhaseCoupon,
    nextPhasePlanName,
    planDetails,
    cancelScheduleSubscription,
    planType,
  } = props;

  const shouldShowSchedulePlan = () => {
    if (isEmptyString(currentActiveScheduleId)) return false;
    if (planId !== nextPlanId) {
      return true;
    }
    return quantity !== nextPhaseQuantity;
  };

  const whichCoupon = () => {
    // if has schedule plan, then we shall use current phase Coupon, the future Coupon will handle by schedule.
    if (shouldShowSchedulePlan()) {
      return currentPhaseCoupon;
    }
    return nextPhaseCoupon;
  };

  const applyCoupon = total => {
    let t = total;
    if (isEmptyString(currentActiveScheduleId)) {
      t = SubscriptionCalculationUtility.appliedCoupon(
        t,
        planAmount / 100,
        currentCouponMode,
        currentCouponPercentOff,
        currentDiscountEnd,
      );
    } else if (
      !isEmptyString(whichCoupon()) &&
      currentCouponMode === COUPON_MODE.REPEATING &&
      isNumber(currentPhaseEndTime) &&
      currentPhaseEndTime > currentDiscountStart
    ) {
      t = SubscriptionCalculationUtility.appliedCoupon(
        t,
        planAmount / 100,
        currentCouponMode,
        currentCouponPercentOff,
        currentDiscountEnd,
      );
    } else if (
      !isEmptyString(whichCoupon()) &&
      (currentCouponMode === COUPON_MODE.FOREVER ||
        currentCouponMode === COUPON_MODE.ONCE)
    ) {
      t = SubscriptionCalculationUtility.appliedCoupon(
        t,
        planAmount / 100,
        currentCouponMode,
        currentCouponPercentOff,
        currentDiscountEnd,
      );
    }
    return t;
  };

  const getCalculatePrice = () => {
    const otherLineItem = currentInvoiceTotal - currentProductLineInvoiceTotal;
    let total = 0;
    if (otherLineItem + currentOtherSubscriptionTotalAmount >= 0) {
      total =
        currentProductLineInvoiceTotal / 100 +
        planAmount / 100 +
        otherLineItem / 100;
    } else {
      total =
        planAmount / 100 +
        currentProductLineInvoiceTotal / 100 +
        otherLineItem / 100 +
        currentOtherSubscriptionTotalAmount / 100;
    }
    total = applyCoupon(total);
    return total;
  };

  const renderContent = () => {
    const total = getCalculatePrice();
    const finalTotal = SubscriptionCalculationUtility.appliedAccountBalance(
      total,
      currentInvoiceStartingBalance,
      SUBSCRIPTION_PLAN_TYPE.INDIVIDUAL_SEAT,
      tax,
      currentOtherSubscriptionTotalAmount,
    );
    return (
      <PriceDisplay
        currency={currency}
        interval={interval}
        amount={finalTotal > 0 ? finalTotal : 0}
        quantity={quantity}
        tax={tax}
      />
    );
  };

  const updateSubscription = () => {
    historyPushWithState({
      history,
      path: URL_HELPERS.subscriptionUpgrade(),
      state: { userActions: true },
    });
  };

  const downgradeSubscription = () => {
    historyPushWithState({
      history,
      path: URL_HELPERS.subscriptionDowngrade(),
      state: { userActions: true },
    });
  };

  const changeSubscriptionName = () => {
    if (level === 'top') {
      return 'Downgrade';
    }
    return 'Upgrade';
  };

  const buttonStyle = () => {
    if (level === 'top') {
      return {
        color: 'base',
        variant: VARIANTS.OUTLINE,
      };
    }
    return { color: 'primary', variant: VARIANTS.STANDARD };
  };

  const changeSubscriptionAction = () => {
    if (level === 'top') {
      return downgradeSubscription;
    }
    return updateSubscription;
  };

  const showSecondEditButton = () => {
    if (level === 'top') {
      return false;
    }
    return planAmount !== 0;
  };

  const renderAction = () => {
    const menuOption = `Downgrade to ${nextPhasePlanName} pending`;
    const content = (
      <GridItem>
        <PopoverButton
          buttonLabel={changeSubscriptionName()}
          options={[menuOption]}
          currentActiveScheduleId={currentActiveScheduleId}
          size="extraSmall"
          color={buttonStyle().color}
          variant={buttonStyle().variant}
          disableIndex={0}
          buttonClick={changeSubscriptionAction()}
        />
      </GridItem>
    );
    let secondActionButton;
    if (showSecondEditButton()) {
      secondActionButton = (
        <GridItem>
          <PopoverButton
            buttonLabel="Downgrade"
            options={[menuOption]}
            currentActiveScheduleId={currentActiveScheduleId}
            size="extraSmall"
            color="primary"
            disableIndex={0}
            variant={VARIANTS.OUTLINE}
            buttonClick={downgradeSubscription}
          />
        </GridItem>
      );
    }
    return (
      <GridContainer justify="flex-end" spacing={0} noWrap>
        {content}
        {secondActionButton}
      </GridContainer>
    );
  };

  const renderDefault = () => (
    <GridContainer direction="column" card elevation={1}>
      <GridItem>
        <JText lg bold>
          Personal Plan
        </JText>
      </GridItem>
      <GridItem>
        <Hr half />
      </GridItem>
      <GridItem>
        <GridContainer>
          <GridItem xs={12} md={3}>
            <GridContainer direction="column" spacing={0}>
              <GridItem>
                <JText sm bold>
                  Name
                </JText>
              </GridItem>
              <GridItem>
                <div>{title}</div>
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem xs={12} md={3}>
            <GridContainer direction="column" spacing={0}>
              <GridItem>
                <JText sm bold>
                  Details
                </JText>
              </GridItem>
              <GridItem>
                <div>{planDetails}</div>
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem xs={12} md={3}>
            <GridContainer direction="column" spacing={0}>
              <GridItem>
                <JText sm bold>
                  Price
                </JText>
              </GridItem>
              <GridItem>{renderContent()}</GridItem>
            </GridContainer>
          </GridItem>
          <GridItem xs={12} md={3}>
            {renderAction()}
          </GridItem>
        </GridContainer>
      </GridItem>
      <GridItem>
        <ScheduleSubscriptionItemPlan
          currentPlanId={planId}
          scheduleId={currentActiveScheduleId}
          currentPlanAmount={planAmount}
          currentSubscriptionId={currentSubscriptionId}
          currentQuantity={quantity}
          currentInvoiceTotal={currentInvoiceTotal}
          tax={tax}
          customerId={customerId}
          onSubmitCancelSchedule={cancelScheduleSubscription}
          subscriptionItemIndex={0}
          currentCouponMode={currentCouponMode}
          currentCouponPercentOff={currentCouponPercentOff}
          currentDiscountEnd={currentDiscountEnd}
          currentInvoiceStartingBalance={currentInvoiceStartingBalance}
          currentOtherSubscriptionTotalAmount={
            currentOtherSubscriptionTotalAmount
          }
          planType={planType}
        />
      </GridItem>
    </GridContainer>
  );

  const renderReadOnly = () => (
    <GridContainer direction="row" alignItems="center">
      <GridItem>{title}</GridItem>
      <GridItem>{renderContent()}</GridItem>
    </GridContainer>
  );

  const { variant } = props;
  return LOGIC_HELPERS.switchCase(variant, {
    [DEFAULT]: renderDefault,
    [READ_ONLY]: renderReadOnly,
  });
}

PersonalPlan.propTypes = {
  // hoc props
  // classes: PropTypes.object.isRequired,
  // parent props
  title: PropTypes.string,
  variant: PropTypes.string,
  level: PropTypes.string,
  history: PropTypes.object,
  planAmount: PropTypes.number,
  planDetails: PropTypes.string,
  currentActiveScheduleId: PropTypes.string,
  interval: PropTypes.string,
  currency: PropTypes.string,
  nextPhasePlanName: PropTypes.string,
  quantity: PropTypes.number,
  tax: PropTypes.number,
  planId: PropTypes.string,
  currentSubscriptionId: PropTypes.string,
  customerId: PropTypes.string,
  cancelScheduleSubscription: PropTypes.func,
  currentInvoiceTotal: PropTypes.number,
  resaga: PropTypes.object,
  currentCouponMode: PropTypes.string,
  currentCouponPercentOff: PropTypes.number,
  currentDiscountEnd: PropTypes.number,
  currentProductLineInvoiceTotal: PropTypes.number,
  currentOtherSubscriptionTotalAmount: PropTypes.number,
  currentInvoiceStartingBalance: PropTypes.number,
  planType: PropTypes.string,
  currentPhaseEndTime: PropTypes.number,
  currentDiscountStart: PropTypes.number,
  nextPhasePlan: PropTypes.string,
  nextPhaseQuantity: PropTypes.number,
  nextPhaseCoupon: PropTypes.string,
  currentPhaseCoupon: PropTypes.string,
};

PersonalPlan.defaultProps = {
  title: '',
  variant: DEFAULT,
};

export default React.memo(PersonalPlan);
