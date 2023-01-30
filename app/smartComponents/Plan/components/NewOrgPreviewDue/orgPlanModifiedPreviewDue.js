import {
  DEFAULT_TAX_GST,
  DOWNGRADE,
  SUBSCRIPTION_ENTERPRISE,
  SUBSCRIPTION_ENTERPRISE_TOUR,
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
import { useImmer } from 'use-immer';
import OrgNextBillingPhaseTotal from '../PreviewDue/components/OrgNextBillingPhaseTotal';
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
import OrgPlanSeeDetails from '../PreviewDue/components/OrgPlanSeeDetails';
import OrgTourSeatPlanDetails from '../PreviewDue/components/OrgTourSeatPlanDetails';

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
function OrgPlanModifiedPreviewDue(props) {
  const { interval, type, orgSeats } = props;
  const [state, setState] = useImmer({
    openSeeDetails: false,
  });
  const currentSubscriptionData = useSelectorCurrentSubscriptionData(props);
  const {
    customerId,
    currentSubscriptionId,
    currentPlanCurrency: currency,
    currentPlanInterval,
    currentPlanName: nickName,
    currentSubscriptionQuantity: quantity,
    currentSubscriptionPeriodEnd: periodEnd,
    nextPhaseCoupon,
    currentPhaseCoupon,
  } = currentSubscriptionData;
  const [planState] = usePlanContext();
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
    upcomingInvoiceEndBalance,
    invoiceLinesType,
    existedCoupon,
  } = useSelectorInvoiceData({
    customerId,
    type,
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

    return {
      proratedDiff,
      periodEnd: pEnd,
    };
  };

  const seeDetails = () => {
    setState(draft => {
      const value = draft.openSeeDetails;
      // eslint-disable-next-line no-param-reassign
      draft.openSeeDetails = !value;
    });
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
      <OrgNextBillingPhaseTotal
        newStartPeriod={newStartPeriod}
        interval={interval}
        currentPlanInterval={currentPlanInterval}
        seeDetails={seeDetails}
        isSeeDetails={state.openSeeDetails}
        tax={taxPercent || DEFAULT_TAX_GST}
        showTax={showTax}
        quantity={quantity}
        totalInvoiceAmount={totalInvoiceAmount}
        prorateAmount={prorateAmount}
        type={type}
        subtotal={subtotal}
        currency={currency}
        selectPlanId={planState && planState.selectPlanId}
        otherSubscriptionTotalAmount={otherSubscriptionTotalAmount}
        endBalance={upcomingInvoiceEndBalance}
        selectPlanAmount={planState && planState.lineAmount}
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
        name={nickName}
      />
    );
  };

  const renderSeeDetailsBasedOnType = () => {
    const { openSeeDetails } = state;
    let open = openSeeDetails;
    let q = quantity;
    if (isEmptyString(currentSubscriptionId)) {
      open = true;
      q = orgSeats;
    }
    let payNow = 0;
    if (planState.subscriptionProcess === UPGRADE) {
      payNow = calculateUpgradePayNow();
    } else if (planState.subscriptionProcess === DOWNGRADE) {
      payNow = calculateDowngradePayNow();
    }
    if (type === SUBSCRIPTION_ENTERPRISE) {
      return (
        <OrgPlanSeeDetails
          interval={interval}
          open={open}
          currency={currency}
          quantity={q}
          selectPlanId={planState && planState.selectPlanId}
          tax={taxPercent || DEFAULT_TAX_GST}
          prorateAmount={prorateAmount}
          selectPlanAmount={planState && planState.lineAmount}
          upcomingInvoiceEndBalance={upcomingInvoiceEndBalance}
          otherSubscriptionTotalAmount={otherSubscriptionTotalAmount}
          totalInvoiceAmount={totalInvoiceAmount}
          subtotal={subtotal}
          previewedCoupon={previewedCoupon}
          previewCouponMode={previewedCouponMode}
          previewCouponEnd={previewedCouponEndTime}
          previewCouponPercentOff={previewedCouponPercentOff}
          previewCouponStart={previewedCouponStartTime}
          previewedCouponPercentOff={previewedCouponPercentOff}
          upcomingInvoiceStartBalance={upcomingInvoiceStartBalance}
          payNow={payNow}
          nextPhaseCoupon={nextPhaseCoupon}
          currentPhaseCoupon={currentPhaseCoupon}
          name={nickName}
        />
      );
    }
    if (type === SUBSCRIPTION_ENTERPRISE_TOUR) {
      return (
        <OrgTourSeatPlanDetails
          interval={interval}
          open={openSeeDetails}
          currency={currency}
          quantity={quantity}
          selectPlanId={planState && planState.selectPlanId}
          tax={taxPercent || DEFAULT_TAX_GST}
          prorateAmount={prorateAmount}
          selectPlanAmount={planState && planState.lineAmount}
          selectPlanQuantity={planState && planState.selectPlanQuantity}
          upcomingInvoiceEndBalance={upcomingInvoiceEndBalance}
          subtotal={subtotal}
          otherSubscriptionTotalAmount={otherSubscriptionTotalAmount}
          totalInvoiceAmount={totalInvoiceAmount}
          previewedCoupon={previewedCoupon}
          previewCouponMode={previewedCouponMode}
          previewCouponEnd={previewedCouponEndTime}
          previewCouponPercentOff={previewedCouponPercentOff}
          previewCouponStart={previewedCouponStartTime}
          upcomingInvoiceStartBalance={upcomingInvoiceStartBalance}
          payNow={payNow}
          nextPhaseCoupon={nextPhaseCoupon}
          currentPhaseCoupon={currentPhaseCoupon}
          name={nickName}
        />
      );
    }
    return null;
  };

  const renderNewTotal = () => {
    if (isEmptyString(currentSubscriptionId)) {
      return null;
    }
    return (
      <>
        {renderNewMonthBasedOnType()}
        {renderSeeDetailsBasedOnType()}
      </>
    );
  };

  const calculateDowngradePayNow = () => {
    let payNow = 0;
    if (currentPlanInterval === interval && totalInvoiceAmount >= 0) {
      payNow = planState.lineAmount;
    } else if (totalInvoiceAmount + otherSubscriptionTotalAmount >= 0) {
      payNow = planState.lineAmount;
    } else {
      payNow = planState.lineAmount + totalInvoiceAmount / 100;
    }
    return SubscriptionCalculationUtility.appliedCoupon(
      // When Downgrade, it's showing the next payment price.
      payNow,
      planState.lineAmount,
      previewedCouponMode,
      previewedCouponPercentOff,
      previewedCouponEndTime,
    );
  };

  const calculateUpgradePayNow = () => {
    let payNow = subtotal;
    const typeLists = JSON.parse(invoiceLinesType);
    const hasPendingInvoice = typeLists && typeLists.includes('invoiceitem');
    if (isEmptyString(currentSubscriptionId)) {
      return planState.lineAmount;
    }
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
    const t = SUBSCRIPTION_PLAN_TYPE.TOUR_SEAT;
    return SubscriptionCalculationUtility.appliedAccountBalance(
      payNow,
      upcomingInvoiceStartBalance,
      t,
      taxPercent,
      otherSubscriptionTotalAmount,
    );
  };

  const renderUpgradePayNow = () => {
    const payNowTax = taxPercent || DEFAULT_TAX_GST;
    const showTax = true;
    if (planState.previewLoading) {
      return null;
    }
    const finalPayNow = calculateUpgradePayNow();
    return (
      <GridContainer direction="column" alignItems="flex-end">
        <GridItem data-testid="previewDue">
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
    const payNowTax = taxPercent || DEFAULT_TAX_GST;
    if (planState.previewLoading) {
      return null;
    }
    const payNow = calculateDowngradePayNow();
    const finalPayNow = appliedAccountBalance(payNow);
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
      couponComponent = planState.previewLoading ? (
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
      prorateData = planState.previewLoading ? (
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
        <GridItem>
          {isEmptyString(currentSubscriptionId)
            ? renderSeeDetailsBasedOnType()
            : null}
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

OrgPlanModifiedPreviewDue.propTypes = {
  type: PropTypes.string,
  interval: PropTypes.string,
  orgSeats: PropTypes.number,
};

export default React.memo(OrgPlanModifiedPreviewDue);
