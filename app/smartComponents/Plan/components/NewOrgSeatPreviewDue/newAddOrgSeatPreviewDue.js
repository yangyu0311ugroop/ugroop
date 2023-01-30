import React, { useEffect } from 'react';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import useVigilante from '@mollycule/vigilante';
import { SubscriptionCalculationUtility } from '../../../../utils/subscriptionCalculation';
import GridItem from '../../../../components/GridItem';
import { H3, H4, H5, H6 } from '../../../../viewComponents/Typography';
import GridContainer from '../../../../components/GridContainer';
import PriceDisplay from '../../../../ugcomponents/PriceDisplay';
import ProjectPlans from '../ProjectionPlan';
import {
  COUPON_MODE,
  FREE_ORG_SEATS_THRESHOLD,
  ORG_SEAT_LABEL,
} from '../../../../appConstants';
import MOMENT_HELPERS from '../../../../utils/helpers/moment';
import {
  isEmptyString,
  parseStringJson,
  pluralizeText,
} from '../../../../utils/stringAdditions';
import ApplyCoupon from '../../parts/ApplyCoupon';
import { isNumber } from '../../../../utils/numberAdditions';
import { makeStyles } from '../../../../components/material-ui';
import { useSelectorCurrentSubscriptionData } from '../../hooks/useSelectorCurrentSubscriptionData';
import { useSelectorInvoiceData } from '../../hooks/useSelectorInvoiceData';
import { usePlanContext } from '../../context/planStateContext';
import { makeSelectUpgradePlanIds } from '../../../../datastore/planDataImmerStore/selectors';
import { makeSelectProductIdFilterByName } from '../../../../datastore/productDataImmerStore/selectors';
import SubscriptionCard from '../../parts/SubscriptionCard';

const styles = {
  grow: {
    flex: 1,
  },
  total: {
    textAlign: 'right',
  },
  seatTotal: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
  },
  seatTotalText: {
    paddingRight: 4,
  },
  period: {
    marginTop: -16,
  },
  seatInput: {
    display: 'flex',
    alignItems: 'center',
  },
  hr: {
    marginBottom: 0,
  },
};
const useStyles = makeStyles(styles);
function AddOrgSeatPreviewDue(props) {
  const classes = useStyles();
  const { type, applyCoupon, orgId, renderSeatComponent, orgSeats } = props;
  const [planState, planDispatch] = usePlanContext();

  const currentSubscriptionData = useSelectorCurrentSubscriptionData(props);
  const {
    customerId,
    currentPlanCurrency: currency,
    currentSubscriptionQuantity,
    currentPlanTierAmount,
    currentPlanInterval,
    currentPlanAmount,
    currentPlanSecondTierAmount: secondTierAmount,
    currentPlanFirstPurchase,
    currentPlanId,
  } = currentSubscriptionData;
  const {
    subscriptionProrateMetaInfo,
    subscriptionMetaInfo,
    previewedCouponMode,
    previewedCouponEndTime,
    previewedCouponPercentOff,
    previewedCoupon,
    upcomingTaxPercent: taxPercent,
    upcomingInvoiceStartBalance,
    upcomingInvoiceEndBalance,
    existedCoupon,
  } = useSelectorInvoiceData({
    customerId,
    type,
  });

  useEffect(() => {
    if (currentPlanId) {
      planDispatch.setSelectPlanId(currentPlanId);
    }
  }, [currentPlanId]);
  const productId = useSelector(state =>
    makeSelectProductIdFilterByName(state, {
      name: props.type,
    }),
  );

  const projectPlanIds = useSelector(state =>
    makeSelectUpgradePlanIds(state, {
      id: productId,
      interval: currentPlanInterval,
      orgSeats,
      currentPlanTierAmount,
      currentPlanAmount,
    }),
  );

  const totalSeats = () =>
    planState.additionalSeat +
    currentSubscriptionQuantity +
    FREE_ORG_SEATS_THRESHOLD;

  const {
    prorateStart,
    prorateEnd,
    totalInvoiceAmount,
    prorateAmount,
  } = parseStringJson(subscriptionProrateMetaInfo);

  const { otherSubscriptionTotalAmount } = parseStringJson(
    subscriptionMetaInfo,
  );

  useVigilante('AddOrgSeatPreviewDue', {
    ...props,
    projectPlanIds,
    customerId,
    currentPlanCurrency: currency,
    currentSubscriptionQuantity,
    currentPlanTierAmount,
    currentPlanInterval,
    currentPlanAmount,
    currentPlanSecondTierAmount: secondTierAmount,
    currentPlanFirstPurchase,
    subscriptionProrateMetaInfo,
    subscriptionMetaInfo,
    previewedCouponMode,
    previewedCouponEndTime,
    previewedCouponPercentOff,
    previewedCoupon,
    upcomingTaxPercent: taxPercent,
    upcomingInvoiceStartBalance,
    upcomingInvoiceEndBalance,
    existedCoupon,
  });
  const getProratedPeriod = () => {
    const start = MOMENT_HELPERS.createFromTimeStamp(prorateStart);
    const end = MOMENT_HELPERS.createFromTimeStamp(prorateEnd);
    const diff = end.diff(start, 'days');
    const dayText = pluralizeText('day', Number.parseInt(diff, 10), true);
    const proratedDiff = ` (Prorated for ${diff} ${dayText})`;
    const periodEnd = MOMENT_HELPERS.dateFromTimeStamp(
      prorateEnd,
      'D MMMM YYYY',
    );

    return { proratedDiff, periodEnd };
  };

  const renderText = () => {
    const upperCaseCurr = _.toUpper(currency);
    return `new ${ORG_SEAT_LABEL}s @ ${upperCaseCurr} $${secondTierAmount /
      100}/${currentPlanInterval} each`;
  };

  const renderCoupon = () => {
    let showCoupon = true;
    const now = Date.now() / 1000;
    if (
      !isEmptyString(existedCoupon) &&
      !isEmptyString(previewedCoupon) &&
      (previewedCouponMode === COUPON_MODE.FOREVER ||
        previewedCouponMode === COUPON_MODE.ONCE ||
        (previewedCouponMode === COUPON_MODE.REPEATING &&
          previewedCouponEndTime >= now))
    ) {
      showCoupon = false;
    }
    if (showCoupon) {
      return <ApplyCoupon onSubmit={applyCoupon} />;
    }
    return <div />;
  };

  const appliedAccountBalance = payNow => {
    let p = payNow;
    if (isNumber(upcomingInvoiceStartBalance)) {
      const taxP = (100 + taxPercent) / 100;
      const stripeTaxUpcomingInvoiceStartBalance =
        upcomingInvoiceStartBalance / taxP;
      const leftOver = stripeTaxUpcomingInvoiceStartBalance / 100;
      if (leftOver < 0) p += leftOver;
    }
    return p;
  };

  const appliedAccountBalanceInFuture = (priceAmount, payNow) => {
    let p = priceAmount;
    if (isNumber(upcomingInvoiceStartBalance)) {
      const taxP = (100 + props.taxPercent) / 100;
      const stripeTaxUpcomingInvoiceStartBalance =
        upcomingInvoiceStartBalance / taxP;
      const leftOver = payNow + stripeTaxUpcomingInvoiceStartBalance / 100;
      if (leftOver < 0) p += leftOver;
    }
    return p;
  };

  const calculatePayNow = () => {
    let payNow = 0;
    if (totalInvoiceAmount > 0) {
      payNow = prorateAmount < 0 ? 0 : prorateAmount / 100;
    }
    return payNow;
  };

  const calculateFuturePay = () => {
    const calculatedAmount = SubscriptionCalculationUtility.totalPriceCalculation(
      {
        excludeTax: true,
        firstTier: currentPlanTierAmount,
        secondTier: secondTierAmount,
        quantity:
          currentSubscriptionQuantity +
          planState.additionalSeat -
          currentPlanFirstPurchase,
      },
    );
    let futureAmount = 0;
    const otherLineItem = totalInvoiceAmount - prorateAmount;
    if (prorateAmount < 0) {
      // if Prorate amount is negative, then it means we have remaining credits.
      futureAmount = _.round((calculatedAmount + prorateAmount) / 100, 2);
    } else {
      futureAmount = _.round(calculatedAmount / 100, 2);
    }
    if (otherLineItem + otherSubscriptionTotalAmount >= 0) {
      futureAmount += otherLineItem / 100;
    } else {
      futureAmount =
        futureAmount + otherLineItem / 100 + otherSubscriptionTotalAmount / 100;
    }
    return futureAmount;
  };

  const appliedCoupon = futureAmount => {
    let p = futureAmount;
    const calculatedAmount = SubscriptionCalculationUtility.totalPriceCalculation(
      {
        excludeTax: true,
        firstTier: currentPlanTierAmount / 100,
        secondTier: secondTierAmount / 100,
        quantity:
          currentSubscriptionQuantity +
          planState.additionalSeat -
          currentPlanFirstPurchase,
      },
    );
    p = SubscriptionCalculationUtility.appliedCoupon(
      p,
      calculatedAmount,
      previewedCouponMode,
      previewedCouponPercentOff,
      previewedCouponEndTime,
    );
    return p;
  };

  const renderNewSeatsInput = () => (
    <GridItem className={classes.seatInput}>
      <H4 dense weight="bold">
        {_.capitalize(ORG_SEAT_LABEL)}
        s:
      </H4>
      {renderSeatComponent()}
      <H4 dense>{renderText()}</H4>
    </GridItem>
  );

  const renderPayTodaySummary = finalPayNow => {
    const { proratedDiff } = getProratedPeriod();
    let couponComponent;
    if (
      !isEmptyString(planState.couponData.applyCoupon) ||
      !isEmptyString(previewedCoupon)
    ) {
      couponComponent = planState.previewLoading ? (
        ''
      ) : (
        <GridItem>
          <H6 dense weight="bold">
            (discount code applied:{' '}
            {planState.couponData.applyCoupon || previewedCoupon})
          </H6>
        </GridItem>
      );
    }
    return (
      <GridItem>
        <hr />
        <GridContainer>
          <GridItem className={classes.seatTotal}>
            <GridContainer direction="column" spacing={0}>
              <GridItem>
                <H4 dense weight="bold" className={classes.seatTotalText}>
                  Total
                </H4>
                <H4 dense>{planState.previewLoading ? '' : proratedDiff}</H4>
              </GridItem>
              {couponComponent}
            </GridContainer>
          </GridItem>
          <GridItem>
            {planState.previewLoading ? (
              <div />
            ) : (
              <PriceDisplay
                tax={taxPercent}
                currency={currency}
                amount={finalPayNow}
                componentProps={{ weight: 'bold' }}
                Component={H4}
                showTax
              />
            )}
          </GridItem>
        </GridContainer>
        <hr />
      </GridItem>
    );
  };

  const renderCurrentChargeDetails = finalPayNow => {
    const ts = totalSeats();
    return (
      <GridItem>
        {planState.previewLoading ? (
          <div />
        ) : (
          <H5 dense>
            You will be charged{' '}
            {
              <b>
                <PriceDisplay
                  amount={finalPayNow}
                  tax={taxPercent}
                  currency={currency}
                  textOnly
                />
              </b>
            }
            today for <b>{planState.additionalSeat}</b> additional{' '}
            {pluralizeText(ORG_SEAT_LABEL, planState.additionalSeat)} bringing
            up to a total of <b>{totalSeats()}</b>{' '}
            {pluralizeText(ORG_SEAT_LABEL, ts)}.
          </H5>
        )}
      </GridItem>
    );
  };

  const renderFutureChargeDetails = futureFinalAmount => {
    const { periodEnd } = getProratedPeriod();
    return (
      <GridItem>
        {planState.previewLoading ? (
          <div />
        ) : (
          <H5 dense>
            Your next payment of{' '}
            {
              <b>
                <PriceDisplay
                  amount={futureFinalAmount > 0 ? futureFinalAmount : 0}
                  tax={taxPercent}
                  currency={currency}
                  textOnly
                />
              </b>
            }
            will be due {periodEnd}.
          </H5>
        )}
      </GridItem>
    );
  };

  const renderCard = () => {
    const cardProps = {
      orgId,
    };

    return <SubscriptionCard {...cardProps} type={type} />;
  };

  const renderSeatsPreview = () => {
    // calculate the future amount
    const payNow = calculatePayNow();
    const finalPayNow = appliedAccountBalance(payNow);
    const futureAmount = calculateFuturePay();
    const futureAmountAppliedCoupon = appliedCoupon(futureAmount);
    const futureFinalAmount = appliedAccountBalanceInFuture(
      futureAmountAppliedCoupon,
      finalPayNow,
    );

    return (
      <>
        <GridItem>
          <H3 weight="bold">Add {_.capitalize(ORG_SEAT_LABEL)}s</H3>
        </GridItem>
        {renderNewSeatsInput()}
        {renderPayTodaySummary(finalPayNow)}
        {renderCurrentChargeDetails(finalPayNow)}
        {renderFutureChargeDetails(futureFinalAmount)}
        <GridItem>
          {planState.previewLoading ? (
            <div />
          ) : (
            renderRemainingCredits(upcomingInvoiceEndBalance)
          )}
          <br />
        </GridItem>
        <GridItem>{renderCoupon()}</GridItem>
        <GridItem>
          {planState.previewLoading ? (
            <div />
          ) : (
            <ProjectPlans
              currentfirstTierAmount={currentPlanTierAmount}
              currentsecondTier={secondTierAmount}
              quantity={currentSubscriptionQuantity}
              seat={planState.additionalSeat}
              currentPlanFirstPurchase={currentPlanFirstPurchase}
              projectPlanIds={projectPlanIds}
              orgId={orgId}
            />
          )}
        </GridItem>
        <GridItem>{renderCard()}</GridItem>
      </>
    );
  };

  const renderRemainingCredits = endBalance =>
    endBalance >= 0 ? (
      <div />
    ) : (
      <H5 dense>
        Your remaining credits{' '}
        <b>
          {
            <PriceDisplay
              excludeTax
              amount={Math.abs(endBalance) > 0 ? Math.abs(endBalance) / 100 : 0}
              tax={taxPercent}
              currency={currency}
              textOnly
            />
          }
        </b>
        .
      </H5>
    );

  return renderSeatsPreview();
}

export default React.memo(AddOrgSeatPreviewDue);
