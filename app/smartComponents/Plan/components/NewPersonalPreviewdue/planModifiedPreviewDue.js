import {
  DOWNGRADE,
  SUBSCRIPTION_FREE_PLANS,
  SUBSCRIPTION_PLAN_TYPE,
  UPGRADE,
} from 'appConstants';
import React from 'react';
import PropTypes from 'prop-types';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { H3, H4, H6 } from 'viewComponents/Typography';
import MOMENT_HELPERS from 'utils/helpers/moment';
import { useSelector } from 'react-redux';
import NextBillingPhaseTotal from '../PreviewDue/components/NextBillingPhaseTotal';
import {
  isEmptyString,
  pluralizeText,
  parseStringJson,
} from '../../../../utils/stringAdditions';
import PriceDisplay from '../../../../ugcomponents/PriceDisplay';
import { isNumber } from '../../../../utils/numberAdditions';
import { SubscriptionCalculationUtility } from '../../../../utils/subscriptionCalculation';
import { usePlanContext } from '../../context/planStateContext';
import { makeStyles } from '../../../../components/material-ui';
import { useSelectorInvoiceData } from '../../hooks/useSelectorInvoiceData';
import { useSelectorCurrentSubscriptionData } from '../../hooks/useSelectorCurrentSubscriptionData';
import { makeSingleSelect } from '../../../../datastore/selectUtility';
import { PLAN_RESELECTOR } from '../../../../datastore/planDataImmerStore/selectors';

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
function PersonPlanModifiedPreviewDue(props) {
  const { interval, type } = props;
  const currentSubscriptionData = useSelectorCurrentSubscriptionData(props);
  const {
    customerId,
    currentPlanCurrency: currency,
    currentPlanInterval,
    currentPlanName: nickName,
    currentSubscriptionQuantity: quantity,
    currentSubscriptionPeriodEnd: periodEnd,
    nextPhaseCoupon,
    currentPhaseCoupon,
    currentPlanCurrency,
  } = currentSubscriptionData;
  const [planState] = usePlanContext();
  const previewLoading = planState.previewLoading;
  const selectPlanAmount = useSelector(state =>
    makeSingleSelect(PLAN_RESELECTOR.selectPlanAttribute)(state, {
      id: planState && planState.selectPlanId,
      attribute: 'amount',
    }),
  );
  const {
    subscriptionProrateMetaInfo,
    previewedCouponMode,
    previewedCouponEndTime,
    previewedCouponStartTime,
    previewedCouponPercentOff,
    subscriptionMetaInfo,
    invoiceLineEndPeriod,
    previewedCoupon,
    upcomingTaxPercent: taxPercent,
    upcomingInvoiceStartBalance,
    upcomingTotal: total,
    upcomingTax: tax,
    upcomingSubtotal: subtotal,
    invoiceLinesType,
    existedCoupon,
  } = useSelectorInvoiceData({
    customerId,
    type: props.type,
  });

  const {
    prorateStart,
    prorateEnd,
    prorateAmount,
    totalInvoiceAmount,
  } = parseStringJson(subscriptionProrateMetaInfo);
  const { otherSubscriptionTotalAmount } = parseStringJson(
    subscriptionMetaInfo,
  );

  const classes = useStyles();
  const getProratedPeriod = () => {
    const start = MOMENT_HELPERS.createFromTimeStamp(prorateStart);
    const end = MOMENT_HELPERS.createFromTimeStamp(prorateEnd);
    const diff = end.diff(start, 'days');
    const dayText = pluralizeText('day', Number.parseInt(diff, 10), true);
    const proratedDiff = ` (Prorated for ${diff} ${dayText})`;
    const pEnd = MOMENT_HELPERS.dateFromTimeStamp(prorateEnd, 'D MMMM YYYY');

    return { proratedDiff, periodEnd: pEnd };
  };

  const renderNewMonthBasedOnType = () => {
    let showTax = false;

    if (totalInvoiceAmount > 0) {
      showTax = true;
    }
    let newStartPeriod = 0;
    if (currentPlanInterval === interval) {
      newStartPeriod = periodEnd;
    } else if (currentPlanInterval === 'month') {
      // upgrade
      newStartPeriod = invoiceLineEndPeriod;
    } else if (SUBSCRIPTION_FREE_PLANS.includes(nickName)) {
      newStartPeriod = invoiceLineEndPeriod;
    } else {
      newStartPeriod = periodEnd;
    }
    let payNow = 0;
    if (planState.subscriptionProcess === UPGRADE) {
      payNow = calculateUpgradePayNow();
    } else if (planState.subscriptionProcess === DOWNGRADE) {
      payNow = calculateDowngradePayNow();
    }
    return (
      <NextBillingPhaseTotal
        newStartPeriod={newStartPeriod}
        interval={interval}
        currentPlanInterval={currentPlanInterval}
        seeDetails={false}
        tax={taxPercent}
        showTax={showTax}
        quantity={quantity}
        selectPlanId={planState && planState.selectPlanId}
        totalInvoiceAmount={totalInvoiceAmount}
        otherSubscriptionTotalAmount={otherSubscriptionTotalAmount}
        type={type}
        selectPlanAmount={selectPlanAmount / 100}
        appliedCoupon={planState.couponData.applyCoupon}
        previewCouponMode={previewedCouponMode}
        previewCouponEnd={previewedCouponEndTime}
        previewCouponStart={previewedCouponStartTime}
        previewCouponPercentOff={previewedCouponPercentOff}
        upcomingInvoiceStartBalance={upcomingInvoiceStartBalance}
        payNow={payNow}
        existedCoupon={existedCoupon}
        nextPhaseCoupon={nextPhaseCoupon}
        currentPhaseCoupon={currentPhaseCoupon}
        subscriptionProcess={planState && planState.subscriptionProcess}
        currency={currentPlanCurrency}
      />
    );
  };

  const renderNewTotal = () => <>{renderNewMonthBasedOnType()}</>;

  const calculateDowngradePayNow = () => {
    let payNow = 0;
    if (currentPlanInterval === interval && totalInvoiceAmount >= 0) {
      payNow = selectPlanAmount;
    } else if (totalInvoiceAmount + otherSubscriptionTotalAmount >= 0) {
      payNow = selectPlanAmount;
    } else {
      payNow = selectPlanAmount + totalInvoiceAmount / 100;
    }
    return SubscriptionCalculationUtility.appliedCoupon(
      // When Downgrade, it's showing the next payment price.
      payNow,
      selectPlanAmount,
      previewedCouponMode,
      previewedCouponPercentOff,
      previewedCouponEndTime,
    );
  };

  const calculateUpgradePayNow = () => {
    let payNow = subtotal;
    const typeLists = JSON.parse(invoiceLinesType);
    const hasPendingInvoice = typeLists && typeLists.includes('invoiceitem');
    if (hasPendingInvoice) {
      if (totalInvoiceAmount >= 0) {
        payNow = prorateAmount / 100;
      } else {
        payNow = 0; // because it's has pending invoice that is less than zero. So all the pending invoice will be invoiced at once in next billing cycle
      }
      payNow = appliedAccountBalance(payNow);
    } else {
      payNow = (total - tax) / 100;
    }
    return payNow;
  };

  const appliedAccountBalance = payNow => {
    const t = SUBSCRIPTION_PLAN_TYPE.INDIVIDUAL_SEAT;
    return SubscriptionCalculationUtility.appliedAccountBalance(
      payNow,
      upcomingInvoiceStartBalance,
      t,
      taxPercent,
      otherSubscriptionTotalAmount,
    );
  };

  const renderUpgradePayNow = () => {
    const payNowTax = taxPercent;
    const showTax = true;
    if (previewLoading) {
      return null;
    }
    const finalPayNow = calculateUpgradePayNow();
    return (
      <GridContainer direction="column" alignItems="flex-end">
        <GridItem>
          <PriceDisplay
            currency={currency}
            amount={isNumber(finalPayNow) && finalPayNow > 0 ? finalPayNow : 0}
            tax={payNowTax}
            showTax={showTax}
            Component={H3}
            textAlign="right"
          />
        </GridItem>
      </GridContainer>
    );
  };

  const renderDowngradePayNow = () => {
    const payNowTax = taxPercent;
    if (previewLoading) {
      return null;
    }
    const payNow = calculateDowngradePayNow();
    const finalPayNow = appliedAccountBalance(payNow) / 100;
    return (
      <GridContainer direction="column" alignItems="flex-end">
        <GridItem>
          <PriceDisplay
            currency={currency}
            amount={isNumber(finalPayNow) && finalPayNow > 0 ? finalPayNow : 0}
            tax={payNowTax}
            showTax
            Component={H3}
            textAlign="right"
          />
        </GridItem>
      </GridContainer>
    );
  };

  const renderCouponComponent = () => {
    const appliedCoupon = planState.couponData.applyCoupon;
    let couponComponent;
    if (
      !isEmptyString(appliedCoupon) ||
      !isEmptyString(previewedCoupon) ||
      !isEmptyString(existedCoupon)
    ) {
      couponComponent = previewLoading ? (
        ''
      ) : (
        <GridItem>
          <H6 dense weight="bold">
            (discount code applied:{' '}
            {appliedCoupon || previewedCoupon || existedCoupon})
          </H6>
        </GridItem>
      );
    }
    return couponComponent;
  };

  const renderUpgradePreview = () => {
    let prorateData;
    if (prorateAmount > 0) {
      const { proratedDiff } = getProratedPeriod();
      prorateData = previewLoading ? (
        ''
      ) : (
        <GridItem>
          <H6 dense weight="bold">
            {proratedDiff}
          </H6>
        </GridItem>
      );
    }
    const couponComponent = renderCouponComponent();
    return (
      <>
        {renderNewTotal()}
        <GridItem>
          <hr />
          <GridContainer>
            <GridItem className={classes.grow}>
              <GridContainer direction="column" spacing={0}>
                <GridItem>
                  <H4 dense weight="bold">
                    Due Today
                  </H4>
                </GridItem>
                {prorateData}
                {couponComponent}
              </GridContainer>
            </GridItem>
            <GridItem>{renderUpgradePayNow()}</GridItem>
          </GridContainer>
          <hr className={classes.hr} />
        </GridItem>
      </>
    );
  };

  const renderDowngradePreview = () => {
    let dueDate = '';
    if (SUBSCRIPTION_FREE_PLANS.includes(nickName)) {
      dueDate = 'Today';
    } else {
      dueDate = MOMENT_HELPERS.dateFromTimeStamp(periodEnd, 'D MMMM YYYY');
    }
    const couponComponent = renderCouponComponent();
    return (
      <>
        {renderNewTotal()}
        <GridItem>
          <hr />
          <GridContainer>
            <GridItem className={classes.grow}>
              <GridContainer direction="column" spacing={0}>
                <GridItem>
                  <H4 dense weight="bold">
                    Due {dueDate}
                  </H4>
                </GridItem>
                {couponComponent}
              </GridContainer>
            </GridItem>
            <GridItem>{renderDowngradePayNow()}</GridItem>
          </GridContainer>
          <hr className={classes.hr} />
        </GridItem>
      </>
    );
  };
  if (planState.subscriptionProcess === UPGRADE) {
    return renderUpgradePreview();
  }
  if (planState.subscriptionProcess === DOWNGRADE) {
    return renderDowngradePreview();
  }
  return <div />;
}

PersonPlanModifiedPreviewDue.propTypes = {
  type: PropTypes.string,
  interval: PropTypes.string,
};

export default React.memo(PersonPlanModifiedPreviewDue);
