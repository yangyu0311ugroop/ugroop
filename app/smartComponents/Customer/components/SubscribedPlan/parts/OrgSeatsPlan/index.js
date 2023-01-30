import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Hr from 'components/Hr';
import JText from 'components/JText';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { compose } from 'redux';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import PriceDisplay from 'ugcomponents/PriceDisplay';
import {
  DEFAULT,
  DEFAULT_TAX_GST,
  READ_ONLY,
  URL_HELPERS,
  SUBSCRIPTION_PLAN_TYPE,
} from 'appConstants';
import { SubscriptionCalculationUtility } from 'utils/subscriptionCalculation';
import { useHistory } from 'react-router-dom';
import CurrentSeats from '../../../CurrentSeats';
import { VARIANTS } from '../../../../../../variantsConstants';
import PopoverButton from '../button';
import ScheduleSubscriptionItemPlan from '../../../ScheduleSubscriptionItemPlan';
import { historyPushWithState } from '../../../../../../utils/routeUtility';
import withApplyExistedCouponLogic from '../../../../../../ugcomponents/CustomerSubscriptions/hoc/withApplyExistedCouponLogic';
import { usePlanGlobalContext } from '../../../../../Plan/context/planProviderGlobalContext';

function OrgSeatsPlan(props) {
  const history = useHistory();
  const {
    planAmount,
    currency,
    planTierAmount,
    planSecondTierAmount,
    currentProductLineInvoiceTotal,
    currentInvoiceTotal,
    currentOtherSubscriptionTotalAmount,
    quantity,
    planFirstPurchase,
    currentInvoiceStartingBalance,
    tax,
    orgSeats,
    orgId,
    title,
    planId,
    currentActiveScheduleId,
    currentSubscriptionId,
    customerId,
    cancelScheduleSubscription,
    planType,
    interval,
    currentCouponId,
    currentCouponMode,
    currentCouponPercentOff,
    currentCouponDuration,
    currentCouponDurationInYear,
    currentDiscountEnd,
    nextPhaseCoupon,
    subscriptionItemIndex,
    level,
    nextPhasePlanName,
    applyCoupon,
  } = props;
  const [, planDispatch] = usePlanGlobalContext();
  useEffect(() => {
    const total = calculateLineTotal();
    planDispatch.setSubscriptionPrice(subscriptionItemIndex, total);
  }, []);

  const calculateLineTotal = () => {
    const q = SubscriptionCalculationUtility.quantityExtractFirstPurchase(
      quantity,
      planFirstPurchase,
    );
    let total = 0;
    const otherLineItem = currentInvoiceTotal - currentProductLineInvoiceTotal;
    const selectPlanAmount = SubscriptionCalculationUtility.getBasePrice({
      excludeTax: true,
      amount: planAmount / 100,
      firstTier: planTierAmount / 100,
      secondTier: planSecondTierAmount / 100,
      quantity: q,
      tax,
    });
    // Firstly check if it has other Invoice Item and if Other Subscription is greater than zero
    // Then check if our own lineInvoice is zero, then do need to add other Line Item
    if (otherLineItem + currentOtherSubscriptionTotalAmount >= 0) {
      total = currentProductLineInvoiceTotal / 100 + selectPlanAmount;
    } else {
      total =
        selectPlanAmount +
        currentProductLineInvoiceTotal / 100 +
        otherLineItem / 100 +
        currentOtherSubscriptionTotalAmount / 100;
    }
    total = applyCoupon(total, selectPlanAmount);
    total = SubscriptionCalculationUtility.appliedAccountBalance(
      total,
      currentInvoiceStartingBalance,
      SUBSCRIPTION_PLAN_TYPE.ORG_SEAT,
      tax,
    );
    return total;
  };

  const renderContent = () => {
    const total = calculateLineTotal();
    return (
      <PriceDisplay
        currency={currency}
        amount={total > 0 ? total : 0}
        interval={interval}
        tax={tax || DEFAULT_TAX_GST}
      />
    );
  };

  const renderSeats = () => (
    <CurrentSeats
      quantity={quantity}
      orgSeats={orgSeats}
      orgId={orgId}
      planAmount={planAmount}
      planFirstPurchase={planFirstPurchase}
    />
  );

  const updateSubscription = () => {
    historyPushWithState({
      history,
      path: URL_HELPERS.orgSubscriptionUpgrade(orgId),
      state: { userActions: true, orgId },
    });
  };

  const downgradeSubscription = () => {
    historyPushWithState({
      history,
      path: URL_HELPERS.orgSubscriptionDowngrade(orgId),
      state: { userActions: true, orgId },
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
    if (planAmount === 0) {
      // Free Plan
      return false;
    }
    if (
      // Starter Plan
      orgSeats > planFirstPurchase &&
      planFirstPurchase === 1
    ) {
      return false;
    }
    if (
      // Traveller Plan
      orgSeats > planFirstPurchase &&
      planFirstPurchase === 3
    ) {
      return false;
    }
    return true;
  };

  const renderAction = () => {
    const menuOption = `Downgrade to ${nextPhasePlanName} pending`;
    const content = (
      <GridItem data-testid="changeSubscription">
        <PopoverButton
          buttonLabel={changeSubscriptionName()}
          options={[menuOption]}
          subscriptionItemIndex={subscriptionItemIndex}
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
        <GridItem data-testid="downgradeSubscription">
          <PopoverButton
            buttonLabel="Downgrade"
            options={[menuOption]}
            currentActiveScheduleId={currentActiveScheduleId}
            size="extraSmall"
            color="primary"
            disableIndex={0}
            variant={VARIANTS.OUTLINE}
            buttonClick={downgradeSubscription}
            subscriptionItemIndex={subscriptionItemIndex}
          />
        </GridItem>
      );
    }
    return (
      <GridContainer justify="flex-end" noWrap spacing={0}>
        {content}
        {secondActionButton}
      </GridContainer>
    );
  };

  const renderDefault = () => (
    <GridContainer elevation={1} direction="column" card>
      <GridItem>
        <JText lg bold>
          Organisation Seats Plan
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
              <GridItem data-testid="orgPlanName">
                <JText>{title}</JText>
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem xs={12} md={3}>
            <GridContainer direction="column" spacing={0}>
              <GridItem>
                <JText sm bold>
                  Seats Available
                </JText>
              </GridItem>
              <GridItem>{renderSeats()}</GridItem>
            </GridContainer>
          </GridItem>
          <GridItem xs={12} md={3}>
            <GridContainer direction="column" spacing={0}>
              <GridItem>
                <JText sm bold>
                  Price
                </JText>
              </GridItem>
              <GridItem data-testid="orgSeatPrice">{renderContent()}</GridItem>
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
          currentPlanTierAmount={planTierAmount}
          currentPlanInterval={interval}
          currentSubscriptionId={currentSubscriptionId}
          currentQuantity={quantity}
          tax={tax}
          customerId={customerId}
          subscriptionItemIndex={subscriptionItemIndex}
          currentInvoiceTotal={currentInvoiceTotal}
          currentOtherSubscriptionTotalAmount={
            currentOtherSubscriptionTotalAmount
          }
          currentProductLineInvoiceTotal={currentProductLineInvoiceTotal}
          onSubmitCancelSchedule={cancelScheduleSubscription}
          planType={planType}
          currentInvoiceStartingBalance={currentInvoiceStartingBalance}
          nextPhaseCoupon={nextPhaseCoupon}
          currentCouponId={currentCouponId}
          currentCouponMode={currentCouponMode}
          currentCouponPercentOff={currentCouponPercentOff}
          currentCouponDuration={currentCouponDuration}
          currentCouponDurationInYear={currentCouponDurationInYear}
          currentDiscountEnd={currentDiscountEnd}
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

OrgSeatsPlan.propTypes = {
  title: PropTypes.string,
  variant: PropTypes.string,
  level: PropTypes.string,
  history: PropTypes.object,
  planAmount: PropTypes.number,
  planTierAmount: PropTypes.number,
  planSecondTierAmount: PropTypes.number,
  currentActiveScheduleId: PropTypes.string,
  planFirstPurchase: PropTypes.number,
  interval: PropTypes.string,
  currency: PropTypes.string,
  nextPhasePlanName: PropTypes.string,
  orgId: PropTypes.number,
  orgSeats: PropTypes.number,
  quantity: PropTypes.number,
  tax: PropTypes.number,
  planId: PropTypes.string,
  currentSubscriptionId: PropTypes.string,
  customerId: PropTypes.string,
  subscriptionItemIndex: PropTypes.number,
  currentInvoiceTotal: PropTypes.number,
  currentProductLineInvoiceTotal: PropTypes.number,
  currentOtherSubscriptionTotalAmount: PropTypes.number,
  cancelScheduleSubscription: PropTypes.func,
  currentCouponMode: PropTypes.string,
  currentCouponPercentOff: PropTypes.number,
  currentDiscountEnd: PropTypes.number,
  currentInvoiceStartingBalance: PropTypes.number,
  planType: PropTypes.string,
  resaga: PropTypes.object,
  currentCouponId: PropTypes.string,
  currentCouponDuration: PropTypes.number,
  currentCouponDurationInYear: PropTypes.number,
  lastPhasePlanIndex: PropTypes.number,
  nextPhaseCoupon: PropTypes.string,
  applyCoupon: PropTypes.func,
};

OrgSeatsPlan.defaultProps = {
  title: '',
  variant: DEFAULT,
};

export default compose(withApplyExistedCouponLogic)(React.memo(OrgSeatsPlan));
