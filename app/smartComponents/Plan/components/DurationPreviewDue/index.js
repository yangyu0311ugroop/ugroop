import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { makeStyles } from 'components/material-ui';
import { H3, H4, H6 } from 'viewComponents/Typography';
import MOMENT_HELPERS from 'utils/helpers/moment';
import PriceDisplay from '../../../../ugcomponents/PriceDisplay';
import { isNumber } from '../../../../utils/numberAdditions';
import NextBillingPhaseTotal from '../PreviewDue/components/NextBillingPhaseTotal';
import {
  DOWNGRADE,
  SUBSCRIPTION_FREE_PLANS,
  SUBSCRIPTION_PLAN_TYPE,
  UPGRADE,
} from '../../../../appConstants';
import {
  isEmptyString,
  pluralizeText,
  parseStringJson,
} from '../../../../utils/stringAdditions';
import { SubscriptionCalculationUtility } from '../../../../utils/subscriptionCalculation';
import { usePlanContext } from '../../context/planStateContext';
import { useSelectorCurrentSubscriptionData } from '../../hooks/useSelectorCurrentSubscriptionData';
import { useSelectorInvoiceData } from '../../hooks/useSelectorInvoiceData';

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
function DurationPreviewDue(props) {
  const { interval } = props;
  const classes = useStyles();
  const [planState] = usePlanContext();
  const currentSubscriptionData = useSelectorCurrentSubscriptionData(props);
  const {
    customerId,
    currentPlanCurrency: currency,
    currentPlanInterval,
    currentPlanName,
    currentSubscriptionPeriodEnd: periodEnd,
    currentSubscriptionPlans,
  } = currentSubscriptionData;

  let listPlanNames = [];
  if (props.orgId) {
    const plans = parseStringJson(currentSubscriptionPlans);
    listPlanNames = plans.map(o => o.name);
  } else {
    listPlanNames = [currentPlanName]; // Individual
  }

  const {
    subscriptionProrateMetaInfo,
    subscriptionMetaInfo,
    upcomingTaxPercent: taxPercent,
    upcomingTotal: total,
    upcomingTax: tax,
    upcomingInvoiceEndBalance: endBalance,
    upcomingInvoiceStartBalance,
    previewedCouponMode,
    previewedCouponEndTime,
    previewedCouponStartTime,
    previewedCouponPercentOff,
    previewedCoupon,
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

  const {
    otherSubscriptionTotalAmount,
    invoiceLineEndPeriod,
  } = parseStringJson(subscriptionMetaInfo);

  const getProratedPeriod = () => {
    const start = MOMENT_HELPERS.createFromTimeStamp(prorateStart);
    const end = MOMENT_HELPERS.createFromTimeStamp(prorateEnd);
    const diff = end.diff(start, 'days');
    const dayText = pluralizeText('day', Number.parseInt(diff, 10), true);
    const proratedDiff = ` (Prorated for ${diff} ${dayText})`;
    const pEnd = MOMENT_HELPERS.dateFromTimeStamp(prorateEnd, 'D MMMM YYYY');

    return { proratedDiff, periodEnd: pEnd };
  };

  const calculateStartPeriod = () => {
    const hasFreePlan = _.intersection(listPlanNames, SUBSCRIPTION_FREE_PLANS);

    let newStartPeriod = 0;
    if (currentPlanInterval === interval) {
      newStartPeriod = periodEnd;
    } else if (currentPlanInterval === 'month') {
      // upgrade
      newStartPeriod = invoiceLineEndPeriod;
    } else if (hasFreePlan.length > 0) {
      // downgrade from year to month.
      newStartPeriod = invoiceLineEndPeriod;
    } else {
      // downgrade from year to month.
      newStartPeriod = periodEnd;
    }
    return newStartPeriod;
  };

  const renderNewMonthBasedOnType = () => {
    const stripTaxEndBalance = endBalance / ((100 + taxPercent) / 100);
    const payNow = (stripTaxEndBalance + otherSubscriptionTotalAmount) / 100;
    const newStartPeriod = calculateStartPeriod();
    return (
      <NextBillingPhaseTotal
        currency={currency}
        interval={interval}
        tax={taxPercent}
        showTax
        quantity={1}
        selectPlanAmount={payNow}
        otherSubscriptionTotalAmount={otherSubscriptionTotalAmount}
        totalInvoiceAmount={totalInvoiceAmount}
        newStartPeriod={newStartPeriod}
        appliedCoupon={null}
        previewCouponMode={previewedCouponMode}
        previewCouponEnd={previewedCouponEndTime}
        previewCouponStart={previewedCouponStartTime}
        previewCouponPercentOff={previewedCouponPercentOff}
        upcomingInvoiceStartBalance={upcomingInvoiceStartBalance}
      />
    );
  };

  const renderNewTotal = () => <>{renderNewMonthBasedOnType()}</>;

  const renderUpgradePayNow = () => {
    const payNowTax = taxPercent;
    const showTax = true;
    if (planState.previewLoading) {
      return null;
    }
    let payNow = (otherSubscriptionTotalAmount + totalInvoiceAmount) / 100;
    if ((total - tax) / 100 !== payNow) {
      payNow = (total - tax) / 100;
    }
    payNow = SubscriptionCalculationUtility.appliedAccountBalance(
      payNow,
      upcomingInvoiceStartBalance,
      SUBSCRIPTION_PLAN_TYPE.CHANGE_DURATION,
      payNowTax,
    );
    return (
      <GridContainer direction="column" alignItems="flex-end">
        <GridItem>
          <PriceDisplay
            currency={currency}
            amount={isNumber(payNow) && payNow > 0 ? payNow : 0}
            tax={payNowTax}
            showTax={showTax}
            Component={H3}
            textAlign="right"
          />
        </GridItem>
      </GridContainer>
    );
  };

  const renderCouponComponent = () => {
    const { appliedCoupon } = props;
    let couponComponent;
    if (!isEmptyString(appliedCoupon) || !isEmptyString(previewedCoupon)) {
      couponComponent = planState.previewLoading ? (
        ''
      ) : (
        <GridItem>
          <H6 dense weight="bold">
            (discount code applied: {appliedCoupon || previewedCoupon})
          </H6>
        </GridItem>
      );
    }
    return couponComponent;
  };

  const renderDowngradePayNow = () => {
    const payNowTax = taxPercent;
    if (planState.previewLoading) {
      return null;
    }
    let priceAmount = 0;
    const stripTaxEndBalance = endBalance / ((100 + taxPercent) / 100);
    const selectPlanAmount =
      (stripTaxEndBalance + otherSubscriptionTotalAmount) / 100;

    if (currentPlanInterval === interval && totalInvoiceAmount >= 0) {
      priceAmount = selectPlanAmount;
    } else if (totalInvoiceAmount + otherSubscriptionTotalAmount >= 0) {
      priceAmount = selectPlanAmount;
    } else {
      priceAmount = selectPlanAmount + totalInvoiceAmount / 100;
    }
    const startPeriod = calculateStartPeriod();
    const t = SubscriptionCalculationUtility.appliedCoupon(
      priceAmount,
      selectPlanAmount,
      previewedCouponMode,
      previewedCouponPercentOff,
      startPeriod + previewedCouponEndTime,
      startPeriod,
    );
    const finalTotal = SubscriptionCalculationUtility.appliedAccountBalance(
      t,
      upcomingInvoiceStartBalance,
      SUBSCRIPTION_PLAN_TYPE.CHANGE_DURATION,
      taxPercent,
      otherSubscriptionTotalAmount,
    );
    return (
      <GridContainer direction="column" alignItems="flex-end">
        <GridItem>
          <PriceDisplay
            currency={currency}
            amount={isNumber(finalTotal) && finalTotal > 0 ? finalTotal : 0}
            tax={payNowTax}
            showTax
            Component={H3}
            textAlign="right"
          />
        </GridItem>
      </GridContainer>
    );
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
                {renderCouponComponent()}
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
    const hasFreePlan = _.intersection(listPlanNames, SUBSCRIPTION_FREE_PLANS);
    let dueDate = 'Today';
    if (hasFreePlan.length === 0) {
      dueDate = MOMENT_HELPERS.dateFromTimeStamp(periodEnd, 'D MMMM YYYY');
    }
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
                {renderCouponComponent()}
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

DurationPreviewDue.propTypes = {
  appliedCoupon: PropTypes.string,
  type: PropTypes.string,
  interval: PropTypes.string,
  orgId: PropTypes.number,
};

DurationPreviewDue.defaultProps = {};

export default React.memo(DurationPreviewDue);
