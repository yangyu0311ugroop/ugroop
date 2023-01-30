import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Hr from 'components/Hr';
import JText from 'components/JText';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import PriceDisplay from 'ugcomponents/PriceDisplay';
import {
  DEFAULT,
  DEFAULT_TAX_GST,
  READ_ONLY,
  URL_HELPERS,
  SUBSCRIPTION_FREE_TOUR_PLANS,
  SUBSCRIPTION_PLAN_TYPE,
} from 'appConstants';
import { compose } from 'redux';
import PopoverButton from '../button';
import { VARIANTS } from '../../../../../../variantsConstants';
import ScheduleSubscriptionItemPlan from '../../../ScheduleSubscriptionItemPlan';
import { historyPushWithState } from '../../../../../../utils/routeUtility';
import { isEmptyString } from '../../../../../../utils/stringAdditions';
import { SubscriptionCalculationUtility } from '../../../../../../utils/subscriptionCalculation';
import withApplyExistedCouponLogic from '../../../../../../ugcomponents/CustomerSubscriptions/hoc/withApplyExistedCouponLogic';
import { usePlanGlobalContext } from '../../../../../Plan/context/planProviderGlobalContext';
import { Span } from '../../../../../../viewComponents/Typography';
import { makeStyles } from '../../../../../../components/material-ui';
const styles = {
  description: {
    height: 80,
  },
  scheduleDescription: {
    marginTop: 10,
  },
};
const useStyles = makeStyles(styles);
function TourSeatsPlan(props) {
  const {
    orgId,
    uptoQuantity,
    quantity,
    planDetails,
    variant,
    planAmount,
    currentProductLineInvoiceTotal,
    currentOtherSubscriptionTotalAmount,
    currentInvoiceTotal,
    interval,
    currency,
    tax,
    nextPhasePlanName,
    currentActiveScheduleId,
    title,
    planId,
    currentSubscriptionId,
    customerId,
    planType,
    cancelScheduleSubscription,
    currentCouponId,
    currentCouponMode,
    currentCouponPercentOff,
    currentCouponDuration,
    currentCouponDurationInYear,
    currentDiscountEnd,
    subscriptionItemIndex,
    currentInvoiceStartingBalance,
  } = props;
  const classes = useStyles();
  const [, planDispatch] = usePlanGlobalContext();
  useEffect(() => {
    const total = calculateLineTotal();
    planDispatch.setSubscriptionPrice(subscriptionItemIndex, total);
  }, []);
  const history = useHistory();
  const renderExtraContent = () => {
    if (!isEmptyString(planDetails)) return planDetails;
    let q;
    if (quantity > 100) {
      q = 'unlimited';
    } else {
      q = uptoQuantity;
    }
    return (
      <>
        <Span>
          You can have up to {q} pax on any tour in your organisation, all of
          whom have free usage.
        </Span>
        <br />
        <Span>Team seats travelling are not included in this total.</Span>
        <br />
        <Span>An upgrade is available if you need more.</Span>
      </>
    );
  };

  const calculateLineTotal = () => {
    const otherLineItem = currentInvoiceTotal - currentProductLineInvoiceTotal;
    let total = 0;
    if (otherLineItem + currentOtherSubscriptionTotalAmount >= 0) {
      total = currentProductLineInvoiceTotal / 100 + planAmount / 100;
    } else {
      total =
        planAmount / 100 +
        currentProductLineInvoiceTotal / 100 +
        otherLineItem / 100 +
        currentOtherSubscriptionTotalAmount / 100;
    }
    total = props.applyCoupon(total, planAmount / 100);
    return total;
  };

  const renderContent = () => {
    const total = calculateLineTotal();
    const finalTotal = appliedAccountBalance(total);
    const q = 1;
    return (
      <PriceDisplay
        currency={currency}
        interval={interval}
        amount={finalTotal > 0 ? finalTotal : 0}
        quantity={q}
        tax={tax || DEFAULT_TAX_GST}
      />
    );
  };

  const updateSubscription = () => {
    historyPushWithState({
      history,
      path: URL_HELPERS.orgSubscriptionTourPlanUpgrade(orgId),
      state: { userActions: true, orgId },
    });
  };

  const downgradeSubscription = () => {
    historyPushWithState({
      history,
      path: URL_HELPERS.orgSubscriptionTourPlanDowngrade(orgId),
      state: { userActions: true, orgId },
    });
  };

  const changeSubscriptionName = () => {
    if (quantity > 100) {
      return 'Downgrade';
    }
    return 'Upgrade';
  };

  const buttonStyle = () => {
    if (quantity > 100) {
      return {
        color: 'base',
        variant: VARIANTS.OUTLINE,
      };
    }
    return { color: 'primary', variant: VARIANTS.STANDARD };
  };

  const appliedAccountBalance = priceAmount =>
    SubscriptionCalculationUtility.appliedAccountBalance(
      priceAmount,
      props.currentInvoiceStartingBalance,
      SUBSCRIPTION_PLAN_TYPE.TOUR_SEAT,
      props.tax,
      props.currentOtherSubscriptionTotalAmount,
    );

  const changeSubscriptionAction = () => {
    if (quantity > 100) {
      return downgradeSubscription;
    }
    return updateSubscription;
  };

  const showSecondEditButton = () => quantity <= 100 && quantity > 20;

  const renderAction = () => {
    if (SUBSCRIPTION_FREE_TOUR_PLANS.includes(title)) {
      return <div />;
    }
    const menuOption = `Downgrade to ${nextPhasePlanName} pending`;
    const content = (
      <GridItem>
        <PopoverButton
          buttonLabel={changeSubscriptionName()}
          options={[menuOption]}
          currentActiveScheduleId={currentActiveScheduleId}
          subscriptionItemIndex={subscriptionItemIndex}
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
            subscriptionItemIndex={subscriptionItemIndex}
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
      <GridContainer justify="flex-end">
        {content}
        {secondActionButton}
      </GridContainer>
    );
  };

  const renderDefault = () => (
    <GridContainer direction="column" card elevation={1}>
      <GridItem>
        <JText lg bold>
          Tour Seats Plan
        </JText>
      </GridItem>
      <GridItem>
        <Hr half />
      </GridItem>
      <GridItem>
        <GridContainer spacing={2}>
          <GridItem xs={12} md={5}>
            <GridContainer direction="column" spacing={0}>
              <GridItem>
                <JText sm bold>
                  Description
                </JText>
              </GridItem>
              <GridItem
                className={classes.description}
                data-testid="tourDescription"
              >
                <div>{renderExtraContent()}</div>
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem xs={12} md={1} />
          <GridItem xs={12} md={3}>
            <GridContainer direction="column" spacing={0}>
              <GridItem>
                <JText sm bold>
                  Price
                </JText>
              </GridItem>
              <GridItem data-testid="tourPrice">{renderContent()}</GridItem>
            </GridContainer>
          </GridItem>
          <GridItem xs={12} md={3}>
            {renderAction()}
          </GridItem>
        </GridContainer>
      </GridItem>
      <GridItem className={classes.scheduleDescription}>
        <ScheduleSubscriptionItemPlan
          currentPlanId={planId}
          scheduleId={currentActiveScheduleId}
          currentPlanAmount={planAmount}
          currentSubscriptionId={currentSubscriptionId}
          currentPlanInterval={interval}
          currentQuantity={quantity}
          currentPlanName={title}
          tax={tax}
          customerId={customerId}
          subscriptionItemIndex={subscriptionItemIndex}
          currentInvoiceTotal={currentInvoiceTotal}
          currentOtherSubscriptionTotalAmount={
            currentOtherSubscriptionTotalAmount
          }
          currentProductLineInvoiceTotal={currentProductLineInvoiceTotal}
          planType={planType}
          onSubmitCancelSchedule={cancelScheduleSubscription}
          currentCouponId={currentCouponId}
          currentCouponMode={currentCouponMode}
          currentCouponPercentOff={currentCouponPercentOff}
          currentCouponDuration={currentCouponDuration}
          currentCouponDurationInYear={currentCouponDurationInYear}
          currentDiscountEnd={currentDiscountEnd}
          currentInvoiceStartingBalance={currentInvoiceStartingBalance}
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

  return LOGIC_HELPERS.switchCase(variant, {
    [DEFAULT]: renderDefault,
    [READ_ONLY]: renderReadOnly,
  });
}

TourSeatsPlan.propTypes = {
  // hoc props

  // parent props
  title: PropTypes.string,
  variant: PropTypes.string,
  history: PropTypes.object,
  planAmount: PropTypes.number,
  currentActiveScheduleId: PropTypes.string,
  interval: PropTypes.string,
  currency: PropTypes.string,
  nextPhasePlanName: PropTypes.string,
  orgId: PropTypes.number,
  quantity: PropTypes.number,
  tax: PropTypes.number,
  planId: PropTypes.string,
  planType: PropTypes.string,
  currentSubscriptionId: PropTypes.string,
  customerId: PropTypes.string,
  subscriptionItemIndex: PropTypes.number,
  uptoQuantity: PropTypes.number,
  currentProductLineInvoiceTotal: PropTypes.number,
  currentInvoiceTotal: PropTypes.number,
  currentOtherSubscriptionTotalAmount: PropTypes.number,
  cancelScheduleSubscription: PropTypes.func,
  planNickName: PropTypes.string,
  planDetails: PropTypes.string,
  currentCouponId: PropTypes.string,
  currentCouponMode: PropTypes.string,
  currentCouponPercentOff: PropTypes.number,
  currentDiscountEnd: PropTypes.number,
  currentInvoiceStartingBalance: PropTypes.number,
  currentCouponDuration: PropTypes.number,
  currentCouponDurationInYear: PropTypes.number,
  resaga: PropTypes.object,
  applyCoupon: PropTypes.func,
};

TourSeatsPlan.defaultProps = {
  title: '',
  variant: DEFAULT,
};

export default compose(withApplyExistedCouponLogic)(TourSeatsPlan);
