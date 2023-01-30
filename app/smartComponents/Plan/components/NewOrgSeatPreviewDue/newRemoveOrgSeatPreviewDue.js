import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { SubscriptionCalculationUtility } from '../../../../utils/subscriptionCalculation';
import GridItem from '../../../../components/GridItem';
import { H3, H4, H5, H6 } from '../../../../viewComponents/Typography';
import GridContainer from '../../../../components/GridContainer';
import PriceDisplay from '../../../../ugcomponents/PriceDisplay';
import {
  FREE_ORG_SEATS_THRESHOLD,
  ORG_SEAT_LABEL,
} from '../../../../appConstants';
import MOMENT_HELPERS from '../../../../utils/helpers/moment';
import {
  parseStringJson,
  pluralizeText,
} from '../../../../utils/stringAdditions';
import Icon from '../../../../viewComponents/Icon';
import { isNumber } from '../../../../utils/numberAdditions';
import { makeStyles } from '../../../../components/material-ui';
import { usePlanContext } from '../../context/planStateContext';
import { useSelectorCurrentSubscriptionData } from '../../hooks/useSelectorCurrentSubscriptionData';
import { useSelectorInvoiceData } from '../../hooks/useSelectorInvoiceData';
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
function RemoveOrgSeatPreviewDue(props) {
  const classes = useStyles();
  const { type, renderSeatComponent, orgSeats, orgId } = props;
  const [planState, planDispatch] = usePlanContext();

  const currentSubscriptionData = useSelectorCurrentSubscriptionData(props);
  const {
    customerId,
    currentPlanName,
    currentPlanCurrency: currency,
    currentSubscriptionQuantity: quantity,
    currentSubscriptionPeriodEnd: periodEnd,
    currentPlanTierAmount: tierAmount,
    currentPlanInterval: interval,
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
    upcomingTaxPercent: taxPercent,
    upcomingInvoiceStartBalance,
  } = useSelectorInvoiceData({
    customerId,
    type,
  });

  const { totalInvoiceAmount, prorateAmount } = parseStringJson(
    subscriptionProrateMetaInfo,
  );

  const { otherSubscriptionTotalAmount } = parseStringJson(
    subscriptionMetaInfo,
  );

  useEffect(() => {
    if (currentPlanId) {
      planDispatch.setSelectPlanId(currentPlanId);
    }
  }, [currentPlanId]);

  const renderPlanSeatInfo = () => {
    const dueDate = MOMENT_HELPERS.dateFromTimeStamp(periodEnd, 'D MMMM YYYY');

    return (
      <>
        <GridItem>
          <H4 dense>
            {currentPlanName} - {currency} ${tierAmount / 100} for the first{' '}
            {currentPlanFirstPurchase}{' '}
            {pluralizeText(ORG_SEAT_LABEL, currentPlanFirstPurchase)}, and{' '}
            {currency} ${secondTierAmount / 100} / {interval} for each
            additional {ORG_SEAT_LABEL}.
          </H4>
        </GridItem>
        <GridItem>
          <GridContainer spacing={2} alignItems="center">
            <GridItem>
              <H5 dense>
                <Icon icon="chevron-right" size="xxxs" />
              </H5>
            </GridItem>
            <GridItem className={classes.grow}>
              <H5 dense>
                There are currently {orgSeats}{' '}
                {pluralizeText(ORG_SEAT_LABEL, orgSeats)} in this organisation
                for whom you will need to purchase. You can remove{' '}
                {ORG_SEAT_LABEL}s if {`you'd`} like to pay less.
              </H5>
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem>
          <GridContainer spacing={2} alignItems="center">
            <GridItem>
              <H5 dense>
                <Icon icon="chevron-right" size="xxxs" />
              </H5>
            </GridItem>
            <GridItem className={classes.grow}>
              <H5 dense>
                Your changes will take effect on <b>{dueDate}</b>
              </H5>
            </GridItem>
          </GridContainer>
          <hr />
        </GridItem>
      </>
    );
  };

  const renderSeatInput = () => {
    const totalSeats = quantity + FREE_ORG_SEATS_THRESHOLD;
    return (
      <GridItem className={classes.seatInput}>
        <GridContainer spacing={0}>
          <GridItem>
            <GridContainer direction="column" spacing={0}>
              <GridItem>
                <H4 dense>
                  {totalSeats} {pluralizeText(ORG_SEAT_LABEL, totalSeats)}
                </H4>
              </GridItem>
              <GridItem>
                <H6 dense>
                  ({FREE_ORG_SEATS_THRESHOLD} free {ORG_SEAT_LABEL})
                </H6>
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem>
            <H5 dense className={classes.arrow}>
              <Icon icon="arrow-right" size="extraSmall" />
            </H5>
          </GridItem>
          <GridItem>{renderSeatComponent()}</GridItem>
          <GridItem>
            <H5 dense>
              {pluralizeText(ORG_SEAT_LABEL, planState.additionalSeat)}
            </H5>
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  const appliedAccountBalanceInFuture = (priceAmount, payNow) => {
    let p = priceAmount;
    if (isNumber(upcomingInvoiceStartBalance)) {
      const taxP = (100 + taxPercent) / 100;
      const stripeTaxUpcomingInvoiceStartBalance =
        upcomingInvoiceStartBalance / taxP;
      const leftOver = payNow + stripeTaxUpcomingInvoiceStartBalance / 100;
      if (leftOver < 0) p += leftOver;
    }
    return p;
  };

  const renderCard = () => {
    const cardProps = {
      orgId,
    };

    return <SubscriptionCard {...cardProps} type={type} />;
  };

  const appliedCoupon = futureAmount => {
    const p = futureAmount;
    const remainingSeats = quantity - planState.additionalSeat;
    const calculatedAmount = SubscriptionCalculationUtility.totalPriceCalculation(
      {
        firstTier: tierAmount / 100,
        secondTier: secondTierAmount / 100,
        excludeTax: true,
        quantity: remainingSeats - currentPlanFirstPurchase,
      },
    );
    return SubscriptionCalculationUtility.appliedCoupon(
      p,
      calculatedAmount,
      previewedCouponMode,
      previewedCouponPercentOff,
      previewedCouponEndTime,
    );
  };

  const renderSeats = () => {
    const dueDate = MOMENT_HELPERS.dateFromTimeStamp(periodEnd, 'D MMMM YYYY');
    const remainingSeats = quantity - planState.additionalSeat;
    const calculatedAmount = SubscriptionCalculationUtility.totalPriceCalculation(
      {
        firstTier: tierAmount / 100,
        secondTier: secondTierAmount / 100,
        excludeTax: true,
        quantity: remainingSeats - currentPlanFirstPurchase,
      },
    );
    const otherLineItem = totalInvoiceAmount - prorateAmount;
    let futureAmount = 0;
    if (otherLineItem + otherSubscriptionTotalAmount >= 0) {
      futureAmount =
        prorateAmount / 100 + calculatedAmount + otherLineItem / 100;
    } else {
      futureAmount =
        calculatedAmount +
        prorateAmount / 100 +
        otherLineItem / 100 +
        otherSubscriptionTotalAmount / 100;
    }
    const futureAmountAppliedCoupon = appliedCoupon(futureAmount);
    const futureFinalAmount = appliedAccountBalanceInFuture(
      futureAmountAppliedCoupon,
    );

    const futureAmountComponent = (
      <PriceDisplay
        amount={futureFinalAmount > 0 ? futureFinalAmount : 0}
        tax={taxPercent}
        currency={currency}
        textOnly
      />
    );
    return (
      <>
        <GridItem>
          <H3 weight="bold">Remove Users</H3>
        </GridItem>
        {renderPlanSeatInfo()}
        {renderSeatInput()}
        <GridItem>
          <hr />
          <H5 dense>
            {`You're`} removing <b>{planState.additionalSeat}</b>{' '}
            {pluralizeText(ORG_SEAT_LABEL, planState.additionalSeat)}, bringing
            you down to a total of <b>{remainingSeats}</b>{' '}
            {pluralizeText(ORG_SEAT_LABEL, remainingSeats)} with free{' '}
            {FREE_ORG_SEATS_THRESHOLD} {ORG_SEAT_LABEL}.
          </H5>
          <H5 dense>
            {`Your`} next payment of <b>{futureAmountComponent}</b> will be due{' '}
            {dueDate}.
          </H5>
        </GridItem>
        <GridItem>{renderCard()}</GridItem>
      </>
    );
  };

  return (
    <GridItem>
      <GridContainer direction="column" spacing={1}>
        {renderSeats()}
      </GridContainer>
    </GridItem>
  );
}

RemoveOrgSeatPreviewDue.propTypes = {
  type: PropTypes.string,
  renderSeatComponent: PropTypes.func,
  orgSeats: PropTypes.number,
  orgId: PropTypes.any,
};

export default React.memo(RemoveOrgSeatPreviewDue);
